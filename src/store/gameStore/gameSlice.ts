import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, PieceSymbol } from 'chess.ts';
import { createNewGame } from 'src/services/game.service';
import {
  createNewGame as createGame,
  watchGame,
  addGameMove,
  addWaitingRoom,
  watchWaitingRoom,
  unsbuscribeWaitingRoom,
  findInWaitingRooms,
  updateWaitingRoom,
  deleteWaitingRoom,
} from 'src/services/firestore.servie';
import {
  AudioType,
  Color,
  GameData,
  GameState,
  Highlight,
  Hint,
  Piece,
  Position,
  PromotionData,
} from 'src/types';
import {
  generateSquareName,
  getInitialPieces,
  getRookId,
  getSquarePosition,
} from 'src/utils/helpers';
import { AppThunk } from '..';
import {
  addToHistory,
  setCurrentIndex,
  setHistory,
} from '../historyStore/historySlice';

export let game = createNewGame();

const initialState: GameState = {
  id: null,
  pieces: getInitialPieces(),
  focusedPieceId: null,
  hints: [],
  highlights: { prevMoves: [], marked: [] },
  turn: game.turn(),
  promotionData: null,
  perspective: 'w',
  animatingPieceIds: [],
  playingAudios: [],
  player: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameState>) {
      return action.payload;
    },
    setFocusedPieceId(state, action: PayloadAction<number | null>) {
      state.focusedPieceId = action.payload;
    },
    setHints(state, action: PayloadAction<Hint[]>) {
      state.hints = action.payload;
    },
    setHighlights(
      state,
      action: PayloadAction<{ prevMoves: Highlight[]; marked: Highlight[] }>
    ) {
      state.highlights = action.payload;
    },
    setPieces(state, action: PayloadAction<Piece[]>) {
      state.pieces = action.payload;
    },
    setTurn(state, action: PayloadAction<string>) {
      state.turn = action.payload;
    },
    setPromotionData(state, action: PayloadAction<null | PromotionData>) {
      state.promotionData = action.payload;
    },
    setPerspective(state, action: PayloadAction<'w' | 'b'>) {
      state.perspective = action.payload;
    },
    setPlayingAudios(state, action: PayloadAction<AudioType[]>) {
      state.playingAudios = action.payload;
    },
    setAnimatingPieceIds(state, action: PayloadAction<number[]>) {
      state.animatingPieceIds = action.payload;
    },
    setGameId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setPlayer(state, action: PayloadAction<'w' | 'b' | null>) {
      state.player = action.payload;
    },
  },
});

export const {
  setGameState,
  setFocusedPieceId,
  setHints,
  setHighlights,
  setPieces,
  setTurn,
  setPromotionData,
  setPerspective,
  setPlayingAudios,
  setAnimatingPieceIds,
  setGameId,
  setPlayer,
} = gameSlice.actions;

export const findMatch = (): AppThunk => async (dispatch, getState) =>
  new Promise<void>(async (resolve) => {
    const playerId = getState().authStore.user?.uid!;
    const room = await findInWaitingRooms((data) => true);
    if (room) {
      const opponentId = room.playerId;
      const isPlayerWhite = Math.floor(Math.random() * 2) === 0;
      const gameData = {
        black: isPlayerWhite ? opponentId : playerId,
        white: isPlayerWhite ? playerId : opponentId,
        history: [],
      };
      const gameId = await createGame(gameData);
      updateWaitingRoom(room.id, { ...gameData, gameId });
      dispatch(start({ ...gameData, id: gameId }));
      resolve();
    } else {
      const roomId = await addWaitingRoom(playerId);
      watchWaitingRoom(roomId, async (roomData) => {
        if (!roomData.gameId) return;
        console.log(roomData, 'found');
        const { black, white, history, gameId: id } = roomData;
        dispatch(start({ black, white, history, id }));
        unsbuscribeWaitingRoom(roomId);
        deleteWaitingRoom(roomId);
        resolve();
      });
    }
  });

export const start =
  (gameData: GameData): AppThunk =>
  async (dispatch, getState) => {
    game = createNewGame();
    // TODO: This is a faked version. Replace it later.
    // const opponent =
    //   getState().authStore.user?.uid! === '9Ki7pMdmMgbXYb6oiJbwnzgENRq1'
    //     ? '2cmyr26aOTYD54Xb4OMq8iS4vIU2'
    //     : '9Ki7pMdmMgbXYb6oiJbwnzgENRq1';
    // const gameData: GameData = {
    //   black: opponentId,
    //   white: getState().authStore.user?.uid!,
    //   history: [],
    // };
    watchGame(gameData.id, (data: GameData) => {
      if (data.history.length === 0) return;
      const { move, pieceIds } = data.history[data.history.length - 1];
      dispatch(_makeMove(pieceIds, move));
    });
    const state: GameState = {
      ...initialState,
      player: gameData.white === getState().authStore.user?.uid! ? 'w' : 'b',
      id: gameData.id,
      perspective:
        gameData.white === getState().authStore.user?.uid! ? 'w' : 'b',
    };
    dispatch(setGameState(state));
    dispatch(setCurrentIndex(0));
    dispatch(
      setHistory([
        {
          pieces: getInitialPieces(),
          move: null,
          animatingPieceIds: [],
          playingAudios: [],
        },
      ])
    );
  };

export const focus =
  (pieceId: number, pos: Position): AppThunk =>
  async (dispatch, getState) => {
    const { highlights, turn, player } = getState().gameStore;
    if (turn !== player) {
      dispatch(cancel());
      return;
    }
    dispatch(setFocusedPieceId(pieceId));
    dispatch(
      setHighlights({ ...highlights, marked: [{ pos, color: 'blue' }] })
    );
    const hints = game
      .moves({
        square: generateSquareName(pos),
        verbose: true,
      })
      .reduce((prev: Hint[], cur) => {
        if (!prev.find((hint) => hint.move.to === cur.to)) {
          const pieceIds = [pieceId];
          prev.push({ move: cur, pieceIds });
        }
        return prev;
      }, []);
    dispatch(setHints(hints));
  };

export const mark =
  (color: Color = 'red', pos: Position): AppThunk =>
  (dispatch, getState) => {
    const { highlights, focusedPieceId } = getState().gameStore;
    let _highlights;
    if (focusedPieceId) {
      dispatch(cancel());
      dispatch(setHighlights({ ...highlights, marked: [{ color, pos }] }));
    } else {
      _highlights = highlights.marked
        .filter(
          (highlight) =>
            generateSquareName(highlight.pos) !== generateSquareName(pos)
        )
        .concat({ color, pos });
      dispatch(setHighlights({ ...highlights, marked: _highlights }));
    }
  };

export const cancel = (): AppThunk => (dispatch, getState) => {
  dispatch(setFocusedPieceId(null));
  dispatch(setHints([]));
  dispatch(
    setHighlights({
      marked: [],
      prevMoves: getState().gameStore.highlights.prevMoves,
    })
  );
};

export const makeMove =
  (pieceIds: number[], gameMove: Move): AppThunk =>
  (dispatch, getState) => {
    addGameMove(getState().gameStore.id || 'test', {
      pieceIds,
      move: JSON.parse(JSON.stringify(gameMove)),
    });
  };

export const _makeMove =
  (pieceIds: number[], gameMove: Move): AppThunk =>
  (dispatch) => {
    switch (gameMove.flags) {
      case 'e':
        dispatch(enPassant(pieceIds, gameMove));
        break;
      case 'c':
        dispatch(capture(pieceIds, gameMove));
        break;
      case 'cp':
      case 'np':
        dispatch(showPromotionModalBox(pieceIds, gameMove));
        break;
      case 'k':
        dispatch(kingSideCastle(pieceIds, gameMove));
        break;
      case 'q':
        dispatch(queenSideCastle(pieceIds, gameMove));
        break;
      default:
        dispatch(move(pieceIds, gameMove));
        break;
    }
  };

export const move =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId, pieces, turn, player } = getState().gameStore;
    game.move(move);
    dispatch(setAnimatingPieceIds(pieceIds));
    // TODO: This is a mocked version. Replace it when player system is implemented.
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : turn === player
      ? ['moveSelf']
      : ['moveOpponent'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(
      addToHistory({
        animatingPieceIds: pieceIds,
        playingAudios,
        pieces: _pieces,
        move,
      })
    );
    dispatch(setTurn(game.turn()));
    dispatch(cancel());
    dispatch(
      setHighlights({
        marked: [],
        prevMoves: [
          { pos, color: 'blue' },
          { pos: getSquarePosition(move.from), color: 'blue' },
        ],
      })
    );
  };

export const capture =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    game.move(move);
    dispatch(setAnimatingPieceIds(pieceIds));
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : ['capture'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(cancel());
    setTimeout(() => {
      _pieces = _pieces.filter((piece) => {
        return (
          generateSquareName(piece.pos) !== move.to || piece.id === pieceIds[0]
        );
      });
      dispatch(setPieces(_pieces));
      dispatch(
        addToHistory({
          animatingPieceIds: pieceIds,
          playingAudios,
          pieces: _pieces,
          move,
        })
      );
      dispatch(
        setHighlights({
          marked: [],
          prevMoves: [
            { pos, color: 'blue' },
            { pos: getSquarePosition(move.from), color: 'blue' },
          ],
        })
      );
      dispatch(setTurn(game.turn()));
    }, 200);
  };

export const enPassant =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    game.move(move);
    dispatch(setAnimatingPieceIds(pieceIds));
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : ['capture'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(cancel());
    setTimeout(() => {
      _pieces = _pieces.filter((piece) => {
        const targetPos = {
          row: pos.row + (game.turn() === 'w' ? -1 : 1),
          col: pos.col,
        };
        return (
          generateSquareName(piece.pos) !== generateSquareName(targetPos) ||
          piece.id === pieceIds[0]
        );
      });
      dispatch(setPieces(_pieces));
      dispatch(
        addToHistory({
          animatingPieceIds: pieceIds,
          playingAudios,
          pieces: _pieces,
          move,
        })
      );
      dispatch(
        setHighlights({
          marked: [],
          prevMoves: [
            { pos, color: 'blue' },
            { pos: getSquarePosition(move.from), color: 'blue' },
          ],
        })
      );
      dispatch(setTurn(game.turn()));
    }, 200);
  };

export const kingSideCastle =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    game.move(move);
    const { focusedPieceId, pieces, turn } = getState().gameStore;
    const rookId = getRookId({ row: turn === 'w' ? 7 : 0, col: 7 });
    dispatch(setAnimatingPieceIds([...pieceIds, rookId]));
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : ['castle'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const pos = getSquarePosition(move.to);
    const rookPos = {
      from: {
        row: turn === 'w' ? 7 : 0,
        col: 7,
      },
      to: {
        row: turn === 'w' ? 7 : 0,
        col: 5,
      },
    };
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else if (
        generateSquareName(rookPos.from) === generateSquareName(piece.pos)
      ) {
        return {
          ...piece,
          pos: rookPos.to,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(cancel());
    dispatch(
      addToHistory({
        animatingPieceIds: pieceIds,
        playingAudios,
        pieces: _pieces,
        move,
      })
    );
    dispatch(
      setHighlights({
        marked: [],
        prevMoves: [
          { pos, color: 'blue' },
          { pos: getSquarePosition(move.from), color: 'blue' },
        ],
      })
    );
    dispatch(setTurn(game.turn()));
  };

export const queenSideCastle =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    game.move(move);
    const { focusedPieceId, pieces, turn } = getState().gameStore;
    const rookId = getRookId({ row: turn === 'w' ? 7 : 0, col: 7 });
    dispatch(setAnimatingPieceIds([...pieceIds, rookId]));
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : ['castle'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const pos = getSquarePosition(move.to);
    const rookPos = {
      from: {
        row: turn === 'w' ? 7 : 0,
        col: 0,
      },
      to: {
        row: turn === 'w' ? 7 : 0,
        col: 3,
      },
    };
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else if (
        generateSquareName(rookPos.from) === generateSquareName(piece.pos)
      ) {
        return {
          ...piece,
          pos: rookPos.to,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(cancel());
    dispatch(
      addToHistory({
        animatingPieceIds: pieceIds,
        playingAudios,
        pieces: _pieces,
        move,
      })
    );
    dispatch(
      setHighlights({
        marked: [],
        prevMoves: [
          { pos, color: 'blue' },
          { pos: getSquarePosition(move.from), color: 'blue' },
        ],
      })
    );
    dispatch(setTurn(game.turn()));
  };

export const promote =
  (pieceIds: number[], move: Move, pieceName: PieceSymbol): AppThunk =>
  (dispatch, getState) => {
    game.move({
      ...move,
      promotion: pieceName,
    });
    dispatch(setAnimatingPieceIds(pieceIds));
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : ['promote'];
    if (
      game.inCheckmate() ||
      game.inDraw() ||
      game.inStalemate() ||
      game.inThreefoldRepetition() ||
      game.insufficientMaterial()
    ) {
      playingAudios.push('end');
    }
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    dispatch(hidePromotionModalBox());
    const pos = getSquarePosition(move.to);
    console.log(pos);
    let _pieces = pieces.map((piece) => {
      if (piece.id === pieceIds[0]) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    setTimeout(() => {
      _pieces = _pieces
        .filter((piece) => {
          return (
            generateSquareName(piece.pos) !== move.to ||
            piece.id === pieceIds[0]
          );
        })
        .map((piece) => {
          if (piece.id === pieceIds[0]) {
            return { ...piece, type: pieceName };
          }
          return piece;
        });
      dispatch(setPieces(_pieces));
      dispatch(
        addToHistory({
          animatingPieceIds: pieceIds,
          playingAudios,
          pieces: _pieces,
          move,
        })
      );
      dispatch(
        setHighlights({
          marked: [],
          prevMoves: [
            { pos, color: 'blue' },
            { pos: getSquarePosition(move.from), color: 'blue' },
          ],
        })
      );
      dispatch(setTurn(game.turn()));
    }, 200);
  };

export const showPromotionModalBox =
  (pieceIds: number[], move: Move): AppThunk =>
  (dispatch) => {
    dispatch(setHints([]));
    dispatch(setPromotionData({ pieceIds, move }));
  };

export const hidePromotionModalBox = (): AppThunk => (dispatch) => {
  dispatch(cancel());
  dispatch(setPromotionData(null));
};

export const togglePerspective = (): AppThunk => (dispatch, getState) => {
  dispatch(
    setPerspective(getState().gameStore.perspective === 'w' ? 'b' : 'w')
  );
};

export default gameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, PartialMove, PieceSymbol } from 'chess.ts';
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
  addOrRetriveUser,
  updateUser,
  updateGame,
} from 'src/services/firestore.servie';
import {
  AudioType,
  Bot,
  Color,
  GameData,
  GameDataStatus,
  GameResult,
  GameState,
  Highlight,
  Hint,
  Piece,
  Position,
  PromotionData,
  RatingSystem,
  UserData,
} from 'src/types';
import {
  calculateRatingSystem,
  generateSquareName,
  getInitialPieces,
  getPieceId,
  getRookId,
  getSquarePosition,
} from 'src/utils/helpers';
import { AppThunk } from '..';
import {
  addToHistory,
  setCurrentIndex,
  setHistory,
} from '../historyStore/historySlice';
import StockfishLogo from 'src/assets/images/stockfish.png';

export let game = createNewGame();

const initialState: GameState = {
  id: null,
  roomId: null,
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
  opponent: null,
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
    setRoomId(state, action: PayloadAction<string | null>) {
      state.roomId = action.payload;
    },
    setIsDrawBeingOffered(state, action: PayloadAction<boolean>) {
      state.isDrawBeingOffered = action.payload;
    },
    setWinner(state, action: PayloadAction<string | undefined>) {
      state.winner = action.payload;
    },
    setRatingSystem(state, action: PayloadAction<RatingSystem | undefined>) {
      state.ratingSystem = action.payload;
    },
    setResult(state, action: PayloadAction<GameResult | undefined>) {
      state.result = action.payload;
    },
    setWasDrawDeclined(state, action: PayloadAction<boolean | undefined>) {
      state.wasDrawDeclined = action.payload;
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
  setRoomId,
  setIsDrawBeingOffered,
  setWinner,
  setResult,
  setWasDrawDeclined,
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
        status: GameDataStatus.START,
      };
      const gameId = await createGame(gameData);
      updateWaitingRoom(room.id, { ...gameData, gameId });
      await dispatch(start({ ...gameData, id: gameId }));
      resolve();
    } else {
      const roomId = await addWaitingRoom(playerId);
      dispatch(setRoomId(roomId));
      watchWaitingRoom(roomId, async (roomData) => {
        if (!roomData.gameId) return;
        const { black, white, history, gameId: id } = roomData;
        unsbuscribeWaitingRoom(roomId);
        deleteWaitingRoom(roomId);
        await dispatch(
          start({ black, white, history, id, status: GameDataStatus.START })
        );
        resolve();
      });
    }
  });

export const cancelSearch = (): AppThunk => (dispatch, getState) => {
  const roomId = getState().gameStore.roomId;
  if (!roomId) return;
  unsbuscribeWaitingRoom(roomId);
  deleteWaitingRoom(roomId);
  setRoomId(null);
};

export const start =
  (gameData: GameData): AppThunk =>
  async (dispatch, getState) =>
    new Promise<void>(async (resolve) => {
      game = createNewGame();
      const { user } = getState().authStore;
      const authUserId = user?.uid!;
      watchGame(gameData.id, (data: GameData) => {
        const { status, winner, black, white, offerer } = data;
        switch (status) {
          case GameDataStatus.OFFERED_DRAW:
            if (offerer !== authUserId) {
              dispatch(setIsDrawBeingOffered(true));
            }
            break;
          case GameDataStatus.DRAW_ACCEPTED:
            dispatch(end());
            break;
          case GameDataStatus.DRAW_DECLINED:
            if (offerer === authUserId) {
              dispatch(setWasDrawDeclined(true));
            }
            break;
          case GameDataStatus.RESIGNNED:
            dispatch(end(authUserId === winner));
            dispatch(setPlayingAudios(['end']));
            break;
          case GameDataStatus.MADE_MOVE:
            const { move, pieceIds } = data.history[data.history.length - 1];
            dispatch(_makeMove(pieceIds, move));
            break;
          case GameDataStatus.START:
            break;
          default:
            throw Error('Invalid Data');
        }
      });
      const opponent = await addOrRetriveUser(
        gameData.white === authUserId ? gameData.black : gameData.white
      );
      const state: GameState = {
        ...initialState,
        player: gameData.white === authUserId ? 'w' : 'b',
        id: gameData.id,
        perspective: gameData.white === authUserId ? 'w' : 'b',
        opponent,
        ratingSystem: calculateRatingSystem(user!.rating, opponent.rating),
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
      resolve();
    });

export const startWithBot =
  (level: string): AppThunk =>
  (dispatch, getState) =>
    new Promise<void>((resolve) => {
      game = createNewGame();
      const opponent: Bot = {
        displayName: 'Stockfish',
        level,
        photoURL: StockfishLogo,
      };
      const isPlayerWhite = Math.floor(Math.random() * 2) === 0;
      const state: GameState = {
        ...initialState,
        player: isPlayerWhite ? 'w' : 'b',
        id: 'bot',
        perspective: isPlayerWhite ? 'w' : 'b',
        opponent,
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
      resolve();
    });

export const end =
  (isWinning?: boolean): AppThunk =>
  async (dispatch, getState) => {
    const { user } = getState().authStore;
    const { ratingSystem, id } = getState().gameStore;
    if (id === 'bot') {
      let status: any;
      if (isWinning) {
        status = 'win';
      } else if (isWinning === false) {
        status = 'lose';
      } else {
        status = 'draw';
      }
      dispatch(
        setResult({
          difference: 0,
          newRating: 0,
          oldRating: 0,
          status,
        })
      );
      return;
    }
    const { win, loss, draw } = ratingSystem!;
    const authUserId = user?.uid!;
    const opponentId = (getState().gameStore.opponent as UserData)?.uid!;
    let status: 'win' | 'lose' | 'draw';
    let difference;
    const oldRating = user?.rating!;
    if (isWinning) {
      dispatch(setWinner(authUserId));
      status = 'win';
      difference = win;
    } else if (isWinning === false) {
      dispatch(setWinner(opponentId));
      status = 'lose';
      difference = loss;
    } else {
      dispatch(setWinner());
      status = 'draw';
      difference = draw;
    }
    await updateUser(authUserId, { rating: oldRating + difference });
    dispatch(
      setResult({
        difference,
        newRating: oldRating + difference,
        oldRating,
        status,
      })
    );
  };

export const abort = (): AppThunk => (dispatch) => {
  const result: GameResult = {
    difference: 0,
    newRating: 0,
    oldRating: 0,
    status: 'aborted',
  };
  dispatch(setPlayingAudios(['end']));
  dispatch(setResult(result));
};

export const destory = (): AppThunk => (dispatch) => {
  dispatch(setGameState(initialState));
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

export const resign = (): AppThunk => async (dispatch, getState) => {
  const { id, opponent } = getState().gameStore;
  console.log(opponent);
  await updateGame(id!, {
    status: GameDataStatus.RESIGNNED,
    winner: (opponent as UserData)?.uid,
  });
};

export const offerDraw = (): AppThunk => async (dispatch, getState) => {
  const { id } = getState().gameStore;
  const { user } = getState().authStore;
  await updateGame(id!, {
    status: GameDataStatus.OFFERED_DRAW,
    offerer: user?.uid,
  });
};

export const acceptDraw = (): AppThunk => async (dispatch, getState) => {
  const { id } = getState().gameStore;
  dispatch(setIsDrawBeingOffered(false));
  updateGame(id!, { status: GameDataStatus.DRAW_ACCEPTED });
};

export const declineDraw = (): AppThunk => async (dispatch, getState) => {
  const { id } = getState().gameStore;
  dispatch(setIsDrawBeingOffered(false));
  updateGame(id!, { status: GameDataStatus.DRAW_DECLINED });
};

export const makeBotMove =
  (move: PartialMove): AppThunk =>
  (dispatch, getState) => {
    const { pieces } = getState().gameStore;
    const pieceIds = [
      pieces.find((piece) => generateSquareName(piece.pos) === move.from)?.id!,
    ];
    const moves = game.moves({ square: move.from, verbose: true });
    move = {
      ...moves.find((_move) => _move.to === move.to)!,
      promotion: move.promotion,
    };
    const interval = setInterval(() => {
      const { playingAudios, animatingPieceIds } = getState().gameStore;
      if (playingAudios.length === 0 && animatingPieceIds.length === 0) {
        clearInterval(interval);
        dispatch(makeMove(pieceIds, move as Move));
      }
    }, 500);
  };

export const makeMove =
  (pieceIds: number[], gameMove: Move): AppThunk =>
  (dispatch, getState) => {
    const { id } = getState().gameStore;
    if (id === 'bot') {
      dispatch(_makeMove(pieceIds, gameMove));
    } else {
      addGameMove(id!, {
        pieceIds,
        move: JSON.parse(JSON.stringify(gameMove)),
      });
    }
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
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : turn === player
      ? ['moveSelf']
      : ['moveOpponent'];
    if (game.inCheckmate()) {
      dispatch(end(game.turn() !== player));
      playingAudios.push('end');
    }
    if (game.inDraw()) {
      dispatch(end());
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

export const getFen = (): string => {
  return game.fen();
};

export default gameSlice.reducer;

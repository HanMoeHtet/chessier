import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, PartialMove, PieceSymbol } from 'chess.ts';
import {
  createNewGame,
  getInitialPieces,
  getMoves,
  getTurn,
  isInCheck,
  isInCheckMate,
  isInDraw,
  setUpNewGame,
  makeMove as makeGameMove,
  getPieceIdFromInitialPosition,
} from 'src/services/game.service';
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
  AfterMoveData,
  AudioType,
  BeforeMoveData,
  BeforeMoveReturnData,
  Bot,
  Color,
  GameData,
  GameDataStatus,
  GameResult,
  GameState,
  Highlight,
  Hint,
  Piece,
  Player,
  Position,
  PromotionData,
  RatingSystem,
  UserData,
} from 'src/types';
import {
  calculateRatingSystem,
  getSquareName,
  getSquarePosition,
} from 'src/services/game.service';
import { AppThunk } from '..';
import {
  addToHistory,
  getPrevMove,
  getPrevMoveHighlights,
  setCurrentIndex,
  setHistory,
} from '../historyStore/historySlice';
import StockfishLogo from 'src/assets/images/stockfish.png';
import { setWaitingRoomId } from '../waitingRoomStore/waitinRoomSlice';
import { DEFAULT_UERNAME } from 'src/utils/constants';

const initialState: GameState = {
  pieces: getInitialPieces(),
  hints: [],
  highlights: [],
  perspective: 'w',
  animatingPieceIds: [],
  playingAudios: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(_, action: PayloadAction<GameState>) {
      return action.payload;
    },
    setHints(state, action: PayloadAction<Hint[]>) {
      state.hints = action.payload;
    },
    setHighlights(state, action: PayloadAction<Highlight[]>) {
      state.highlights = action.payload;
    },
    setPieces(state, action: PayloadAction<Piece[]>) {
      state.pieces = action.payload;
    },
    setTurn(state, action: PayloadAction<'w' | 'b'>) {
      state.turn = action.payload;
    },
    setPromotionData(state, action: PayloadAction<PromotionData | undefined>) {
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
  setHints,
  setHighlights,
  setPieces,
  setTurn,
  setPromotionData,
  setPerspective,
  setPlayingAudios,
  setAnimatingPieceIds,
  setGameId,
  setIsDrawBeingOffered,
  setWinner,
  setResult,
  setWasDrawDeclined,
} = gameSlice.actions;

export const findMatch = (): AppThunk<Promise<void>> => (dispatch, getState) =>
  new Promise<void>(async (resolve, reject) => {
    const playerId = getState().authStore.user?.uid!;
    // TODO: Replace with actual matchmaking logic
    // Find waiting room in db
    const room = await findInWaitingRooms((data) => true);
    if (room) {
      // Match found
      // Set up new game
      const gameData = setUpNewGame(playerId, room.playerId);
      // Create game in db
      const gameId = await createGame(gameData);
      // Pass game data to waiting room
      // to share with another player
      updateWaitingRoom(room.id, { ...gameData, gameId });
      // Start the game
      await dispatch(start({ ...gameData, id: gameId }));
      resolve();
    } else {
      // Match not found
      // Create new room in db
      const roomId = await addWaitingRoom(playerId);
      // Store room id so that it can be deleted later
      dispatch(setWaitingRoomId(roomId));
      // Watch for the data
      // and start the game when game data is set
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
  const roomId = getState().waitingRoomStore.id;
  if (!roomId) return;
  unsbuscribeWaitingRoom(roomId);
  deleteWaitingRoom(roomId);
  setWaitingRoomId(null);
};

export const start =
  (gameData: GameData): AppThunk<Promise<void>> =>
  async (dispatch, getState) =>
    new Promise<void>(async (resolve) => {
      createNewGame();
      const { user } = getState().authStore;
      const authUserId = user?.uid!;
      watchGame(gameData.id, (data: GameData) => {
        const { status, winner, offerer, history } = data;
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
            const state = history[history.length - 1];
            if (!state) break;
            const { move } = state;
            dispatch(_makeMove(move));
            break;
          case GameDataStatus.START:
            break;
          default:
            throw Error('Invalid Data');
        }
      });
      const white = await addOrRetriveUser(gameData.white);
      const black = await addOrRetriveUser(gameData.black);
      const opponent = authUserId === white.uid ? black : white;
      const state: GameState = {
        ...initialState,
        turn: getTurn(),
        white,
        black,
        opponent,
        playerColor: gameData.white === authUserId ? 'w' : 'b',
        id: gameData.id,
        perspective: gameData.white === authUserId ? 'w' : 'b',
        ratingSystem: calculateRatingSystem(white.rating, black.rating),
        playingAudios: ['start'],
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
      createNewGame();
      const { user } = getState().authStore;
      const player: Player = user || {
        displayName: DEFAULT_UERNAME,
      };
      const opponent: Bot = {
        displayName: 'Stockfish',
        level,
        photoURL: StockfishLogo,
      };
      const isPlayerWhite = Math.floor(Math.random() * 2) === 0;
      const state: GameState = {
        ...initialState,
        id: 'bot',
        turn: getTurn(),
        white: isPlayerWhite ? player : opponent,
        black: isPlayerWhite ? opponent : player,
        playerColor: isPlayerWhite ? 'w' : 'b',
        perspective: isPlayerWhite ? 'w' : 'b',
        playingAudios: ['start'],
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
  (pieceId: number): AppThunk =>
  async (dispatch, getState) => {
    const { pieces, highlights, playerColor } = getState().gameStore;
    const piece = pieces.find((piece) => piece.id === pieceId);
    if (!piece) return;
    const pos = piece.pos;
    // Set highlights
    const prevMoveHighlights = dispatch(getPrevMoveHighlights());
    if (
      highlights.find(
        (highlight) => getSquareName(highlight.pos) === getSquareName(pos)
      )
    ) {
      dispatch(setHighlights(prevMoveHighlights));
    } else {
      dispatch(setHighlights([...prevMoveHighlights, { pos, color: 'blue' }]));
    }
    // Set hints
    if (getTurn() !== playerColor) {
      return;
    }
    const hints = getMoves(getSquareName(pos)).reduce((prev: Hint[], cur) => {
      if (!prev.find((hint) => hint.move.to === cur.to)) {
        prev.push({ move: cur });
      }
      return prev;
    }, []);
    dispatch(setHints(hints));
  };

export const mark =
  (color: Color = 'red', pos: Position): AppThunk =>
  (dispatch, getState) => {
    const { highlights } = getState().gameStore;
    dispatch(setHints([]));
    const newHighlights = highlights
      .filter(
        (highlight) => getSquareName(highlight.pos) !== getSquareName(pos)
      )
      .concat({ color, pos });
    dispatch(setHighlights([...highlights, ...newHighlights]));
  };

export const cancel = (): AppThunk => (dispatch) => {
  dispatch(setHints([]));
  const prevMoveHighlights = dispatch(getPrevMoveHighlights());
  dispatch(setHighlights(prevMoveHighlights));
};

/**
 * TODO: Skip modal dialog box for bot's move
 */
export const makeBotMove =
  (move: PartialMove): AppThunk =>
  (dispatch, getState) => {
    const { pieces } = getState().gameStore;
    const pieceIds = [
      pieces.find((piece) => getSquareName(piece.pos) === move.from)?.id!,
    ];
    const moves = getMoves(move.from);
    move = {
      ...moves.find((_move) => _move.to === move.to)!,
      promotion: move.promotion,
    };
    const interval = setInterval(() => {
      const { playingAudios, animatingPieceIds } = getState().gameStore;
      if (playingAudios.length === 0 && animatingPieceIds.length === 0) {
        clearInterval(interval);
        dispatch(makeMove(move as Move));
      }
    }, 500);
  };

export const makeMove =
  (gameMove: Move): AppThunk =>
  (dispatch, getState) => {
    const { id } = getState().gameStore;
    if (id === 'bot') {
      dispatch(_makeMove(gameMove));
    } else {
      addGameMove(id!, {
        move: JSON.parse(JSON.stringify(gameMove)),
      });
    }
  };

// FIXME: Fix promotion process
export const _makeMove =
  (gameMove: Move): AppThunk =>
  (dispatch) => {
    switch (gameMove.flags) {
      case 'e':
        dispatch(enPassant(gameMove));
        break;
      case 'c':
        dispatch(capture(gameMove));
        break;
      case 'cp':
      case 'np':
        dispatch(showPromotionModalBox(gameMove));
        break;
      case 'k':
        dispatch(kingSideCastle(gameMove));
        break;
      case 'q':
        dispatch(queenSideCastle(gameMove));
        break;
      default:
        dispatch(move(gameMove));
        break;
    }
  };

export const beforeMove =
  ({
    move,
    defaultAudios,
    extraAnimatingPieceIds = [],
  }: BeforeMoveData): AppThunk<BeforeMoveReturnData | false> =>
  (dispatch, getState) => {
    const { pieces } = getState().gameStore;
    // Make move in game
    if (!makeGameMove(move)) return false;
    // Add audios
    const playingAudios: AudioType[] = isInCheck()
      ? ['moveCheck']
      : defaultAudios;
    const piece = pieces.find(
      (piece) => getSquareName(piece.pos) === move.from
    );
    if (!piece) return false;
    // Add animation
    dispatch(setAnimatingPieceIds([piece.id, ...extraAnimatingPieceIds]));
    return { currentPiece: piece, playingAudios };
  };

export const afterMove =
  ({ playingAudios, currentPiece, pieces, move }: AfterMoveData): AppThunk =>
  (dispatch, getState) => {
    const { playerColor } = getState().gameStore;
    // When game is over
    if (isInCheckMate()) {
      dispatch(end(getTurn() !== playerColor));
      playingAudios.push('end');
    }
    if (isInDraw()) {
      dispatch(end());
      playingAudios.push('end');
    }
    // Add to history
    dispatch(
      addToHistory({
        animatingPieceIds: [currentPiece.id],
        playingAudios,
        pieces,
        move,
      })
    );
    dispatch(setPlayingAudios(playingAudios)); // Set audios
    dispatch(setTurn(getTurn())); // Set player's turn
    dispatch(cancel()); // Cancel focus to remove highlights and hints
    // Highlight previous moves
    const prevMoveHighlights = dispatch(getPrevMoveHighlights());
    dispatch(setHighlights(prevMoveHighlights));
  };

export const move =
  (move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { pieces, turn, playerColor } = getState().gameStore;
    const result = dispatch(
      beforeMove({
        move,
        defaultAudios: turn === playerColor ? ['moveSelf'] : ['moveOpponent'],
      })
    );
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((_piece) => {
      if (_piece.id === currentPiece.id) {
        return {
          ..._piece,
          pos,
        };
      } else {
        return _piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(afterMove({ currentPiece, move, pieces: _pieces, playingAudios }));
  };

export const capture =
  (move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { pieces } = getState().gameStore;
    const result = dispatch(beforeMove({ move, defaultAudios: ['capture'] }));
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === currentPiece.id) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    // Cancel the foucus to remove hints and highlights
    dispatch(cancel());
    setTimeout(() => {
      // Remove the target piece
      _pieces = _pieces.filter((piece) => {
        return (
          getSquareName(piece.pos) !== move.to || piece.id === currentPiece.id
        );
      });
      dispatch(setPieces(_pieces));
      dispatch(
        afterMove({ currentPiece, move, pieces: _pieces, playingAudios })
      );
    }, 200);
  };

export const enPassant =
  (move: Move): AppThunk =>
  async (dispatch, getState) => {
    const result = dispatch(beforeMove({ defaultAudios: ['capture'], move }));
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    const { pieces } = getState().gameStore;
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === currentPiece.id) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    // Cancel the foucus to remove hints and highlights
    dispatch(cancel());
    setTimeout(() => {
      // Remove the target piece
      _pieces = _pieces.filter((piece) => {
        const targetPos = {
          row: pos.row + (getTurn() === 'w' ? -1 : 1),
          col: pos.col,
        };
        return (
          getSquareName(piece.pos) !== getSquareName(targetPos) ||
          piece.id === currentPiece.id
        );
      });
      dispatch(setPieces(_pieces));
      dispatch(
        afterMove({ currentPiece, move, pieces: _pieces, playingAudios })
      );
    }, 200);
  };

export const kingSideCastle =
  (move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { pieces, turn } = getState().gameStore;
    // Get the rook from initial position sice it has not been moved
    const rookMove = {
      from: {
        row: turn === 'w' ? 7 : 0,
        col: 7,
      },
      to: {
        row: turn === 'w' ? 7 : 0,
        col: 5,
      },
    };
    const rookId = getPieceIdFromInitialPosition(rookMove.from);
    const result = dispatch(
      beforeMove({
        defaultAudios: ['castle'],
        move,
        extraAnimatingPieceIds: [rookId],
      })
    );
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === currentPiece.id) {
        return {
          ...piece,
          pos,
        };
      } else if (getSquareName(rookMove.from) === getSquareName(piece.pos)) {
        return {
          ...piece,
          pos: rookMove.to,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(afterMove({ currentPiece, move, pieces: _pieces, playingAudios }));
  };

export const queenSideCastle =
  (move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { pieces, turn } = getState().gameStore;
    // Get the rook from initial position sice it has not been moved
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
    const rookId = getPieceIdFromInitialPosition(rookPos.from);
    const result = dispatch(
      beforeMove({
        defaultAudios: ['castle'],
        move,
        extraAnimatingPieceIds: [rookId],
      })
    );
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === currentPiece.id) {
        return {
          ...piece,
          pos,
        };
      } else if (getSquareName(rookPos.from) === getSquareName(piece.pos)) {
        return {
          ...piece,
          pos: rookPos.to,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(_pieces));
    dispatch(afterMove({ currentPiece, move, pieces: _pieces, playingAudios }));
  };

export const promote =
  (move: Move, pieceName: PieceSymbol): AppThunk =>
  (dispatch, getState) => {
    move = {
      ...move,
      promotion: pieceName,
    };
    const result = dispatch(beforeMove({ defaultAudios: ['promote'], move }));
    if (result === false) return;
    const { currentPiece, playingAudios } = result;
    const { pieces } = getState().gameStore;
    // Hide the modal box
    dispatch(hidePromotionModalBox());
    // Move the piece
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === currentPiece.id) {
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
      // Remove the target piece and change current piece to promoted piece
      _pieces = _pieces
        .filter((piece) => {
          return (
            getSquareName(piece.pos) !== move.to || piece.id === currentPiece.id
          );
        })
        .map((piece) => {
          if (piece.id === currentPiece.id) {
            return { ...piece, type: pieceName };
          }
          return piece;
        });
      dispatch(setPieces(_pieces));
      dispatch(
        afterMove({ currentPiece, move, pieces: _pieces, playingAudios })
      );
    }, 200);
  };

export const showPromotionModalBox =
  (move: Move): AppThunk =>
  (dispatch) => {
    dispatch(setHints([]));
    dispatch(setPromotionData({ move }));
  };

export const hidePromotionModalBox = (): AppThunk => (dispatch) => {
  dispatch(cancel());
  dispatch(setPromotionData(undefined));
};

export const resign = (): AppThunk => async (_, getState) => {
  const { id, opponent } = getState().gameStore;
  await updateGame(id!, {
    status: GameDataStatus.RESIGNNED,
    winner: (opponent as UserData)?.uid,
  });
};

export const offerDraw = (): AppThunk => async (_, getState) => {
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

export const togglePerspective = (): AppThunk => (dispatch, getState) => {
  dispatch(
    setPerspective(getState().gameStore.perspective === 'w' ? 'b' : 'w')
  );
};

export default gameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, PieceSymbol } from 'chess.ts';
import game from 'src/services/game.service';
import { Piece, Position, PromotionData } from 'src/types';
import {
  generateSquareName,
  getInitialPieces,
  getSquarePosition,
} from 'src/utils/helpers';
import { AppThunk } from '..';
import { addToHistory } from '../historyStore/historySlice';

export interface GameState {
  focusedPieceId: number | null;
  pieces: Piece[];
  hints: Move[];
  turn: string;
  promotionData: null | PromotionData;
  perspective: 'w' | 'b';
}

const initialState: GameState = {
  pieces: getInitialPieces(),
  focusedPieceId: null,
  hints: [],
  turn: game.turn(),
  promotionData: null,
  perspective: 'w',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFocusedPieceId(state, action: PayloadAction<number | null>) {
      state.focusedPieceId = action.payload;
    },
    setHints(state, action: PayloadAction<Move[]>) {
      state.hints = action.payload;
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
  },
});

export const {
  setFocusedPieceId,
  setHints,
  setPieces,
  setTurn,
  setPromotionData,
  setPerspective,
} = gameSlice.actions;

export const focus =
  (pieceId: number, pos: Position): AppThunk =>
  async (dispatch) => {
    dispatch(setFocusedPieceId(pieceId));
    const hints = game
      .moves({
        square: generateSquareName(pos),
        verbose: true,
      })
      .reduce((prev: Move[], cur) => {
        if (!prev.find((hint) => hint.to === cur.to)) {
          prev.push(cur);
        }
        return prev;
      }, []);
    dispatch(setHints(hints));
  };

export const cancel = (): AppThunk => (dispatch) => {
  dispatch(setFocusedPieceId(null));
  dispatch(setHints([]));
};

export const move =
  (pos: Position, move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(cancel());
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(pieces));
    dispatch(addToHistory(pieces));
    game.move(move);
    dispatch(setTurn(game.turn()));
  };

export const capture =
  (pos: Position, move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(cancel());
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(pieces));
    window.setTimeout(() => {
      pieces = pieces.filter((piece) => {
        return (
          generateSquareName(piece.pos) !== move.to ||
          piece.id === focusedPieceId
        );
      });
      dispatch(setPieces(pieces));
      dispatch(addToHistory(pieces));
      game.move(move);
      dispatch(setTurn(game.turn()));
    }, 200);
  };

export const enPassant =
  (pos: Position, move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(cancel());
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(pieces));
    window.setTimeout(() => {
      pieces = pieces.filter((piece) => {
        const [row, col] = getSquarePosition(move.to);
        const targetPos = {
          row: row + (game.turn() === 'w' ? -1 : 1),
          col,
        };
        return (
          generateSquareName(piece.pos) !== generateSquareName(targetPos) ||
          piece.id === focusedPieceId
        );
      });
      dispatch(setPieces(pieces));
      dispatch(addToHistory(pieces));
      game.move(move);
      dispatch(setTurn(game.turn()));
    }, 200);
  };

export const kingSideCastle =
  (pos: Position, move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(cancel());
    const rookPos = {
      from: {
        row: game.turn() === 'w' ? 7 : 0,
        col: 7,
      },
      to: {
        row: game.turn() === 'w' ? 7 : 0,
        col: 5,
      },
    };
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
    dispatch(setPieces(pieces));
    dispatch(addToHistory(pieces));
    game.move(move);
    dispatch(setTurn(game.turn()));
  };

export const queenSideCastle =
  (pos: Position, move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(cancel());
    const rookPos = {
      from: {
        row: game.turn() === 'w' ? 7 : 0,
        col: 0,
      },
      to: {
        row: game.turn() === 'w' ? 7 : 0,
        col: 3,
      },
    };
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
    dispatch(setPieces(pieces));
    dispatch(addToHistory(pieces));
    game.move(move);
    dispatch(setTurn(game.turn()));
  };

export const showPromotionModalBox =
  (pos: Position, move: Move): AppThunk =>
  (dispatch) => {
    dispatch(setHints([]));
    dispatch(setPromotionData({ pos, move }));
  };

export const hidePromotionModalBox = (): AppThunk => (dispatch) => {
  dispatch(cancel());
  dispatch(setPromotionData(null));
};

export const promote =
  (pos: Position, move: Move, pieceName: PieceSymbol): AppThunk =>
  (dispatch, getState) => {
    const { focusedPieceId } = getState().gameStore;
    dispatch(hidePromotionModalBox());
    let pieces = getState().gameStore.pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
        return {
          ...piece,
          pos,
        };
      } else {
        return piece;
      }
    });
    dispatch(setPieces(pieces));
    game.move({
      ...move,
      promotion: pieceName,
    });
    dispatch(setTurn(game.turn()));
    setTimeout(() => {
      pieces = pieces
        .filter((piece) => {
          return (
            generateSquareName(piece.pos) !== move.to ||
            piece.id === focusedPieceId
          );
        })
        .map((piece) => {
          if (piece.id === focusedPieceId) {
            return { ...piece, type: pieceName };
          }
          return piece;
        });
      dispatch(setPieces(pieces));
      dispatch(addToHistory(pieces));
    }, 200);
  };

export const togglePerspective = (): AppThunk => (dispatch, getState) => {
  dispatch(
    setPerspective(getState().gameStore.perspective === 'w' ? 'b' : 'w')
  );
};

export default gameSlice.reducer;

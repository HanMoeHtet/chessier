import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move, PieceSymbol } from 'chess.ts';
import game from 'src/services/game.service';
import {
  AudioType,
  Color,
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
import { addToHistory } from '../historyStore/historySlice';

const initialState: GameState = {
  pieces: getInitialPieces(),
  focusedPieceId: null,
  hints: [],
  highlights: { prevMoves: [], marked: [] },
  turn: game.turn(),
  promotionData: null,
  perspective: 'w',
  animatingPieceIds: [],
  playingAudios: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
  },
});

export const {
  setFocusedPieceId,
  setHints,
  setHighlights,
  setPieces,
  setTurn,
  setPromotionData,
  setPerspective,
  setPlayingAudios,
  setAnimatingPieceIds,
} = gameSlice.actions;

export const focus =
  (pieceId: number, pos: Position): AppThunk =>
  async (dispatch, getState) => {
    const { highlights } = getState().gameStore;
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

export const move =
  (pieceIds: number[], move: Move): AppThunk =>
  async (dispatch, getState) => {
    const { focusedPieceId, pieces, turn } = getState().gameStore;
    game.move(move);
    dispatch(setAnimatingPieceIds(pieceIds));
    // TODO: This is a mocked version. Replace it when player system is implemented.
    const playingAudios: AudioType[] = game.inCheck()
      ? ['moveCheck']
      : turn === 'w'
      ? ['moveSelf']
      : ['moveOpponent'];
    dispatch(setPlayingAudios(playingAudios));
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
          generateSquareName(piece.pos) !== move.to ||
          piece.id === focusedPieceId
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
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    const pos = getSquarePosition(move.to);
    let _pieces = pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
          piece.id === focusedPieceId
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
    dispatch(setPlayingAudios(playingAudios));
    const { focusedPieceId, pieces } = getState().gameStore;
    dispatch(hidePromotionModalBox());
    const pos = getSquarePosition(move.to);
    console.log(pos);
    let _pieces = pieces.map((piece) => {
      if (piece.id === focusedPieceId) {
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
            piece.id === focusedPieceId
          );
        })
        .map((piece) => {
          if (piece.id === focusedPieceId) {
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

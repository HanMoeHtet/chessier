import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Piece } from 'src/types';
import { AppThunk } from '..';
import { setPieces } from '../gameStore/gameSlice';
import game from 'src/services/game.service';
import { getInitialPieces } from 'src/utils/helpers';
import { Move } from 'chess.ts';

interface GameHistory {
  currentIndex: number;
  history: {
    pieces: Piece[];
    move: Move | null;
  }[];
}

const initialState: GameHistory = {
  currentIndex: 0,
  history: [
    {
      pieces: getInitialPieces(),
      move: null,
    },
  ],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory(
      state,
      action: PayloadAction<{ pieces: Piece[]; move: Move | null }[]>
    ) {
      state.history = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const { setHistory, setCurrentIndex } = historySlice.actions;

export const addToHistory =
  (pieces: Piece[], move: Move): AppThunk =>
  (dispatch, getState) => {
    dispatch(
      setHistory([...getState().historyStore.history, { pieces, move }])
    );
    dispatch(setCurrentIndex(getState().historyStore.currentIndex + 1));
  };

export const back = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  if (currentIndex === 0) return;
  const prevPieces = history[currentIndex - 1].pieces;
  game.undo();
  dispatch(setPieces(prevPieces));
  dispatch(setCurrentIndex(currentIndex - 1));
};

export const next = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  if (currentIndex === history.length - 1) return;
  const { pieces: nextPieces, move } = history[currentIndex + 1];
  if (!move) return;
  game.move(move);
  dispatch(setPieces(nextPieces));
  dispatch(setCurrentIndex(currentIndex + 1));
};

export default historySlice.reducer;

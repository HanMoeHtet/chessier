import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Piece } from 'src/types';
import { AppThunk } from '..';
import { setPieces } from '../gameStore/gameSlice';
import game from 'src/services/game.service';
import { getInitialPieces } from 'src/utils/helpers';

interface GameHistory {
  currentIndex: number;
  history: Piece[][];
}

const initialState: GameHistory = {
  currentIndex: 0,
  history: [getInitialPieces()],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory(state, action: PayloadAction<Piece[][]>) {
      state.history = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const { setHistory, setCurrentIndex } = historySlice.actions;

export const addToHistory =
  (pieces: Piece[]): AppThunk =>
  (dispatch, getState) => {
    dispatch(setHistory([...getState().historyStore.history, pieces]));
    dispatch(setCurrentIndex(getState().historyStore.currentIndex + 1));
  };

export const back = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  if (currentIndex === 0) return;
  const prevPieces = history[currentIndex - 1];
  game.undo();
  dispatch(setPieces(prevPieces));
  dispatch(setCurrentIndex(currentIndex - 1));
};

export default historySlice.reducer;

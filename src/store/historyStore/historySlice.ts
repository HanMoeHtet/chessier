import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioType, GameHistory, History, Piece } from 'src/types';
import { AppThunk } from '..';
import {
  setAnimatingPieceIds,
  setPieces,
  setPlayingAudios,
} from '../gameStore/gameSlice';
import game from 'src/services/game.service';
import { getInitialPieces } from 'src/utils/helpers';
import { Move } from 'chess.ts';

const initialState: GameHistory = {
  currentIndex: 0,
  history: [
    {
      pieces: getInitialPieces(),
      move: null,
      animatingPieceIds: [],
      playingAudios: [],
    },
  ],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory(
      state,
      action: PayloadAction<
        {
          pieces: Piece[];
          move: Move | null;
          animatingPieceIds: number[];
          playingAudios: AudioType[];
        }[]
      >
    ) {
      state.history = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const { setHistory, setCurrentIndex } = historySlice.actions;

export const addToHistory: (history: History) => AppThunk =
  ({ pieces, move, animatingPieceIds, playingAudios }): AppThunk =>
  (dispatch, getState) => {
    const { history } = getState().historyStore;
    dispatch(
      setHistory([
        ...history,
        { animatingPieceIds, playingAudios, pieces, move },
      ])
    );
    dispatch(setCurrentIndex(getState().historyStore.currentIndex + 1));
  };

export const back = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  if (currentIndex === 0) return;
  const { pieces: prevPieces } = history[currentIndex - 1];
  const { animatingPieceIds, playingAudios } = history[currentIndex];
  game.undo();
  dispatch(setPieces(prevPieces));
  dispatch(setAnimatingPieceIds(animatingPieceIds));
  dispatch(setPlayingAudios(playingAudios));
  dispatch(setCurrentIndex(currentIndex - 1));
};

export const next = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  if (currentIndex === history.length - 1) return;
  const {
    pieces: nextPieces,
    move,
    animatingPieceIds,
    playingAudios,
  } = history[currentIndex + 1];
  if (!move) return;
  game.move(move);
  dispatch(setPieces(nextPieces));
  dispatch(setAnimatingPieceIds(animatingPieceIds));
  dispatch(setPlayingAudios(playingAudios));
  dispatch(setCurrentIndex(currentIndex + 1));
};

export default historySlice.reducer;

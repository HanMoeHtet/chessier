import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioType, GameHistory, Highlight, History, Piece } from 'src/types';
import { AppThunk } from '..';
import {
  setAnimatingPieceIds,
  setHighlights,
  setPieces,
  setPlayingAudios,
} from '../gameStore/gameSlice';
import { Move } from 'chess.ts';
import {
  getInitialPieces,
  getSquarePosition,
  makeMove,
  undo,
} from 'src/services/game.service';

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
  const prevState = history[currentIndex - 1];
  if (!prevState) return;
  const { pieces: prevPieces, move } = prevState;
  const currentState = history[currentIndex];
  if (!currentState) throw Error('An error ocurred.');
  const { animatingPieceIds, playingAudios } = currentState;
  undo();
  dispatch(setPieces(prevPieces));
  dispatch(setAnimatingPieceIds(animatingPieceIds));
  dispatch(setPlayingAudios(playingAudios));
  dispatch(setCurrentIndex(currentIndex - 1));
  if (!move) {
    dispatch(setHighlights([]));
  } else {
    dispatch(
      setHighlights([
        { pos: getSquarePosition(move.to), color: 'blue' },
        { pos: getSquarePosition(move.from), color: 'blue' },
      ])
    );
  }
};

export const next = (): AppThunk => (dispatch, getState) => {
  const { history, currentIndex } = getState().historyStore;
  const nextState = history[currentIndex + 1];
  if (!nextState) return false;
  const {
    pieces: nextPieces,
    move,
    animatingPieceIds,
    playingAudios,
  } = nextState;
  if (!move) return;
  makeMove(move);
  dispatch(setPieces(nextPieces));
  dispatch(setAnimatingPieceIds(animatingPieceIds));
  dispatch(setPlayingAudios(playingAudios));
  dispatch(setCurrentIndex(currentIndex + 1));
  dispatch(
    setHighlights([
      { pos: getSquarePosition(move.to), color: 'blue' },
      { pos: getSquarePosition(move.from), color: 'blue' },
    ])
  );
};

export const goto =
  (index: number): AppThunk =>
  (dispatch, getState) => {
    const { history } = getState().historyStore;
    const state = history[index];
    if (!state) return;
    const { pieces, move, animatingPieceIds, playingAudios } = state;
    if (!move) return;
    dispatch(setPieces(pieces));
    dispatch(setAnimatingPieceIds(animatingPieceIds));
    dispatch(setPlayingAudios(playingAudios));
    dispatch(setCurrentIndex(index));
    dispatch(
      setHighlights([
        { pos: getSquarePosition(move.to), color: 'blue' },
        { pos: getSquarePosition(move.from), color: 'blue' },
      ])
    );
  };

export const firstMove = (): AppThunk => (dispatch) => {
  dispatch(goto(1));
};

export const lastMove = (): AppThunk => (dispatch, getState) => {
  dispatch(goto(getState().historyStore.history.length - 1));
};

export const getPrevMove = (): AppThunk<Move | null> => (_, getState) => {
  const { currentIndex, history } = getState().historyStore;
  let state;
  if (!(state = history[currentIndex])) return null;
  return state.move;
};

export const getPrevMoveHighlights =
  (): AppThunk<Highlight[]> => (dispatch) => {
    const move = dispatch(getPrevMove());
    if (!move) return [];
    return [
      { color: 'blue', pos: getSquarePosition(move.from) },
      { color: 'blue', pos: getSquarePosition(move.to) },
    ];
  };

export default historySlice.reducer;

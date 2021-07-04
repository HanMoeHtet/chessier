import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './gameStore/gameSlice';
import historyReducer from './historyStore/historySlice';

export const store = configureStore({
  reducer: {
    gameStore: gameReducer,
    historyStore: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

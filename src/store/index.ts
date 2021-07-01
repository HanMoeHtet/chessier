import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './gameStore/gameSlice';

export const store = configureStore({
  reducer: {
    gameStore: gameReducer,
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

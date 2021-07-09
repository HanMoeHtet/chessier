import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './gameStore/gameSlice';
import historyReducer from './historyStore/historySlice';
import authReducer from './authStore/authSlice';

export const store = configureStore({
  reducer: {
    gameStore: gameReducer,
    historyStore: historyReducer,
    authStore: authReducer,
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

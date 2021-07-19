import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './gameStore/gameSlice';
import historyReducer from './historyStore/historySlice';
import authReducer from './authStore/authSlice';
import modalContentReducer from './modalContent/modalContentSlice';
import waitingRoomReducer from './waitingRoomStore/waitinRoomSlice';

export const store = configureStore({
  reducer: {
    gameStore: gameReducer,
    historyStore: historyReducer,
    authStore: authReducer,
    modalContentStore: modalContentReducer,
    waitingRoomStore: waitingRoomReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

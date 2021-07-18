import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WaitingRoomState } from 'src/types';

const initialState: WaitingRoomState = {
  id: null,
};

const waitingRoomSlice = createSlice({
  name: 'waitingRoom',
  initialState,
  reducers: {
    setWaitingRoomId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },
  },
});

export const { setWaitingRoomId } = waitingRoomSlice.actions;

export default waitingRoomSlice.reducer;

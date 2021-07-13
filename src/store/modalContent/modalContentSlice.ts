import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalContentState, ModalContentType } from 'src/types';

const initialState: ModalContentState = {
  content: null,
  backgroundColor: 'dark',
};

export const modalContentSlice = createSlice({
  name: 'modalContent',
  initialState,
  reducers: {
    setModalContent(state, action: PayloadAction<ModalContentType | null>) {
      state.content = action.payload;
    },
    setBackgroundcolor(state, action: PayloadAction<'dark' | 'light'>) {
      state.backgroundColor = action.payload;
    },
  },
});

export const { setModalContent, setBackgroundcolor } =
  modalContentSlice.actions;

export default modalContentSlice.reducer;

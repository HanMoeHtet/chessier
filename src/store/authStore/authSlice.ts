import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from 'src/types';

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setIsLoading } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Piece } from 'chess.ts';
import game from 'src/services/game.service';

export interface GameState {
  board: (Piece | null)[][];
}

const initialState: GameState = {
  board: game.board(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

// export const {} = gameSlice.actions;

export default gameSlice.reducer;

import { Move, Piece as ChessPiece } from 'chess.ts';

export interface Position {
  row: number;
  col: number;
}

export interface Piece extends ChessPiece {
  id: number;
  pos: Position;
}

export interface PromotionData {
  pos: Position;
  move: Move;
}

export type Color = 'red' | 'blue';

export interface Highlight {
  pos: Position;
  color: Color;
}

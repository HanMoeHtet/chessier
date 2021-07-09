import { Move, Piece as ChessPiece } from 'chess.ts';

export interface Position {
  row: number;
  col: number;
}

export interface Piece extends ChessPiece {
  id: number;
  pos: Position;
}

export interface PromotionData extends Hint {}

export type Color = 'red' | 'blue';

export interface Highlight {
  pos: Position;
  color: Color;
}

export type AudioType =
  | 'start'
  | 'end'
  | 'capture'
  | 'castle'
  | 'promote'
  | 'moveSelf'
  | 'moveCheck'
  | 'moveOpponent'
  | 'premove'
  | 'tenSeconds'
  | 'illegal';

export interface Hint {
  move: Move;
  pieceIds: number[];
}

export interface GameState {
  focusedPieceId: number | null;
  pieces: Piece[];
  hints: Hint[];
  turn: string;
  highlights: { prevMoves: Highlight[]; marked: Highlight[] };
  promotionData: null | PromotionData;
  perspective: 'w' | 'b';
  animatingPieceIds: number[];
  playingAudios: AudioType[];
}

export interface History {
  pieces: Piece[];
  move: Move | null;
  animatingPieceIds: number[];
  playingAudios: AudioType[];
}

export interface GameHistory {
  currentIndex: number;
  history: History[];
}

export type Provider = 'google' | 'facebook' | 'github';

export interface User {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

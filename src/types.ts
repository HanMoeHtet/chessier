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
  id: string | null;
  roomId: string | null;
  focusedPieceId: number | null;
  pieces: Piece[];
  hints: Hint[];
  turn: string;
  highlights: { prevMoves: Highlight[]; marked: Highlight[] };
  promotionData: null | PromotionData;
  perspective: 'w' | 'b';
  animatingPieceIds: number[];
  playingAudios: AudioType[];
  player: 'w' | 'b' | null;
  isDrawBeingOffered?: boolean;
  ratingSystem?: RatingSystem;
  winner?: string;
  opponent: UserData | null;
  result?: GameResult;
  wasDrawDeclined?: boolean;
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

export interface User extends UserData {
  email: string | null;
  phoneNumber: string | null;
  providerId: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface UserData {
  uid: string;
  rating: number;
  photoURL: string | null;
  displayName: string;
}

export enum GameDataStatus {
  START,
  MADE_MOVE,
  RESIGNNED,
  OFFERED_DRAW,
  DRAW_ACCEPTED,
  DRAW_DECLINED,
  END,
}

export interface GameData {
  white: string;
  black: string;
  history: { pieceIds: number[]; move: Move }[];
  id: string;
  offerer?: string | null;
  status: GameDataStatus;
  winner?: string;
}

export interface RatingSystem {
  win: number;
  loss: number;
  draw: number;
}

export interface GameResult {
  newRating: number;
  oldRating: number;
  status: 'win' | 'lose' | 'draw';
  difference: number;
}

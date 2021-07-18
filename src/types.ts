import { Move, Piece as ChessPiece } from 'chess.ts';

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
}

export interface WaitingRoomState {
  id: string | null;
}

export interface GameState {
  // Shared
  id?: string;
  pieces: Piece[];
  white?: Player | Bot;
  black?: Player | Bot;
  // Player specific
  playerColor?: 'w' | 'b';
  opponent?: Player | Bot;
  turn?: 'w' | 'b';
  hints: Hint[];
  highlights: Highlight[];
  animatingPieceIds: number[];
  playingAudios: AudioType[];
  promotionData?: PromotionData;
  perspective: 'w' | 'b';
  isDrawBeingOffered?: boolean;
  ratingSystem?: RatingSystem;
  winner?: string;
  result?: GameResult;
  wasDrawDeclined?: boolean;
}

export interface AnonymousPlayer {
  displayName: string;
}

export type Player = UserData | AnonymousPlayer;

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
  status: 'win' | 'lose' | 'draw' | 'aborted';
  difference: number;
}

export interface Bot {
  level: string;
  displayName: string;
  photoURL: string;
}

export enum ModalContentType {
  RESULT,
  CHOOSE_BOT_LEVEL,
  FINDING_MATCH,
}

export interface ModalContentState {
  content: ModalContentType | null;
  backgroundColor: 'light' | 'dark';
}

export interface BeforeMoveData {
  move: Move;
  defaultAudios: AudioType[];
  extraAnimatingPieceIds?: number[];
}

export interface BeforeMoveReturnData {
  currentPiece: Piece;
  playingAudios: AudioType[];
}

export interface AfterMoveData {
  currentPiece: Piece;
  pieces: Piece[];
  playingAudios: AudioType[];
  move: Move;
}

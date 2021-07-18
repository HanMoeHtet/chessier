import { Chess, Move } from 'chess.ts';
import { GameDataStatus, Piece, Position, RatingSystem } from 'src/types';
import { BOARD_SIZE } from 'src/utils/constants';

let game: Chess | null = null;
const pieceIds = new Map<number, number>();

export const createNewGame = () => {
  game = new Chess();
  return game;
};

export const setUpNewGame = (player1: string, player2: string) => {
  const isPlayer1White = Math.floor(Math.random() * 2) === 0;
  return {
    white: isPlayer1White ? player1 : player2,
    black: isPlayer1White ? player2 : player1,
    history: [],
    status: GameDataStatus.START,
  };
};

export const getTurn = () => {
  return (game || createNewGame()).turn();
};

export const getMoves = (square: string) => {
  if (!game) game = createNewGame();
  return game.moves({ square, verbose: true });
};

export const makeMove = (move: Move) => {
  if (!game) game = createNewGame();
  return game.move(move) !== null;
};

export const isInCheck = () => {
  return Boolean(game?.inCheck());
};

export const isInCheckMate = () => {
  return Boolean(game?.inCheckmate());
};

export const isInDraw = () => {
  return Boolean(game?.inDraw());
};

export const getFen = () => {
  return (game || createNewGame()).fen();
};

export const getSquareName = ({ row, col }: Position) => {
  const letter = String.fromCharCode('a'.charCodeAt(0) + col);
  const number = BOARD_SIZE - row;
  return letter + number;
};

export const getSquarePosition = (name: string): Position => {
  const letter = name[0];
  const number = Number(name[1]);
  if (!letter) throw Error('Invalid square name');
  return {
    row: BOARD_SIZE - number,
    col: letter.charCodeAt(0) - 'a'.charCodeAt(0),
  };
};

export const getPieceIdFromInitialPosition = (pos: Position): number => {
  if (pieceIds.size === 0) {
    getInitialPieces();
  }
  const id = pieceIds.get(pos.row * 8 + pos.col);
  if (id === undefined) {
    throw Error('Invalid piece id.');
  }
  return id;
};

export const getInitialPieces = (): Piece[] => {
  const pieces: Piece[] = [];
  let id = 0;
  createNewGame()
    .board()
    .forEach((rank, row) => {
      rank.forEach((square, col) => {
        if (square) {
          pieceIds.set(row * 8 + col, id);
          pieces.push({
            ...square,
            id,
            pos: { row, col },
          });
          id++;
        }
      });
    });
  return pieces;
};

export const undo = () => {
  game?.undo();
};

// interface PositionOnBoard {
//   x: number;
//   y: number;
// }

// /**
//  * @deprecated
//  * FIXME: Avoid using SQUARE_WIDTH
//  */
// export const getSquarePosOnBoard = (
//   boardPos: PositionOnBoard,
//   mousePos: PositionOnBoard
// ): Position => {
//   let row, col;
//   col = Math.floor((mousePos.x - boardPos.x) / SQUARE_WIDTH);
//   row = Math.floor((mousePos.y - boardPos.y) / SQUARE_WIDTH);

//   return { row, col };
// };

export const calculateRatingSystem = (
  playerRating: number,
  opponentRating: number
): RatingSystem => {
  let win = 0,
    draw = 0,
    loss = 0;

  if (opponentRating > playerRating) {
    win = 50 + opponentRating - playerRating;
    draw = opponentRating - playerRating;
    loss = 0;
  } else if (opponentRating === playerRating) {
    win = 50;
    draw = 10;
    loss = -10;
  } else {
    win = 20 + playerRating - opponentRating;
    draw = 0;
    loss = -20;
  }

  return {
    win,
    draw,
    loss,
  };
};

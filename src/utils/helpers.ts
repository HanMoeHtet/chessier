import game from 'src/services/game.service';
import { Piece, Position } from 'src/types';
import { BOARD_SIZE, SQUARE_WIDTH } from './constants';

type GenerateSquareNameFunction = (param: Position) => string;

export const generateSquareName: GenerateSquareNameFunction = ({
  row,
  col,
}) => {
  const letter = String.fromCharCode('a'.charCodeAt(0) + col);
  const number = BOARD_SIZE - row;
  return letter + number;
};

export const getSquarePosition = (name: string): Position => {
  const letter = name[0];
  const number = Number(name[1]);
  return {
    row: BOARD_SIZE - number,
    col: letter.charCodeAt(0) - 'a'.charCodeAt(0),
  };
};

const rookIds = new Map<number, number>();

export const getRookId = (pos: Position): number => {
  const id = rookIds.get(pos.row * 8 + pos.col);
  if (id === undefined) {
    console.log(pos, rookIds);
    throw Error();
  }
  return id;
};

export const getInitialPieces = (): Piece[] => {
  const pieces: Piece[] = [];
  let id = 0;
  game.board().forEach((rank, row) => {
    rank.forEach((square, col) => {
      if (square) {
        if (square.type === 'r') {
          rookIds.set(row * 8 + col, id);
        }
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

interface PositionOnBoard {
  x: number;
  y: number;
}

export const getSquarePosOnBoard = (
  boardPos: PositionOnBoard,
  mousePos: PositionOnBoard
): Position => {
  let row, col;
  col = Math.floor((mousePos.x - boardPos.x) / SQUARE_WIDTH);
  row = Math.floor((mousePos.y - boardPos.y) / SQUARE_WIDTH);

  return { row, col };
};

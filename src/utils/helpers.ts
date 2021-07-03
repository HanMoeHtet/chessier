import { Chess, Piece as BasePiece } from 'chess.ts';
import game from 'src/services/game.service';
import { Piece, Position } from 'src/types';
import { BOARD_SIZE } from './constants';

type GenerateSquareNameFunction = (param: Position) => string;

export const generateSquareName: GenerateSquareNameFunction = ({
  row,
  col,
}) => {
  const letter = String.fromCharCode('a'.charCodeAt(0) + col);
  const number = BOARD_SIZE - row;
  return letter + number;
};

export const getSquarePosition = (name: string) => {
  const letter = name[0];
  const number = Number(name[1]);
  return [BOARD_SIZE - number, letter.charCodeAt(0) - 'a'.charCodeAt(0)];
};

export const getInitialPieces = (): Piece[] => {
  const pieces: Piece[] = [];
  let id = 0;
  game.board().forEach((rank, row) => {
    rank.forEach((square, col) => {
      if (square) {
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

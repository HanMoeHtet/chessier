import { Piece as PiceType } from 'chess.ts';
import React from 'react';
import { SQUARE_WIDTH } from 'src/utils/constants';
import Piece from 'src/components/Piece';
import styles from './index.module.css';

interface Props {
  id: number;
  pos: {
    col: number;
    row: number;
  };
  piece?: PiceType;
}

const Square: React.FC<Props> = ({ pos, piece }) => {
  return (
    <div
      className={`${styles.square}`}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px)`,
      }}
    >
      {piece && <Piece {...piece} />}
    </div>
  );
};

export default Square;

import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import { BOARD_SIZE } from 'src/utils/constants';
import Square from '../Square';
import styles from './index.module.css';

const Board: React.FC = () => {
  const board = useAppSelector((state) => state.gameStore.board);

  const renderSquares = (): JSX.Element[][] => {
    return board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        const id = colIndex * BOARD_SIZE + rowIndex;
        const pieceProp = square ? { piece: square } : {};
        return (
          <Square
            pos={{ row: rowIndex, col: colIndex }}
            key={id}
            id={id}
            {...pieceProp}
          />
        );
      });
    });
  };

  return (
    <div className={`${styles.board} w-full h-full bg-cover`}>
      {renderSquares()}
    </div>
  );
};

export default Board;

import React, { useRef } from 'react';
import { cancel, focus } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Piece as PieceType } from 'src/types';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

interface Props extends PieceType {}

/**
 * FIXME: Play animation only when intended
 */
const Piece: React.FC<Props> = ({ type, color, id, pos }) => {
  const elRef = useRef<HTMLDivElement>(null);

  const focusedPieceId = useAppSelector(
    (state) => state.gameStore.focusedPieceId
  );
  const perspective = useAppSelector((state) => state.gameStore.perspective);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (focusedPieceId === id) {
      dispatch(cancel());
    } else {
      dispatch(focus(id, pos));
    }
  };

  const isLightSquare = pos.col % 2 === pos.row % 2;

  return (
    <div
      ref={elRef}
      className={`${styles.piece} ${styles[color + type]}
        ${isLightSquare ? styles.light : styles.dark}
        ${focusedPieceId === id ? styles.focused : ''}`}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px) ${perspective === 'w' ? '' : 'rotateZ(180deg)'}`,
      }}
      onClick={handleClick}
    ></div>
  );
};

export default Piece;

import React from 'react';
import { makeMove } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { Hint as HintType } from 'src/types';
import { getSquarePosition } from 'src/utils/helpers';
import styles from './index.module.css';

interface Props extends HintType {}

const Hint: React.FC<Props> = ({ move, pieceIds }) => {
  const pos = getSquarePosition(move.to);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(makeMove(pieceIds, move));
  };

  return (
    <div
      className={styles.hint}
      style={{
        transform: `translate(${pos.col * 100}%, ${pos.row * 100}%)`,
      }}
      onClick={handleClick}
    >
      <div
        className={`${move.flags.includes('c') ? styles.capture : styles.move}`}
      ></div>
    </div>
  );
};

export default Hint;

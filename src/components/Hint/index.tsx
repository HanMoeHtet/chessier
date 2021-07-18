import React from 'react';
import { makeMove, showPromotionModalBox } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { Hint as HintType } from 'src/types';
import { getSquarePosition } from 'src/services/game.service';
import styles from './index.module.css';

interface Props extends HintType {}

const Hint: React.FC<Props> = ({ move }) => {
  const pos = getSquarePosition(move.to);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (move.flags.includes('p')) dispatch(showPromotionModalBox(move));
    else dispatch(makeMove(move));
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

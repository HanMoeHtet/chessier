import { Move } from 'chess.ts';
import React from 'react';
import { useAudioPlayer } from 'src/composables/useAudioPlayer';
import {
  capture,
  enPassant,
  kingSideCastle,
  move as gameMove,
  queenSideCastle,
  showPromotionModalBox,
} from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

interface Props {
  pos: { row: number; col: number };
  move: Move;
}

const Hint: React.FC<Props> = ({ pos, move }) => {
  const player = useAudioPlayer();

  const dispatch = useAppDispatch();

  /**
   * TODO: Modify move process (animation and stuff)
   */
  const handleClick = () => {
    switch (move.flags) {
      case 'e':
        player.capture();
        dispatch(enPassant(pos, move));
        break;
      case 'c':
        player.capture();
        dispatch(capture(pos, move));
        break;
      case 'cp':
        player.capture();
        dispatch(showPromotionModalBox(pos, move));
        break;
      case 'np':
        dispatch(showPromotionModalBox(pos, move));
        break;
      case 'k':
        player.castle();
        dispatch(kingSideCastle(pos, move));
        break;
      case 'q':
        player.castle();
        dispatch(queenSideCastle(pos, move));
        break;
      default:
        player.moveSelf();
        dispatch(gameMove(pos, move));
        break;
    }
  };

  return (
    <div
      className={styles.hint}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px)`,
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

import { Move } from 'chess.ts';
import React from 'react';
import game from 'src/services/game.service';
import {
  capture,
  enPassant,
  kingSideCastle,
  move as gameMove,
  queenSideCastle,
  setAnimatingPieceIds,
  setPlayingAudios,
  showPromotionModalBox,
} from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

interface Props {
  pos: { row: number; col: number };
  move: Move;
  pieceIds: number[];
}

const Hint: React.FC<Props> = ({ pos, move, pieceIds }) => {
  const dispatch = useAppDispatch();

  /**
   * TODO: Modify move process (animation and stuff)
   */
  const handleClick = () => {
    game.move(move);
    dispatch(setAnimatingPieceIds(pieceIds));
    switch (move.flags) {
      case 'e':
        dispatch(
          setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['capture'])
        );
        dispatch(enPassant(pos, move));
        break;
      case 'c':
        dispatch(
          setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['capture'])
        );
        dispatch(capture(pos, move));
        break;
      case 'cp':
        dispatch(showPromotionModalBox(pos, move));
        break;
      case 'np':
        dispatch(showPromotionModalBox(pos, move));
        break;
      case 'k':
        dispatch(setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['castle']));
        dispatch(kingSideCastle(pos, move));
        break;
      case 'q':
        dispatch(setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['castle']));
        dispatch(queenSideCastle(pos, move));
        break;
      default:
        dispatch(
          setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['moveSelf'])
        );
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

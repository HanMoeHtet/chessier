import {
  cancel,
  focus,
  setAnimatingPieceIds,
} from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Piece as PieceType } from 'src/types';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

interface Props extends PieceType {}

const Piece: React.FC<Props> = ({ type, color, id, pos }) => {
  const { focusedPieceId, animatingPieceIds, perspective } = useAppSelector(
    (state) => state.gameStore
  );

  const dispatch = useAppDispatch();

  const onPieceClicked: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (focusedPieceId === id) {
      dispatch(cancel());
    } else {
      dispatch(focus(id, pos));
    }
  };

  const handleTransitionEnd = () => {
    dispatch(setAnimatingPieceIds([]));
  };

  return (
    <div
      className={`${styles.piece} ${styles[color + type]} ${
        animatingPieceIds.includes(id) ? styles.animate : ''
      }`}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px) ${perspective === 'w' ? '' : 'rotateZ(180deg)'}`,
      }}
      onClick={onPieceClicked}
      onTransitionEnd={handleTransitionEnd}
    ></div>
  );
};

export default Piece;

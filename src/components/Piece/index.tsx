import { cancel, focus } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Piece as PieceType } from 'src/types';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

interface Props extends PieceType {
  setRef: (current: HTMLDivElement | null) => void;
}

/**
 * FIXME: Play animation only when intended
 */
const Piece: React.FC<Props> = ({ type, color, id, pos, setRef }) => {
  const focusedPieceId = useAppSelector(
    (state) => state.gameStore.focusedPieceId
  );
  const perspective = useAppSelector((state) => state.gameStore.perspective);

  const dispatch = useAppDispatch();

  const onPieceClicked: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (focusedPieceId === id) {
      dispatch(cancel());
    } else {
      dispatch(focus(id, pos));
    }
  };

  return (
    <div
      ref={setRef}
      className={`${styles.piece} ${styles[color + type]}`}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px) ${perspective === 'w' ? '' : 'rotateZ(180deg)'}`,
      }}
      onClick={onPieceClicked}
    ></div>
  );
};

export default Piece;

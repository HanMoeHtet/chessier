import { focus, setAnimatingPieceIds } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Piece as PieceType } from 'src/types';
import styles from './index.module.css';

interface Props extends PieceType {}

const Piece: React.FC<Props> = ({ type, color, id, pos }) => {
  const { animatingPieceIds, perspective } = useAppSelector(
    (state) => state.gameStore
  );

  const dispatch = useAppDispatch();

  const onPieceClicked: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dispatch(focus(id));
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
        transform: `translate(${pos.col * 100}%, ${pos.row * 100}%) ${
          perspective === 'w' ? '' : 'rotateZ(180deg)'
        }`,
      }}
      onClick={onPieceClicked}
      onTransitionEnd={handleTransitionEnd}
    ></div>
  );
};

export default Piece;

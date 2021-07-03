import React from 'react';
import styles from './index.module.css';
import pieceStyles from '../Piece/index.module.css';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { SQUARE_WIDTH } from 'src/utils/constants';
import { promote, setPromotionData } from 'src/store/gameStore/gameSlice';
import { PieceSymbol } from 'chess.ts';

const PromotionModalBox: React.FC = () => {
  const turn = useAppSelector((state) => state.gameStore.turn);
  const data = useAppSelector((state) => state.gameStore.promotionData);

  const dispatch = useAppDispatch();

  if (!data) return null;

  const { pos, move } = data;

  const onPieceClicked = (pieceName: PieceSymbol) => {
    dispatch(promote(pos, move, pieceName));
  };

  const onCloseButtonClicked = () => {
    dispatch(setPromotionData(null));
  };

  return (
    <div
      className={styles.promotionModalBox}
      style={{ transform: `translateX(${pos.col * SQUARE_WIDTH}px)` }}
    >
      {['q', 'n', 'r', 'b'].map((pieceName) => (
        <div
          key={pieceName}
          className={`${styles.piece} ${pieceStyles[turn + pieceName]}`}
          onClick={() => onPieceClicked(pieceName as PieceSymbol)}
        ></div>
      ))}
      <div className={styles.modalCloseBtn} onClick={onCloseButtonClicked}>
        &times;
      </div>
    </div>
  );
};

export default PromotionModalBox;

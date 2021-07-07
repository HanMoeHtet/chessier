import React from 'react';
import styles from './index.module.css';
import pieceStyles from '../Piece/index.module.css';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { SQUARE_WIDTH } from 'src/utils/constants';
import {
  promote,
  setPlayingAudios,
  setPromotionData,
} from 'src/store/gameStore/gameSlice';
import { PieceSymbol } from 'chess.ts';
import game from 'src/services/game.service';
import { getSquarePosition } from 'src/utils/helpers';

const PromotionModalBox: React.FC = () => {
  const turn = useAppSelector((state) => state.gameStore.turn);
  const data = useAppSelector((state) => state.gameStore.promotionData);
  const perspective = useAppSelector((state) => state.gameStore.perspective);

  const dispatch = useAppDispatch();

  if (!data) return null;

  const { pieceIds, move } = data;
  const pos = getSquarePosition(move.to);

  const onPieceClicked = (pieceName: PieceSymbol) => {
    game.move(move);
    dispatch(setPlayingAudios(game.inCheck() ? ['moveCheck'] : ['promote']));
    dispatch(promote(pieceIds, move, pieceName));
  };

  const onCloseButtonClicked = () => {
    dispatch(setPromotionData(null));
  };

  return (
    <div
      className={`${styles.promotionModalBox} ${
        turn === 'w' ? '' : styles.bottom
      }`}
      style={{
        transform: `translateX(${pos.col * SQUARE_WIDTH}px) ${
          perspective === 'w' ? '' : 'rotateZ(180deg)'
        }`,
      }}
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

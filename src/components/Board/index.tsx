import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import { getSquarePosition } from 'src/utils/helpers';
import Hint from '../Hint';
import Piece from 'src/components/Piece';
import styles from './index.module.css';
import PromotionModalBox from '../PromotionModalBox';

const Board: React.FC = () => {
  const pieces = useAppSelector((state) => state.gameStore.pieces);
  const hints = useAppSelector((state) => state.gameStore.hints);
  const perspective = useAppSelector((state) => state.gameStore.perspective);

  const renderPieces = (): JSX.Element[] => {
    return pieces.map((piece) => {
      return <Piece key={piece.id} {...piece} />;
    });
  };

  const renderHints = (): JSX.Element[] => {
    return hints.map((hint) => {
      const [row, col] = getSquarePosition(hint.to);
      return <Hint key={hint.san} move={hint} pos={{ row, col }} />;
    });
  };

  return (
    <div
      className={`${styles.board} w-full h-full bg-cover`}
      style={perspective === 'w' ? {} : { transform: `rotateZ(180deg)` }}
    >
      {renderPieces()}
      {renderHints()}
      <PromotionModalBox />
    </div>
  );
};

export default Board;

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getSquareName, getSquarePosOnBoard } from 'src/services/game.service';
import Hint from '../Hint';
import Piece from 'src/components/Piece';
import styles from './index.module.css';
import PromotionModalBox from '../PromotionModalBox';
import { back } from 'src/store/historyStore/historySlice';
import Highlight from '../Highlight';
import { mark } from 'src/store/gameStore/gameSlice';

const Board: React.FC = () => {
  const { pieces, perspective, highlights, hints } = useAppSelector(
    (state) => state.gameStore
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'z' && e.ctrlKey) {
        dispatch(back());
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const renderPieces = (): JSX.Element[] => {
    return pieces.map((piece) => {
      return <Piece key={piece.id} {...piece} />;
    });
  };

  const renderHints = (): JSX.Element[] => {
    return hints.map((hint) => {
      return <Hint key={hint.move.san} {...hint} />;
    });
  };

  const renderHighlights = () => {
    return highlights.map((highlight) => {
      const key = getSquareName(highlight.pos) + highlight.color;
      return <Highlight key={key} {...highlight} />;
    });
  };

  const onBoardRightClicked: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const squarePos = getSquarePosOnBoard({
      board: e.currentTarget,
      mousePos: { x: clientX, y: clientY },
      flipped: perspective !== 'w',
    });
    dispatch(mark('red', squarePos));
  };

  return (
    <div
      className={`${styles.board} w-full h-full`}
      style={perspective === 'w' ? {} : { transform: `rotateZ(180deg)` }}
      onContextMenu={onBoardRightClicked}
    >
      {renderPieces()}
      {renderHints()}
      {renderHighlights()}
      <PromotionModalBox />
    </div>
  );
};

export default Board;

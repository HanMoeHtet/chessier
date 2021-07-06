import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  generateSquareName,
  getSquarePosition,
  getSquarePosOnBoard,
} from 'src/utils/helpers';
import Hint from '../Hint';
import Piece from 'src/components/Piece';
import styles from './index.module.css';
import PromotionModalBox from '../PromotionModalBox';
import { back } from 'src/store/historyStore/historySlice';
import Highlight from '../Highlight';
import { mark, move } from 'src/store/gameStore/gameSlice';

const Board: React.FC = () => {
  const pieceRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  const { pieces, perspective, highlights, hints, focusedPieceId } =
    useAppSelector((state) => state.gameStore);

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
      return (
        <Piece
          setRef={(el) => {
            pieceRefs.current.set(piece.id, el);
          }}
          key={piece.id}
          {...piece}
        />
      );
    });
  };

  const renderHints = (): JSX.Element[] => {
    return hints.map((hint) => {
      const [row, col] = getSquarePosition(hint.to);
      const els = [pieceRefs.current.get(focusedPieceId!)];
      if (['k', 'q'].includes(hint.flags)) {
        // TODO: Add rook animation
      }
      return <Hint key={hint.san} move={hint} pos={{ row, col }} els={els} />;
    });
  };

  const renderHighlights = () => {
    return highlights.map((highlight) => {
      const key = generateSquareName(highlight.pos) + highlight.color;
      return <Highlight key={key} {...highlight} />;
    });
  };

  const onBoardRightClicked: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const { x, y } = e.currentTarget.getBoundingClientRect();
    const boardPos = { x, y };

    const { clientX, clientY } = e;
    const mousePos = { x: clientX, y: clientY };

    const squarePos = getSquarePosOnBoard(boardPos, mousePos);
    dispatch(mark('red', squarePos));
  };

  return (
    <div
      className={`${styles.board} w-full h-full bg-cover`}
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

import React from 'react';
import { Highlight as HighlightType } from 'src/types';
import { SQUARE_WIDTH } from 'src/utils/constants';
import styles from './index.module.css';

const Highlight: React.FC<HighlightType> = ({ pos, color }) => {
  const isLightSquare = pos.col % 2 === pos.row % 2;

  return (
    <div
      className={`${styles.highlight} ${
        isLightSquare ? styles.light : styles.dark
      } ${styles[color]}`}
      style={{
        transform: `translate(${pos.col * SQUARE_WIDTH}px, ${
          pos.row * SQUARE_WIDTH
        }px)`,
      }}
    ></div>
  );
};

export default Highlight;

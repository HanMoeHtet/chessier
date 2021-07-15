import React from 'react';
import { Highlight as HighlightType } from 'src/types';
import styles from './index.module.css';

const Highlight: React.FC<HighlightType> = ({ pos, color }) => {
  const isLightSquare = pos.col % 2 === pos.row % 2;

  return (
    <div
      className={`${styles.highlight} ${
        isLightSquare ? styles.light : styles.dark
      } ${styles[color]}`}
      style={{
        transform: `translate(${pos.col * 100}%, ${pos.row * 100}%)`,
      }}
    ></div>
  );
};

export default Highlight;

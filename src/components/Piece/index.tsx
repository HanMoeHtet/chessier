import { Piece as PieceType } from 'chess.ts';
import React from 'react';
import styles from './index.module.css';

const Piece: React.FC<PieceType> = ({ type, color }) => {
  return <div className={`${styles.piece} ${styles[color + type]}`}></div>;
};

export default Piece;

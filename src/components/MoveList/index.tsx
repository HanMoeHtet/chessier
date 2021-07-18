import React, { useEffect, useRef } from 'react';
import { goto } from 'src/store/historyStore/historySlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import styles from './index.module.css';

const MoveList: React.FC = () => {
  const { history, currentIndex } = useAppSelector(
    (state) => state.historyStore
  );

  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleClick = (index: number) => {
    dispatch(goto(index));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history.length]);

  const render = () => {
    const els = [];
    for (let i = 1, n = 1; i < history.length; i += 2, n++) {
      let row = (
        <tr key={n}>
          {history[i]?.move && (
            <>
              <td className={styles.number}>{n}.</td>
              <td
                className={`${styles.move} ${
                  currentIndex === i ? styles.focused : ''
                }`}
                onClick={() => handleClick(i)}
              >
                {history[i]?.move?.san}
              </td>
            </>
          )}
          {history[i + 1]?.move?.san && (
            <td
              className={`${styles.move} ${
                currentIndex === i + 1 ? styles.focused : ''
              }`}
              onClick={() => handleClick(i + 1)}
            >
              {history[i + 1]?.move?.san}
            </td>
          )}
        </tr>
      );
      els.push(row);
    }

    return els;
  };

  return (
    <>
      <h3 className="text-center text-gray-200 text-xl py-4 hidden sm:block">
        Moves
      </h3>
      <div ref={ref} className={styles.container}>
        <table className={styles.moveList}>
          <tbody>{render()}</tbody>
        </table>
      </div>
    </>
  );
};

export default MoveList;

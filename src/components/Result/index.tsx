import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import NewGameButton from '../NewGameButton';
import PlayWithComputerButton from '../PlayWithComputerButton';
import styles from './index.module.css';

const Result: React.FC = () => {
  const gameResult = useAppSelector((state) => state.gameStore.result!);
  const { playerColor, id } = useAppSelector((state) => state.gameStore);
  const dispatch = useAppDispatch();

  const { status, newRating, oldRating, difference } = gameResult;
  let result;
  let diffColorClass;
  switch (status) {
    case 'draw':
      result = 'Draw';
      diffColorClass = 'text-gray-500';
      break;
    case 'win':
      result = `${playerColor === 'w' ? 'White' : 'Black'} won`;
      diffColorClass = 'text-green-400';
      break;
    case 'lose':
      result = `${playerColor === 'w' ? 'Black' : 'White'} won`;
      diffColorClass = 'text-red-400';
      break;
    case 'aborted':
      result = `Game aborted`;
      break;
    default:
      throw Error('Unknown result status!');
  }

  return (
    <div
      className={`justify-evenly bg-gray-100 p-5 flex flex-col rounded-lg ${styles.content}`}
    >
      <h3 className="text-gray-500 text-3xl text-center mb-3">{result}</h3>
      {id !== 'bot' && (
        <p className="text-2xl text-center mb-3">
          <span className="text-gray-700 font-bold">{newRating}</span>
          &nbsp;&nbsp;&nbsp;(&nbsp;
          <span className="text-gray-400 font-bold">{oldRating}</span>
          &nbsp;
          <span className={`${diffColorClass} font-bold`}>
            {difference >= 0 ? '+' : '-'}
          </span>
          &nbsp;
          <span className={`${diffColorClass} font-bold`}>
            {Math.abs(difference)}
          </span>
          &nbsp;)
        </p>
      )}
      <div className="flex justify-center flex-col items-center">
        <NewGameButton />
        <PlayWithComputerButton />
        <button
          onClick={() => {
            dispatch(setModalContent(null));
          }}
          className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Result;

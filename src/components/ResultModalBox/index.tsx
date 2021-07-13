import React, { useEffect } from 'react';
import useModal from 'src/composables/useModal';
import { useAppSelector } from 'src/store/hooks';

interface Props {
  onCancelled: () => void;
}

const ResultModalBox: React.FC<Props> = ({ onCancelled }) => {
  const gameResult = useAppSelector((state) => state.gameStore.result!);
  const { player, id } = useAppSelector((state) => state.gameStore);

  const { status, newRating, oldRating, difference } = gameResult;
  let result;
  let diffColorClass;
  switch (status) {
    case 'draw':
      result = 'Draw';
      diffColorClass = 'text-gray-500';
      break;
    case 'win':
      result = `${player === 'w' ? 'White' : 'Black'} won`;
      diffColorClass = 'text-green-400';
      break;
    case 'lose':
      result = `${player === 'w' ? 'Black' : 'White'} won`;
      diffColorClass = 'text-red-400';
      break;
    default:
      throw Error('Unknown result status!');
  }

  return (
    <div
      className="justify-evenly w-full h-full bg-gray-100 p-5 flex flex-col rounded-lg"
      style={{ width: 300, height: 400 }}
    >
      <h3 className="text-gray-500 text-3xl text-center">{result}</h3>
      {id !== 'bot' && (
        <p className="text-2xl text-center">
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
        <button
          onClick={() => {}}
          className="mb-4 w-48 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-500 rounded"
        >
          New game
        </button>
        <button className="mb-4 w-48 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
          Play with computer
        </button>
        <button
          onClick={onCancelled}
          className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResultModalBox;

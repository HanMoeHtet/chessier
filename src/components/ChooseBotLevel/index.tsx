import React from 'react';
import { useHistory } from 'react-router-dom';
import { startWithBot } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';

const ChooseBotLevel: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const playWithBot = async (level: string) => {
    await dispatch(startWithBot(level));
    dispatch(setModalContent(null));
    history.push('/play/computer');
  };

  return (
    <div
      className="w-full h-full bg-gray-700 p-5 flex flex-col rounded-lg justify-evenly relative"
      style={{ width: 400, height: 300 }}
    >
      <div
        onClick={() => dispatch(setModalContent(null))}
        className="absolute top-0 right-0 text-4xl text-gray-400 hover:text-gray-500 cursor-pointer mr-4 mt-2"
      >
        &times;
      </div>
      <button
        onClick={() => playWithBot('easy')}
        className="mx-auto w-48 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-500 rounded"
      >
        Easy
      </button>
      <button
        onClick={() => playWithBot('medium')}
        className="mx-auto w-48 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-500 rounded"
      >
        Medium
      </button>
      <button
        onClick={() => playWithBot('hard')}
        className="mx-auto w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        Hard
      </button>
    </div>
  );
};

export default ChooseBotLevel;

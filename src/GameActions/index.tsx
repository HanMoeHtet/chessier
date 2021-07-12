import React from 'react';
import {
  showDrawOfferSentMessage,
  showConfirmResignation,
} from 'src/services/sweet-alert-2.service';
import { useAppDispatch } from 'src/store/hooks';
import {
  resign as resignGame,
  offerDraw as offerDrawGame,
} from 'src/store/gameStore/gameSlice';

const GameActions: React.FC = () => {
  const dispatch = useAppDispatch();

  const offerDraw = async () => {
    await dispatch(offerDrawGame());
    showDrawOfferSentMessage();
  };

  const resign = async () => {
    const isConfirmed = await showConfirmResignation();
    if (isConfirmed) {
      dispatch(resignGame());
    }
  };

  return (
    <div>
      <div className="p-10 flex items-center h-full">
        <div className="flex w-full justify-center items-center flex-col">
          <button
            onClick={offerDraw}
            className="mb-4 w-36 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
          >
            Offer a draw
          </button>
          <button
            onClick={resign}
            className="w-36 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Resign
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameActions;

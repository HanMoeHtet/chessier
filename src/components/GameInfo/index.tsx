import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { resign as resignGame, draw } from 'src/store/gameStore/gameSlice';
import PlayersInfo from '../PlayersInfo';
import RatingSystem from '../RatingSystem';
import {
  showConfirmResignation,
  showDrawOfferMessage,
} from 'src/services/sweet-alert-2.service';

const GameInfo: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const offerDraw = async () => {
    const isConfirmed = await showDrawOfferMessage({
      player: 'Anonymous Player',
    });
    if (isConfirmed) {
      dispatch(draw());
    }
  };

  const resign = async () => {
    const isConfirmed = await showConfirmResignation();
    if (isConfirmed) {
      dispatch(resignGame());
    }
  };

  return (
    <div className="flex flex-col justify-evenly h-full">
      {/* <PlayersInfo /> */}
      {/* <RatingSystem /> */}
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
    </div>
  );
};

export default GameInfo;

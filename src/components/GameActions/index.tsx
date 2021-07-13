import React from 'react';
import {
  showDrawOfferSentMessage,
  showConfirmResignation,
} from 'src/services/sweet-alert-2.service';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  resign as resignGame,
  offerDraw as offerDrawGame,
  abort as abortGame,
} from 'src/store/gameStore/gameSlice';
import { useHistory } from 'react-router-dom';
import NewGameButton from '../NewGameButton';
import PlayWithComputerButton from '../PlayWithComputerButton';

const GameActions: React.FC = () => {
  const { id, result } = useAppSelector((state) => state.gameStore);

  const dispatch = useAppDispatch();

  const history = useHistory();

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

  const exit = () => {
    history.push('/home');
  };

  const abort = () => {
    dispatch(abortGame());
  };

  const renderActionButtons = () => {
    if (result) {
      return (
        <>
          <NewGameButton />
          <PlayWithComputerButton />
          <button
            onClick={exit}
            className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Exit
          </button>
        </>
      );
    }
    if (id === 'bot') {
      return (
        <>
          <button
            onClick={abort}
            className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Abort
          </button>
        </>
      );
    }
    return (
      <>
        <button
          onClick={offerDraw}
          className="mb-4 w-48 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-500 rounded"
        >
          Offer a draw
        </button>
        <button
          onClick={resign}
          className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Resign
        </button>
      </>
    );
  };

  return (
    <div>
      <div className="p-10 flex items-center h-full">
        <div className="flex w-full justify-center items-center flex-col">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};

export default GameActions;

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { signOut } from 'src/services/firebase.service';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from 'src/components/utils/Logo';
import {
  findMatch,
  cancelSearch as cancel,
  startWithBot,
} from 'src/store/gameStore/gameSlice';
import SearchingIcon from 'src/components/utils/SearchinIcon';
import { GameDataStatus } from 'src/types';
import NewGameButton from 'src/components/NewGameButton';
import PlayWithComputerButton from 'src/components/PlayWithComputerButton';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.authStore.user!);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const cancelSearch = () => {
    dispatch(cancel());
    dispatch(setModalContent(null));
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-gray-700 relative">
        <div className="absolute top-0 left-0 p-5 text-white">
          <Link to="/" className="hover:text-gray-300">
            <Logo width="150px" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center content-center w-full h-full min-h-screen">
          <div className="mb-14">
            <div className="flex justify-center mb-4">
              <img
                className="border"
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}`
                }
                width="120px"
                height="120px"
                alt="Avatar"
              />
            </div>
            <p className="text-gray-200 text-4xl text-center mb-2">
              {user.displayName}
            </p>
            <p className="text-gray-300 text-xl text-center">({user.rating})</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-800 px-10 py-5 rounded-lg">
            <NewGameButton />
            <PlayWithComputerButton />
            <button
              onClick={signOut}
              className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

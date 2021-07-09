import React, { useEffect } from 'react';
import AudioPlayer from 'src/components/AudioPlayer';
import Board from 'src/components/Board';
import GameInfo from 'src/components/GameInfo';
import Settings from 'src/components/Settings';
import Logo from 'src/components/utils/Logo';
import { setPlayingAudios } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import styles from './index.module.css';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlayingAudios(['start']));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="bg-gray-700 col-span-2 border-r border-gray-600 flex flex-col">
        <header className="py-5 text-white flex justify-center cursor-pointer mb-10">
          <Logo width="150px" />
        </header>
        <GameInfo />
      </div>
      <div className="bg-gray-700 col-span-7">
        <div className="container flex justify-center items-center w-full h-full">
          <div className={`bg-red-100 ${styles.boardContainer}`}>
            <Board />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 col-span-3">
        <Settings />
      </div>
      <AudioPlayer />
    </div>
  );
};

export default Game;

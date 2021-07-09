import React, { useEffect } from 'react';
import AudioPlayer from 'src/components/AudioPlayer';
import Board from 'src/components/Board';
import Settings from 'src/components/Settings';
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
      <div className="bg-red-100 col-span-2">
        <header className="py-5">
          <h1 className="text-center text-4xl">Chessier</h1>
        </header>
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

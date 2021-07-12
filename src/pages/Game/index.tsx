import React, { useEffect } from 'react';
import AudioPlayer from 'src/components/AudioPlayer';
import Board from 'src/components/Board';
import GameInfo from 'src/components/GameInfo';
import ResultModalBox from 'src/components/ResultModalBox';
import Settings from 'src/components/Settings';
import Logo from 'src/components/utils/Logo';
import useModal from 'src/composables/useModal';
import { findBestMove, watch } from 'src/services/stockfish.service';
import { setPlayingAudios } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import styles from './index.module.css';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  const result = useAppSelector((state) => state.gameStore.result);

  const { ModalBox, setIsShowing } = useModal({
    initialIsShowing: false,
  });

  useEffect(() => {
    dispatch(setPlayingAudios(['start']));
  }, [dispatch]);

  useEffect(() => {
    if (result) {
      setIsShowing(true);
    }
  }, [result, setIsShowing]);

  useEffect(() => {
    watch((message) => {
      if (message.includes('bestmove')) {
        console.log(message.split(' ')[1].slice(2, 4));
      }
    });
    findBestMove();
  }, []);

  return null;

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="bg-gray-700 col-span-3 border-r px-3 border-gray-600 flex flex-col">
        <header className="py-5 text-white flex justify-center cursor-pointer mb-10">
          <Logo width="150px" />
        </header>
        <GameInfo />
      </div>
      <div className="bg-gray-700 col-span-6">
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
      <ModalBox>
        <ResultModalBox
          onCancelled={() => {
            setIsShowing(false);
          }}
        />
      </ModalBox>
    </div>
  );
};

export default Game;

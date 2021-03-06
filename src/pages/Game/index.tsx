import React, { useEffect } from 'react';
import AudioPlayer from 'src/components/AudioPlayer';
import Board from 'src/components/Board';
import GameInfo from 'src/components/GameInfo';
import Settings from 'src/components/Settings';
import Logo from 'src/components/utils/Logo';
import { findBestMove, watch } from 'src/services/stockfish.service';
import { makeBotMove } from 'src/store/gameStore/gameSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { PieceSymbol } from 'chess.ts';
import { ModalContentType } from 'src/types';
import MobileView from './MobileView';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import styles from './index.module.css';
import { getFen } from 'src/services/game.service';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  const { result, id, turn, opponent, playerColor } = useAppSelector(
    (state) => state.gameStore
  );

  useEffect(() => {
    if (result) {
      dispatch(setModalContent(ModalContentType.RESULT));
    }
  }, [result, dispatch]);

  useEffect(() => {
    if (id === 'bot') {
      const unsubscribe = watch((message) => {
        if (message.includes('bestmove')) {
          const _message = message.split(' ')[1];
          if (_message) {
            const from = _message.slice(0, 2);
            const to = _message.slice(2, 4);
            const promotion = _message.slice(4, 5) as PieceSymbol;
            const move = {
              to,
              from,
              promotion,
            };
            dispatch(makeBotMove(move));
          }
        }
      });
      return () => unsubscribe();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (
      !result &&
      id === 'bot' &&
      turn !== playerColor &&
      'level' in opponent!
    ) {
      let depth;
      switch (opponent.level) {
        case 'easy':
          depth = 1;
          break;
        case 'medium':
          depth = 5;
          break;
        case 'hard':
          depth = 10;
          break;
        default:
          throw Error('Invalid level');
      }
      findBestMove(getFen(), depth);
    }
  }, [id, turn, opponent, playerColor, result]);

  return (
    <>
      <AudioPlayer />
      {/* Mobile view */}
      <MobileView />

      {/* Desktop view */}
      <div className="hidden lg:grid grid-cols-12 min-h-screen">
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
      </div>
    </>
  );
};

export default Game;

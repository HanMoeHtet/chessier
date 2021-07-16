import React, { useState } from 'react';
import Board from 'src/components/Board';
import GameActions from 'src/components/GameActions';
import MoveList from 'src/components/MoveList';
import RatingSystem from 'src/components/RatingSystem';
import SettingButtons from 'src/components/SettingButtons';
import Divider from 'src/components/utils/Divider';
import Logo from 'src/components/utils/Logo';
import MenuIcon from 'src/components/utils/MenuIcon';
import { useAppSelector } from 'src/store/hooks';
import styles from './index.module.css';

const MobileView: React.FC = () => {
  const [isShowingDrawer, setIsShowingDrawer] = useState(false);

  const { player, perspective } = useAppSelector((state) => state.gameStore);
  const user = useAppSelector((state) => state.authStore.user!);
  const opponent = useAppSelector((state) => state.gameStore.opponent!);

  const white = player === 'w' ? user : opponent;
  const black = player === 'w' ? opponent : user;

  let top = black;
  let bottom = white;

  if (perspective === 'b') {
    [bottom, top] = [top, bottom];
  }

  return (
    <div className="flex flex-col lg:hidden min-h-screen bg-gray-700 relative overflow-x-hidden">
      <nav className="p-5 text-white flex items-center">
        <Logo width="125px" />
        <button
          type="button"
          className="ml-auto"
          onClick={() => {
            setIsShowingDrawer((old) => !old);
          }}
        >
          <MenuIcon width="20px" color="rgba(255, 255, 255, 0.8)" />
        </button>
      </nav>
      <RatingSystem />
      <a
        href="/home"
        target="_blank"
        className="flex items-center justify-center hover:bg-gray-800 text-white my-3"
      >
        <img
          className="border mr-3"
          src={
            top.photoURL ||
            `https://ui-avatars.com/api/?name=${top.displayName}`
          }
          width="30px"
          height="30px"
          alt={top.displayName}
        />
        <p className="mr-1">{top.displayName}</p>
        {'rating' in top && <p>({top.rating})</p>}
      </a>
      <hr className="w-full border-white" />
      <div className={`bg-red-100 mx-auto ${styles.boardContainer}`}>
        <Board />
      </div>
      <hr className="w-full border-white" />
      <a
        href="/home"
        target="_blank"
        className="flex items-center justify-center hover:bg-gray-800 text-white my-3"
      >
        <img
          className="border mr-3"
          src={
            bottom.photoURL ||
            `https://ui-avatars.com/api/?name=${bottom.displayName}`
          }
          width="30px"
          height="30px"
          alt={bottom.displayName}
        />
        <p className="mr-1">{bottom.displayName}</p>
        {'rating' in bottom && <p>({bottom.rating})</p>}
      </a>

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 bg-gray-800 h-full z-20 w-3/4 overflow-y-auto ${
          styles.drawer
        } ${isShowingDrawer ? styles.open : styles.close}`}
      >
        <button
          className="text-gray-200 text-4xl mx-5 my-2"
          onClick={() => setIsShowingDrawer(false)}
        >
          &times;
        </button>
        <MoveList />
        <Divider />
        <SettingButtons />
        <GameActions />
      </div>
    </div>
  );
};

export default MobileView;

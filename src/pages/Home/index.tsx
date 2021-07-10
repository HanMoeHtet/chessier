import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { signOut } from 'src/services/firebase.service';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from 'src/components/utils/Logo';
import { findMatch } from 'src/store/gameStore/gameSlice';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.authStore.user!);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const newGame = async () => {
    await dispatch(findMatch());
    history.push('play/online');
  };

  return (
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
          <p className="text-white text-4xl">{user.displayName}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-800 px-10 py-5 rounded-lg">
          <button
            onClick={newGame}
            className="mb-4 w-48 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-500 rounded"
          >
            New game
          </button>
          <button className="mb-4 w-48 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
            Play with computer
          </button>
          <button
            onClick={signOut}
            className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

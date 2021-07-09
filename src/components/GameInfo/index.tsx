import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';

const GameInfo: React.FC = () => {
  const history = useHistory();

  const user = useAppSelector((state) => state.authStore.user!);

  const resign = () => {
    history.push('/home');
  };

  return (
    <div className="flex flex-col justify-evenly h-full">
      <div className="text-white mb-5">
        <div>
          <p className="ml-4 mb-2 text-xs">Black</p>
          <a
            href="/home"
            target="_blank"
            className="flex items-center justify-center hover:bg-gray-800"
          >
            <img
              className="border mr-3"
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${user.displayName}`
              }
              width="30px"
              height="30px"
              alt={user.displayName}
            />
            <p className="mr-1">{user.displayName}</p>
            <p>({user.rating})</p>
          </a>
        </div>
        <p className="flex justify-center text-4xl my-3">VS</p>
        <div>
          <a
            href="/home"
            target="_blank"
            className="flex items-center justify-center hover:bg-gray-800"
          >
            <img
              className="border mr-3"
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${user.displayName}`
              }
              width="30px"
              height="30px"
              alt={user.displayName}
            />
            <p className="mr-1">{user.displayName}</p>
            <p>({user.rating})</p>
          </a>
          <p className="ml-4 mt-2 text-xs">White</p>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <p className="text-green-300 font-bold">
            <span className="mr-3">Win:</span>
            <span>+5</span>
          </p>
          <p className="text-gray-400 font-bold">
            <span className="mr-3">Draw:</span>
            <span>0</span>
          </p>
          <p className="text-red-500 font-bold">
            <span className="mr-3">Loss:</span>
            <span>-10</span>
          </p>
        </div>
      </div>
      <div>
        <div className="p-10 flex items-center h-full">
          <div className="flex items-center flex-col">
            <button className="mb-4 w-36 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
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

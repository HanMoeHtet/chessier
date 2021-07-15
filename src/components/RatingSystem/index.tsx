import React from 'react';
import { useAppSelector } from 'src/store/hooks';

const RatingSystem: React.FC = () => {
  let { ratingSystem } = useAppSelector((state) => state.gameStore);

  if (!ratingSystem) {
    // return null;
    ratingSystem = {
      draw: 0,
      win: 0,
      loss: 0,
    };
  }

  const { win, loss, draw } = ratingSystem;

  return (
    <div className="">
      <div className="flex lg:flex-col items-center justify-evenly lg:justify-center">
        <p className="text-green-300 font-bold">
          <span className="mr-3">Win:</span>
          <span>{win > 0 ? `+${win}` : win}</span>
        </p>
        <p className="text-gray-400 font-bold">
          <span className="mr-3">Draw:</span>
          <span>{draw > 0 ? `${draw}` : draw}</span>
        </p>
        <p className="text-red-500 font-bold">
          <span className="mr-3">Loss:</span>
          <span>{loss}</span>
        </p>
      </div>
    </div>
  );
};

export default RatingSystem;

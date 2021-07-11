import React from 'react';
import { useAppSelector } from 'src/store/hooks';

const RatingSystem: React.FC = () => {
  const { win, draw, loss } = useAppSelector(
    (state) => state.gameStore.ratingSystem!
  );

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
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

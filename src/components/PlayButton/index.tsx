import React from 'react';

const PlayButton: React.FC = () => {
  const handleClick = () => {};
  return (
    <button
      onClick={handleClick}
      className="w-32 text-lg text-gray-600 bg-gray-100 hover:bg-gray-300 font-bold py-2 border-b-4 border-gray-300 hover:border-gray-400 rounded"
    >
      Play
    </button>
  );
};

export default PlayButton;

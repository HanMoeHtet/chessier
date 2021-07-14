import React from 'react';

const PlayNowButton: React.FC = () => {
  const handleClick = () => {};

  return (
    <button
      onClick={handleClick}
      className="border hover:border-gray-300 w-48 text-lg text-gray-100 hover:text-gray-700 bg-transparent hover:bg-gray-100 py-2 rounded"
    >
      Play Now
    </button>
  );
};

export default PlayNowButton;

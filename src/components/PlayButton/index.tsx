import React from 'react';
import { Link } from 'react-router-dom';

const PlayButton: React.FC = () => {
  return (
    <Link
      to="/login"
      className="text-center w-32 text-lg text-gray-600 bg-gray-100 hover:bg-gray-300 font-bold py-2 border-b-4 border-gray-300 hover:border-gray-400 rounded"
    >
      Play
    </Link>
  );
};

export default PlayButton;

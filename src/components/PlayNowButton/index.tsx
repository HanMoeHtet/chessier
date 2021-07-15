import React from 'react';
import { Link } from 'react-router-dom';

const PlayNowButton: React.FC = () => {
  return (
    <Link
      to="/login"
      className="px-5 py-3 text-center border hover:border-gray-300 w-48 text-lg text-gray-100 hover:text-gray-700 bg-transparent hover:bg-gray-100 py-2 rounded"
    >
      Play Now
    </Link>
  );
};

export default PlayNowButton;

import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../PlayButton';
import Logo from '../utils/Logo';

const Navbar: React.FC = () => {
  return (
    <div className="bg-gray-700 fixed top-0 w-full z-50">
      <div className="container mx-auto py-2 px-3 flex items-center">
        <Link to="/" className="text-gray-100 hover:text-gray-300 mr-auto">
          <Logo width="150px" />
        </Link>
        <PlayButton />
      </div>
    </div>
  );
};

export default Navbar;

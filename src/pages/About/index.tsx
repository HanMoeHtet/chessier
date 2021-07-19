import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'src/components/utils/Logo';
import './index.css';

const About: React.FC = () => {
  return (
    <div className="about relative bg-gray-700 text-gray-200">
      <div className="absolute top-0 left-0 p-5 text-white w-full sm:w-auto flex justify-center">
        <Link to="/" className="hover:text-gray-300">
          <Logo width="150px" />
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <h2 style={{ textAlign: 'center' }}>
          <b>About</b>
        </h2>
      </div>
    </div>
  );
};

export default About;

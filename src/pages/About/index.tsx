import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'src/components/utils/Logo';
import './index.css';

const About: React.FC = () => {
  return (
    <div className="about relative bg-gray-700 text-gray-200 min-h-screen">
      <div className="absolute top-0 left-0 p-5 text-white w-full sm:w-auto flex justify-center">
        <Link to="/" className="hover:text-gray-300">
          <Logo width="150px" />
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <h2 style={{ textAlign: 'center' }}>
          <b>About</b>
        </h2>
        <p>Last updated: 2021-07-19</p>
        <p>
          Welcome to <b>Chessier</b>!
        </p>
        <p>
          Chessier is a chess app built with React. It uses modren web
          technologies to support PWA features. Some part of the app can be used
          offline such as 'Playing with computer' and 'Landing Page'. It can be
          installed on user's device. It uses real time communication for
          playing games and matchmaking.
        </p>
        <h4 className="text-2xl mt-10">
          <b>Credits</b>
        </h4>
        <p>
          - App logo is designed by{' '}
          <a
            href="https://www.logodesign.net/"
            target="_blank"
            rel="noreferrer"
          >
            <b>LogoDesign</b>
          </a>
        </p>
        <p>
          - Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            <b>Freepik</b>
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
        <p>
          -
          <a href="https://www.freepik.com/free-photos-vectors/label">
            Label vector created by freepik - www.freepik.com
          </a>
        </p>
        <p>
          - Svg Icons from{' '}
          <a href="https://fontawesome.com/license">
            <b>Font Awesome</b>
          </a>{' '}
          are modified with JSX syntax
        </p>
      </div>
    </div>
  );
};

export default About;

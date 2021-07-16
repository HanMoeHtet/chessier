import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';

const PlayingGame: React.FC = ({ children }) => {
  const { id } = useAppSelector((state) => state.gameStore);
  if (!id) return <Redirect to="/home" />;
  return <>{children}</>;
};

export default PlayingGame;

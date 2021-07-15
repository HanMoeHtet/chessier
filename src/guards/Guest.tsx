import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';

const Guest: React.FC = ({ children }) => {
  const { user, isLoading } = useAppSelector((state) => state.authStore);
  if (isLoading) return null;
  if (user) return <Redirect to="/home" />;
  return <>{children}</>;
};

export default Guest;

import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/play');
  };

  return <button onClick={handleClick}>Play</button>;
};

export default Home;

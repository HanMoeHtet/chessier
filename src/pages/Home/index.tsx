import React from 'react';
import { useAppSelector } from 'src/store/hooks';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.authStore.user!);

  return (
    <div>
      <pre>{JSON.stringify(user, undefined, 4)}</pre>
    </div>
  );
};

export default Home;

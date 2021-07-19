import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ConnectionContext } from 'src/composables/ConnectionProvider';

interface Props {
  redirectTo: string;
}

const Offline: React.FC<Props> = ({ children, redirectTo }) => {
  const { isOnline } = useContext(ConnectionContext);

  if (!isOnline) return <Redirect to={redirectTo} />;
  return <>{children}</>;
};

export default Offline;

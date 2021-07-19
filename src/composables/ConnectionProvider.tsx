import React, { createContext, useEffect, useState } from 'react';

interface Connection {
  isOnline: boolean;
}

export const ConnectionContext = createContext<Connection>({
  isOnline: navigator.onLine,
});

export const ConnectionProvider: React.FC = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(false);
    };

    window.addEventListener('offline', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOnline);
    };
  }, []);

  return (
    <ConnectionContext.Provider value={{ isOnline }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;

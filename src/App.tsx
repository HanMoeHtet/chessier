import React from 'react';
import Board from 'src/components/Board';
import styles from './App.module.css';
import Settings from './components/Settings';
import { Provider as AudioProvider } from './composables/useAudioPlayer';

function App() {
  return (
    <AudioProvider>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="bg-red-100 col-span-2">
          <header className="py-5">
            <h1 className="text-center text-4xl">Chessier</h1>
          </header>
        </div>
        <div className="bg-gray-700 col-span-8">
          <div className="container flex justify-center items-center w-full h-full">
            <div className={`bg-red-100 ${styles.boardContainer}`}>
              <Board />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 col-span-2">
          <Settings />
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;

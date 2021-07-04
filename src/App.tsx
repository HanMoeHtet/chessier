import React from 'react';
import Board from 'src/components/Board';
import styles from './App.module.css';
import { setPerspective, togglePerspective } from './store/gameStore/gameSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="bg-red-100 col-span-2">
        <header className="py-5">
          <h1 className="text-center text-4xl">Chessier</h1>
        </header>
      </div>
      <div className="bg-yellow-100 col-span-8">
        <div className="container flex justify-center items-center w-full h-full">
          <div className={`bg-red-100 ${styles.boardContainer}`}>
            <Board />
            <button
              onClick={() => {
                dispatch(togglePerspective());
              }}
            >
              Change Perspective
            </button>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 col-span-2">settings</div>
    </div>
  );
}

export default App;

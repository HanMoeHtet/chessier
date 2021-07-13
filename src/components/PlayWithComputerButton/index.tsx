import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import { ModalContentType } from 'src/types';

const PlayWithComputerButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setModalContent(ModalContentType.CHOOSE_BOT_LEVEL));
  };

  return (
    <button
      onClick={handleClick}
      className="mb-4 w-48 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-500 rounded"
    >
      Play with computer
    </button>
  );
};

export default PlayWithComputerButton;

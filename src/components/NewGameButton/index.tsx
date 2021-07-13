import React from 'react';
import { useHistory } from 'react-router-dom';
import { findMatch } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import { ModalContentType } from 'src/types';

const NewGameButton: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch(setModalContent(ModalContentType.FINDING_MATCH));
    await dispatch(findMatch());
    dispatch(setModalContent(null));
    history.push('/play/online');
  };

  return (
    <button
      onClick={handleClick}
      className="mb-4 w-48 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-500 rounded"
    >
      New game
    </button>
  );
};

export default NewGameButton;

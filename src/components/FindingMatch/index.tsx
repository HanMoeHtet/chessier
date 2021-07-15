import React from 'react';
import SearchingIcon from 'src/components/utils/SearchinIcon';
import { cancelSearch } from 'src/store/gameStore/gameSlice';
import { useAppDispatch } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import styles from './index.module.css';

const FindingMatch: React.FC = () => {
  const dispatch = useAppDispatch();

  const cancel = () => {
    dispatch(cancelSearch());
    dispatch(setModalContent(null));
  };

  return (
    <div
      className={` bg-gray-700 p-5 flex flex-col rounded-lg ${styles.content}`}
    >
      <h3 className="text-gray-400 text-3xl text-center">Finding match</h3>
      <SearchingIcon />
      <button
        onClick={cancel}
        className="mx-auto w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default FindingMatch;

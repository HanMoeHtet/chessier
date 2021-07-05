import { togglePerspective } from 'src/store/gameStore/gameSlice';
import {
  back as historyBack,
  next as historyNext,
} from 'src/store/historyStore/historySlice';
import { useAppDispatch } from 'src/store/hooks';

export const useSettings = () => {
  const dispatch = useAppDispatch();

  const flip = () => {
    dispatch(togglePerspective());
  };

  const back = () => {
    dispatch(historyBack());
  };

  const next = () => {
    dispatch(historyNext());
  };

  return {
    flip,
    back,
    next,
  };
};

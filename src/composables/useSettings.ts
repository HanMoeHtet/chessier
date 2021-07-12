import { togglePerspective } from 'src/store/gameStore/gameSlice';
import {
  back as historyBack,
  next as historyNext,
  firstMove as historyFirstMove,
  lastMove as historyLastMove,
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

  const firstMove = () => {
    console.log('hello');
    dispatch(historyFirstMove());
  };

  const lastMove = () => {
    dispatch(historyLastMove());
  };

  return {
    flip,
    back,
    next,
    firstMove,
    lastMove,
  };
};

import React from 'react';
import FlipIcon from 'src/components/utils/FlipIcon';
import BackIcon from 'src/components/utils/BackIcon';
import NextIcon from '../utils/NextIcon';
import StepForwardIcon from '../utils/StepForwardIcon';
import StepBackwardIcon from '../utils/StepBackwardIcon';
import Tippy from '@tippyjs/react';
import { useAppDispatch } from 'src/store/hooks';
import { togglePerspective } from 'src/store/gameStore/gameSlice';
import {
  back,
  firstMove,
  lastMove,
  next,
} from 'src/store/historyStore/historySlice';

const SettingButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center items-center my-5">
      <div className="px-3">
        <Tippy content="Flip the Board">
          <button
            onClick={() => dispatch(togglePerspective())}
            onTouchStart={() => console.log('touched')}
          >
            <FlipIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </Tippy>
      </div>
      <div className="px-3">
        <Tippy content="First Move">
          <button onClick={() => dispatch(firstMove())}>
            <StepBackwardIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </Tippy>
      </div>
      <div className="px-3">
        <Tippy content="Previous Move">
          <button onClick={() => dispatch(back())}>
            <BackIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </Tippy>
      </div>
      <div className="px-3">
        <Tippy content="Next Move">
          <button onClick={() => dispatch(next())}>
            <NextIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </Tippy>
      </div>
      <div className="px-3">
        <Tippy content="Last Move">
          <button onClick={() => dispatch(lastMove())}>
            <StepForwardIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </Tippy>
      </div>
    </div>
  );
};

export default SettingButtons;

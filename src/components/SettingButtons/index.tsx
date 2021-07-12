import React from 'react';
import FlipIcon from 'src/components/utils/FlipIcon';
import BackIcon from 'src/components/utils/BackIcon';
import NextIcon from '../utils/NextIcon';
import StepForwardIcon from '../utils/StepForwardIcon';
import StepBackwardIcon from '../utils/StepBackwardIcon';
import Tippy from '@tippyjs/react';
import { useSettings } from 'src/composables/useSettings';

const SettingButtons: React.FC = () => {
  const { flip, back, next, firstMove, lastMove } = useSettings();

  return (
    <div className="flex justify-center items-center my-5">
      <div className="px-3">
        <Tippy content="Flip the Board">
          <button onClick={flip}>
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
          <button onClick={firstMove}>
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
          <button onClick={back}>
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
          <button onClick={next}>
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
          <button onClick={lastMove}>
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

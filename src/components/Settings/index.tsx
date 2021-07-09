import React from 'react';
import Divider from '../utils/Divider';
import FlipIcon from 'src/components/utils/FlipIcon';
import BackIcon from 'src/components/utils/BackIcon';
import NextIcon from '../utils/NextIcon';
import { useSettings } from 'src/composables/useSettings';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import MoveList from '../MoveList';

const Settings: React.FC = () => {
  const { flip, back, next } = useSettings();

  return (
    <div className="container h-screen">
      <div className="grid grid-rows-6 h-full gap-px">
        <div className="row-span-4">
          <MoveList />
          <div className="flex justify-center items-center mt-5">
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
          </div>
        </div>
        <div className="row-span-2"></div>
      </div>
    </div>
  );
};

export default Settings;

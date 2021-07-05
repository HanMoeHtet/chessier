import React from 'react';
import Divider from '../utils/Divider';
import FlipIcon from 'src/components/utils/FlipIcon';
import BackIcon from 'src/components/utils/BackIcon';
import NextIcon from '../utils/NextIcon';
import { useSettings } from 'src/composables/useSettings';

const Settings: React.FC = () => {
  const { flip, back, next } = useSettings();

  return (
    <div className="container h-screen">
      <div className="grid grid-rows-2 h-full gap-px">
        <div className="">
          <button onClick={flip}>
            <FlipIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
          <button onClick={back}>
            <BackIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
          <button onClick={next}>
            <NextIcon
              color="rgba(107, 114, 128, var(--tw-bg-opacity))"
              width="25px"
              height="25px"
            />
          </button>
        </div>
        <div>
          <Divider />
          <div className="p-10 flex items-center h-full">
            <div className="flex items-center flex-col">
              <button className="mb-4 w-36 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
                Offer a draw
              </button>
              <button className="w-36 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                Resign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

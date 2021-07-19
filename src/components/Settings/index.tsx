import React from 'react';
import Divider from '../utils/Divider';
import MoveList from '../MoveList';
import SettingButtons from '../SettingButtons';

const Settings: React.FC = () => {
  return (
    <div className="container h-screen">
      <MoveList />
      <Divider />
      <SettingButtons />
    </div>
  );
};

export default Settings;

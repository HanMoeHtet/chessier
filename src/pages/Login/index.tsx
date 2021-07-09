import React, { useEffect } from 'react';
import { setUpUI } from 'src/services/firebase-ui.service';
import 'src/assets/css/firebase-ui-auth.css';
import Logo from 'src/components/utils/Logo';

const Login: React.FC = () => {
  const uiContainerId = 'firebaseui-auth-container';

  useEffect(() => {
    setUpUI(`#${uiContainerId}`);
  }, []);

  return (
    <div className="bg-gray-800 h-screen w-screen flex justify-center items-center">
      <div>
        <div className="mb-16">
          <Logo color="white" width="400px" />
        </div>
        <div id={uiContainerId}></div>
      </div>
    </div>
  );
};

export default Login;

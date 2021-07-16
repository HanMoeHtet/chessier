import { useEffect } from 'react';
import { setUpUI } from 'src/services/firebase-ui.service';
import 'src/assets/css/firebase-ui-auth.css';
import Logo from 'src/components/utils/Logo';
import styles from 'src/pages/Login/index.module.css';

const Login: React.FC = () => {
  const uiContainerId = 'firebaseui-auth-container';

  useEffect(() => {
    setUpUI(`#${uiContainerId}`);
  }, []);

  return (
    <div className="bg-gray-800 h-screen w-screen flex justify-center items-center">
      <div>
        <div className={`mx-auto mb-16 ${styles.logoContainer}`}>
          <Logo color="white" />
        </div>
        <div id={uiContainerId}></div>
      </div>
    </div>
  );
};

export default Login;

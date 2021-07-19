import { useAppSelector } from 'src/store/hooks';
import { signOut } from 'src/services/firebase.service';
import { Link, Redirect } from 'react-router-dom';
import Logo from 'src/components/utils/Logo';
import NewGameButton from 'src/components/NewGameButton';
import PlayWithComputerButton from 'src/components/PlayWithComputerButton';
import { useContext } from 'react';
import { ConnectionContext } from 'src/composables/ConnectionProvider';

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.authStore.user);
  const { isOnline } = useContext(ConnectionContext);

  if (!user && isOnline) return <Redirect to="/login" />;

  return (
    <>
      <div className="w-screen min-h-screen bg-gray-700 relative">
        <div className="absolute top-0 left-0 p-5 text-white w-full sm:w-auto flex justify-center">
          <Link to="/" className="hover:text-gray-300">
            <Logo width="150px" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center content-center w-full h-full min-h-screen">
          {user && (
            <div className="mt-10 sm:mt-0 mb-14">
              <div className="flex justify-center mb-4">
                <img
                  className="border"
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName}`
                  }
                  width="120px"
                  height="120px"
                  alt="Avatar"
                />
              </div>
              <p className="text-gray-200 text-4xl text-center mb-2">
                {user.displayName}
              </p>
              <p className="text-gray-300 text-xl text-center">
                ({user.rating})
              </p>
            </div>
          )}
          <div className="flex flex-col justify-center items-center bg-gray-800 px-10 py-5 rounded-lg">
            {isOnline && <NewGameButton />}
            <PlayWithComputerButton />
            {user && (
              <button
                onClick={signOut}
                className="w-48 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

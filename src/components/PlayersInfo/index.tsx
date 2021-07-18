import { useAppSelector } from 'src/store/hooks';

const PlayersInfo: React.FC = () => {
  const { playerColor, perspective } = useAppSelector(
    (state) => state.gameStore
  );
  const user = useAppSelector((state) => state.authStore.user!);
  const opponent = useAppSelector((state) => state.gameStore.opponent!);

  const white = playerColor === 'w' ? user : opponent;
  const black = playerColor === 'w' ? opponent : user;

  let top = black;
  let bottom = white;

  if (perspective === 'b') {
    [bottom, top] = [top, bottom];
  }

  return (
    <div className="text-white mb-5">
      <div>
        <p className="text-center mb-2 text-xs text-gray-400">
          {top === black ? 'Black' : 'White'}
        </p>
        <a
          href="/home"
          target="_blank"
          className="flex items-center justify-center hover:bg-gray-800"
        >
          {'photoURL' in top && (
            <img
              className="border mr-3"
              src={
                top.photoURL ||
                `https://ui-avatars.com/api/?name=${top.displayName}`
              }
              width="30px"
              height="30px"
              alt={top.displayName}
            />
          )}
          <p className="mr-1">{top.displayName}</p>
          {'rating' in top && <p>({top.rating})</p>}
        </a>
      </div>
      <p className="flex justify-center text-4xl my-3">VS</p>
      <div>
        <a
          href="/home"
          target="_blank"
          className="flex items-center justify-center hover:bg-gray-800"
        >
          {'photoURL' in bottom && (
            <img
              className="border mr-3"
              src={
                bottom.photoURL ||
                `https://ui-avatars.com/api/?name=${bottom.displayName}`
              }
              width="30px"
              height="30px"
              alt={bottom.displayName}
            />
          )}
          <p className="mr-1">{bottom.displayName}</p>
          {'rating' in bottom && <p>({bottom.rating})</p>}
        </a>
        <p className="text-center mt-2 text-xs text-gray-400">
          {bottom === white ? 'White' : 'Black'}
        </p>
      </div>
    </div>
  );
};

export default PlayersInfo;

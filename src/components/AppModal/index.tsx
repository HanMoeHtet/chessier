import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setModalContent } from 'src/store/modalContent/modalContentSlice';
import { ModalContentType } from 'src/types';
import ChooseBotLevel from '../ChooseBotLevel';
import FindingMatch from '../FindingMatch';
import Result from '../Result';

const AppModal: React.FC = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const { backgroundColor, content } = useAppSelector(
    (state) => state.modalContentStore
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (target) {
      const handleOnClick = (e: MouseEvent) => {
        if ((e.target as HTMLDivElement).contains(target)) {
          dispatch(setModalContent(null));
        }
      };
      document.addEventListener('click', handleOnClick);
      return () => {
        document.removeEventListener('click', handleOnClick);
      };
    }
  }, [target, dispatch]);

  if (content === null) return null;

  const renderModalContent = () => {
    let Content: JSX.Element | null = null;
    switch (content) {
      case ModalContentType.CHOOSE_BOT_LEVEL:
        Content = <ChooseBotLevel />;
        break;
      case ModalContentType.FINDING_MATCH:
        Content = <FindingMatch />;
        break;
      case ModalContentType.RESULT:
        Content = <Result />;
        break;
      default:
        throw Error('Invalid modal type');
    }
    return Content;
  };

  return (
    <div
      className="fixed top-0 w-screen min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 5 }}
    >
      <div ref={(el) => setTarget(el)} className="">
        {renderModalContent()}
      </div>
    </div>
  );
};

export default AppModal;

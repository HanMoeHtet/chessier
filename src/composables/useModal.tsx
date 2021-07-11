import React, { useCallback, useEffect, useRef, useState } from 'react';

const useModal = ({
  initialIsShowing = false,
  isClosedWhenClickedOutside = true,
}) => {
  const [isShowing, setIsShowing] = useState(initialIsShowing);
  console.log(isShowing);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = modalRef.current;
    const handleOnClick = (e: MouseEvent) => {
      if (isClosedWhenClickedOutside && target) {
        if (!e.composedPath().includes(target)) {
          setIsShowing(false);
        }
      }
    };
    console.log('hello');
    window.addEventListener('click', handleOnClick);
    return () => {
      console.log('bye');
      window.removeEventListener('click', handleOnClick);
    };
  }, [isClosedWhenClickedOutside, modalRef, isShowing]);

  const ModalBox: React.FC = useCallback(
    ({ children }) => {
      if (!isShowing) return null;

      return (
        <div
          className="fixed top-0 w-screen min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 5 }}
        >
          <div ref={modalRef} className="">
            {children}
          </div>
        </div>
      );
    },
    [isShowing]
  );

  return {
    ModalBox,
    setIsShowing,
  };
};

export default useModal;

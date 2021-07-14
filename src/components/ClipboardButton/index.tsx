import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import ClipboardIcon from '../utils/ClipboardIcon';

enum Message {
  BEFORE = 'Copy to clipboard',
  AFTER = 'Copied!',
  ERROR = 'An error occurred!',
}

interface Props {
  textToCopy: string;
}

const ClipboardButton: React.FC<Props> = ({ textToCopy }) => {
  const [message, setMessage] = useState(Message.BEFORE);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setMessage(Message.AFTER);
    } catch (err) {
      setMessage(Message.ERROR);
    }
  };

  return (
    <Tippy
      content={message}
      hideOnClick={false}
      onHidden={() => setMessage(Message.BEFORE)}
    >
      <div className="cursor-pointer" onClick={handleClick}>
        <ClipboardIcon width="16px" color="#6b7280" />
      </div>
    </Tippy>
  );
};

export default ClipboardButton;

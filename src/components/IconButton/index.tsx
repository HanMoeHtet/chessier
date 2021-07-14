import React, { useState } from 'react';

interface IconProps {
  color?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

interface Props {
  color?: string;
  activeColor?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  Icon: React.FC<IconProps>;
}

const IconButton: React.FC<Props> = ({
  color,
  activeColor,
  backgroundColor,
  activeBackgroundColor,
  Icon,
}) => {
  const [_color, setColor] = useState(color);
  const [_backgroundColor, setBackgroundColor] = useState(backgroundColor);

  const handleMouseEnter = () => {
    setColor(activeColor);
    setBackgroundColor(activeBackgroundColor);
  };

  const handleMouseLeave = () => {
    setColor(color);
    setBackgroundColor(backgroundColor);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Icon width="32px" backgroundColor={_backgroundColor} color={_color} />
    </div>
  );
};

export default IconButton;

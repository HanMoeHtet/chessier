import React from 'react';

interface Props {
  width?: any;
  height?: any;
  backgroundColor?: any;
  borderColor?: any;
  circleColor?: any;
}

const SearchingIcon: React.FC<Props> = ({
  width = '80px',
  height = '80px',
  backgroundColor = 'transparent',
  borderColor = '#9f9f9f',
  circleColor = '#5a5a5a',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        background: backgroundColor,
        display: 'block',
        shapeRendering: 'auto',
      }}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50 50)">
        <g transform="">
          <g transform="translate(-50 -50)">
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                repeatCount="indefinite"
                dur="1.4925373134328357s"
                values="-20 -20;20 -20;0 20;-20 -20"
                keyTimes="0;0.33;0.66;1"
              ></animateTransform>
              <path
                fill={borderColor}
                d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"
              ></path>
              <path
                fill={circleColor}
                d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SearchingIcon;

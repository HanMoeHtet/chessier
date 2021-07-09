import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const Logo: React.FC<Props> = ({ color, width, height }) => {
  return (
    <div style={{ color }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 390 76"
      >
        <path
          id="Selection"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          d="M 62.00,47.00
           C 58.00,58.15 52.36,61.12 41.00,61.00
             35.46,60.94 31.50,60.13 27.09,56.47
             21.75,52.04 19.31,44.77 19.04,38.00
             18.67,28.96 21.97,19.90 30.00,15.00
             36.11,11.27 44.25,11.55 51.00,13.01
             53.41,13.54 57.49,14.38 58.98,16.51
             60.45,18.60 60.00,25.28 60.00,28.00
             53.78,26.94 55.50,24.21 51.61,20.39
             47.94,16.78 41.72,15.57 37.00,17.65
             23.04,23.80 24.21,52.37 39.00,56.43
             48.80,59.12 52.74,49.15 56.26,47.60
             57.81,46.92 60.31,47.02 62.00,47.00 Z
           M 178.00,47.00
           C 179.44,52.54 181.87,56.11 188.00,56.80
             193.11,57.37 200.70,54.34 199.63,48.02
             198.76,42.87 192.25,41.10 188.00,39.86
             178.52,37.09 170.23,32.69 173.43,21.00
             176.04,11.46 188.12,11.34 196.00,12.59
             198.15,12.93 201.80,13.34 203.40,14.85
             205.61,16.94 205.00,23.06 205.00,26.00
             197.86,24.77 201.36,20.69 194.96,17.65
             190.34,15.46 182.46,16.45 180.84,22.04
             179.49,26.74 184.33,29.84 188.00,31.29
             196.03,34.47 206.42,35.25 207.66,46.00
             209.26,59.86 197.15,61.12 187.00,61.00
             183.72,60.96 177.04,60.49 174.60,58.15
             172.38,56.02 173.00,49.97 173.00,47.00
             173.00,47.00 178.00,47.00 178.00,47.00 Z
           M 221.00,47.00
           C 222.44,52.54 224.87,56.11 231.00,56.80
             236.11,57.37 243.70,54.34 242.63,48.02
             241.76,42.87 235.25,41.10 231.00,39.86
             221.52,37.09 213.23,32.69 216.43,21.00
             219.04,11.46 231.12,11.34 239.00,12.59
             241.15,12.93 244.80,13.34 246.40,14.85
             248.61,16.94 248.00,23.06 248.00,26.00
             240.86,24.77 244.36,20.69 237.96,17.65
             233.34,15.46 225.46,16.45 223.84,22.04
             222.49,26.74 227.33,29.84 231.00,31.29
             239.03,34.47 249.42,35.25 250.66,46.00
             252.26,59.86 240.15,61.12 230.00,61.00
             226.72,60.96 220.04,60.49 217.60,58.15
             215.38,56.02 216.00,49.97 216.00,47.00
             216.00,47.00 221.00,47.00 221.00,47.00 Z
           M 68.00,13.00
           C 68.00,13.00 87.00,13.00 87.00,13.00
             87.00,13.00 87.00,17.00 87.00,17.00
             87.00,17.00 81.00,17.00 81.00,17.00
             81.00,17.00 81.00,32.00 81.00,32.00
             81.00,32.00 105.00,32.00 105.00,32.00
             105.00,32.00 105.00,17.00 105.00,17.00
             105.00,17.00 99.00,17.00 99.00,17.00
             99.00,17.00 99.00,13.00 99.00,13.00
             99.00,13.00 118.00,13.00 118.00,13.00
             118.00,13.00 118.00,17.00 118.00,17.00
             118.00,17.00 112.00,17.00 112.00,17.00
             112.00,17.00 112.00,56.00 112.00,56.00
             112.00,56.00 118.00,56.00 118.00,56.00
             118.00,56.00 118.00,60.00 118.00,60.00
             118.00,60.00 99.00,60.00 99.00,60.00
             99.00,60.00 99.00,56.00 99.00,56.00
             99.00,56.00 105.00,56.00 105.00,56.00
             105.00,56.00 105.00,37.00 105.00,37.00
             105.00,37.00 81.00,37.00 81.00,37.00
             81.00,37.00 81.00,56.00 81.00,56.00
             81.00,56.00 87.00,56.00 87.00,56.00
             87.00,56.00 87.00,60.00 87.00,60.00
             87.00,60.00 68.00,60.00 68.00,60.00
             68.00,60.00 68.00,56.00 68.00,56.00
             68.00,56.00 74.00,56.00 74.00,56.00
             74.00,56.00 74.00,17.00 74.00,17.00
             74.00,17.00 68.00,17.00 68.00,17.00
             68.00,17.00 68.00,13.00 68.00,13.00 Z
           M 124.00,13.00
           C 124.00,13.00 163.00,13.00 163.00,13.00
             163.00,13.00 163.00,24.00 163.00,24.00
             163.00,24.00 158.00,24.00 158.00,24.00
             158.00,24.00 158.00,18.00 158.00,18.00
             158.00,18.00 137.00,18.00 137.00,18.00
             137.00,18.00 137.00,32.00 137.00,32.00
             137.00,32.00 152.00,32.00 152.00,32.00
             152.00,32.00 152.00,26.00 152.00,26.00
             152.00,26.00 156.00,26.00 156.00,26.00
             156.00,26.00 156.00,43.00 156.00,43.00
             156.00,43.00 152.00,43.00 152.00,43.00
             152.00,43.00 152.00,37.00 152.00,37.00
             152.00,37.00 137.00,37.00 137.00,37.00
             137.00,37.00 137.00,56.00 137.00,56.00
             137.00,56.00 158.00,56.00 158.00,56.00
             158.00,56.00 158.00,49.00 158.00,49.00
             158.00,49.00 163.00,49.00 163.00,49.00
             163.00,49.00 163.00,60.00 163.00,60.00
             163.00,60.00 124.00,60.00 124.00,60.00
             124.00,60.00 124.00,56.00 124.00,56.00
             124.00,56.00 130.00,56.00 130.00,56.00
             130.00,56.00 130.00,17.00 130.00,17.00
             130.00,17.00 124.00,17.00 124.00,17.00
             124.00,17.00 124.00,13.00 124.00,13.00 Z
           M 258.00,13.00
           C 258.00,13.00 277.00,13.00 277.00,13.00
             277.00,13.00 277.00,17.00 277.00,17.00
             277.00,17.00 271.00,17.00 271.00,17.00
             271.00,17.00 271.00,56.00 271.00,56.00
             271.00,56.00 277.00,56.00 277.00,56.00
             277.00,56.00 277.00,60.00 277.00,60.00
             277.00,60.00 258.00,60.00 258.00,60.00
             258.00,60.00 258.00,56.00 258.00,56.00
             258.00,56.00 264.00,56.00 264.00,56.00
             264.00,56.00 264.00,17.00 264.00,17.00
             264.00,17.00 258.00,17.00 258.00,17.00
             258.00,17.00 258.00,13.00 258.00,13.00 Z
           M 283.00,13.00
           C 283.00,13.00 322.00,13.00 322.00,13.00
             322.00,13.00 322.00,24.00 322.00,24.00
             322.00,24.00 317.00,24.00 317.00,24.00
             317.00,24.00 317.00,18.00 317.00,18.00
             317.00,18.00 296.00,18.00 296.00,18.00
             296.00,18.00 296.00,32.00 296.00,32.00
             296.00,32.00 311.00,32.00 311.00,32.00
             311.00,32.00 311.00,26.00 311.00,26.00
             311.00,26.00 315.00,26.00 315.00,26.00
             315.00,26.00 315.00,43.00 315.00,43.00
             315.00,43.00 311.00,43.00 311.00,43.00
             311.00,43.00 311.00,37.00 311.00,37.00
             311.00,37.00 296.00,37.00 296.00,37.00
             296.00,37.00 296.00,56.00 296.00,56.00
             296.00,56.00 317.00,56.00 317.00,56.00
             317.00,56.00 317.00,49.00 317.00,49.00
             317.00,49.00 322.00,49.00 322.00,49.00
             322.00,49.00 322.00,60.00 322.00,60.00
             322.00,60.00 283.00,60.00 283.00,60.00
             283.00,60.00 283.00,56.00 283.00,56.00
             283.00,56.00 289.00,56.00 289.00,56.00
             289.00,56.00 289.00,17.00 289.00,17.00
             289.00,17.00 283.00,17.00 283.00,17.00
             283.00,17.00 283.00,13.00 283.00,13.00 Z
           M 330.00,13.00
           C 330.00,13.00 352.00,13.00 352.00,13.00
             355.29,13.01 358.98,12.82 362.00,14.31
             370.64,18.59 372.30,30.86 361.00,37.00
             361.00,37.00 372.39,54.98 372.39,54.98
             372.39,54.98 377.00,56.00 377.00,56.00
             377.00,56.00 377.00,60.00 377.00,60.00
             374.13,60.00 367.68,60.44 365.39,58.98
             361.46,56.48 358.40,44.10 353.79,40.74
             350.85,38.59 346.48,39.00 343.00,39.00
             343.00,39.00 343.00,56.00 343.00,56.00
             343.00,56.00 350.00,56.00 350.00,56.00
             350.00,56.00 350.00,60.00 350.00,60.00
             350.00,60.00 330.00,60.00 330.00,60.00
             330.00,60.00 330.00,56.00 330.00,56.00
             330.00,56.00 336.00,56.00 336.00,56.00
             336.00,56.00 336.00,17.00 336.00,17.00
             336.00,17.00 330.00,17.00 330.00,17.00
             330.00,17.00 330.00,13.00 330.00,13.00 Z
           M 343.00,34.00
           C 346.30,34.00 354.25,34.48 356.83,32.98
             362.12,29.96 361.86,21.46 356.83,18.45
             353.49,16.50 346.89,17.00 343.00,17.00
             343.00,17.00 343.00,34.00 343.00,34.00 Z"
        />
      </svg>
    </div>
  );
};

export default Logo;

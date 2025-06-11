import type { FC } from 'react';
import RacingCarIcon from './assets/racing-car.svg?react';

const laneCount = 3;
const trackClass =
  'relative w-80 h-24 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg border border-gray-400 shadow-inner overflow-hidden';
const laneClass = 'absolute inset-x-0 border-t border-dashed border-white opacity-50';
const carClass = 'absolute top-1/2 left-0 -translate-y-1/2 animate-race';
const carIconClass = 'w-16 h-16 text-red-500 drop-shadow-md';
const finishLineClass = 'absolute right-0 top-0 bottom-0 w-2 bg-black';

export const Loader: FC = () => {
  const lanes = Array.from({ length: laneCount }, (_, i) => (
    <div key={i} className={laneClass} style={{ top: `${(i + 1) * 25}%` }} />
  ));

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className={trackClass}>
        {lanes}
        <div className={carClass}>
          <RacingCarIcon className={carIconClass} />
        </div>
        <div className={finishLineClass} />
      </div>
    </div>
  );
};

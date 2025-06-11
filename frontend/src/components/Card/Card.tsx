import type { ReactNode } from 'react';
import { FlagIcon } from '../FlagIcon/FlagIcon';

type Entry = {
  readonly label: string;
  readonly value: string;
};

type Props = {
  readonly driver: string;
  readonly driverNationality: string;
  readonly isHighlighted?: boolean;
  readonly constructorName: string;
  readonly entries: readonly Entry[];
  readonly aside?: ReactNode;
  readonly season?: string;
};

export const Card = ({
  driver,
  driverNationality,
  isHighlighted = false,
  constructorName,
  entries,
  aside = null,
  season,
}: Props) => {
  const containerClasses = [
    'flex justify-between items-center w-full max-w-[800px] p-4 mb-3 rounded shadow-lg transition',
    isHighlighted && 'border-2 border-yellow-400 shadow-yellow-200',
    aside && 'hover:shadow-2xl',
  ]
    .filter(Boolean)
    .join(' ');

  const title = isHighlighted ? `${season} World Champion` : undefined;

  return (
    <div className={containerClasses} title={title}>
      <div className="flex items-center gap-4">
        <FlagIcon nationality={driverNationality} />
        <div>
          <p className="font-bold">{driver}</p>
          <p className="text-gray-500 font-medium">{constructorName}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {entries.map(({ label, value }) => (
          <dl key={label} className="text-right">
            <dt className="text-gray-500 font-light">{label}</dt>
            <dd className="font-bold">{value}</dd>
          </dl>
        ))}
        {aside}
      </div>
    </div>
  );
};

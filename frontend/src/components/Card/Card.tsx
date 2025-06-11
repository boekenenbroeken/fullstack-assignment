import type { ReactNode } from 'react';
import { FlagIcon } from 'components/FlagIcon/FlagIcon';
import clsx from 'clsx';

type Entry = {
  readonly label: string;
  readonly value: string;
};

type Props = {
  readonly driver: string;
  readonly driverNationality: string;
  readonly team: string;
  readonly entries: readonly Entry[];
  readonly isHighlighted?: boolean;
  readonly aside?: ReactNode;
  readonly season?: string;
};

export const Card = ({
  driver,
  driverNationality,
  team,
  entries,
  isHighlighted,
  aside,
  season,
}: Props) => {
  const baseClasses =
    'flex justify-between items-center w-full px-4 md:px-8 py-6 mb-4 rounded-2xl bg-white shadow transition';

  const containerClasses = clsx(baseClasses, {
    'border-2 border-yellow-400 shadow-lg shadow-yellow-200': isHighlighted,
    'hover:shadow-2xl hover:scale-[1.02] hover:transition-transform': aside,
  });

  const title = isHighlighted ? `${season} World Champion` : undefined;

  return (
    <div className={containerClasses} title={title}>
      <div className="flex items-center gap-5">
        <FlagIcon nationality={driverNationality} />
        <div className="flex flex-col">
          <p className="font-semibold text-lg leading-snug pr-5 md:pr-0">{driver}</p>
          <p className="text-sm text-gray-500">{team}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {entries.map(({ label, value }) => (
          <dl key={label} className="text-right">
            <dt className="text-xs text-gray-400">{label}</dt>
            <dd className="text-base font-semibold">{value}</dd>
          </dl>
        ))}
        {aside}
      </div>
    </div>
  );
};

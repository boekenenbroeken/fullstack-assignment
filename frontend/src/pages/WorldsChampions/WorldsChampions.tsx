import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Card } from 'components/Card/Card';
import { DataBoundary } from 'components/DataBoundary/DataBoundary';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChampionsStore } from 'store/champions';
import { useDelayedLoader } from 'utils/useDelayedLoader';

export const WorldsChampions = () => {
  const { data = [], loading, error, hydrate } = useChampionsStore();
  const isLoading = loading || !data?.length;
  const noData = !data.length;
  const showLoader = useDelayedLoader(isLoading);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <DataBoundary loading={showLoader} error={error} empty={noData}>
      <main className="p-4">
        <h1 className="text-3xl font-semibold tracking-tight mt-5 mb-10 text-center">
          🏆 F1 World Champions
        </h1>
        <ul className="space-y-4">
          {data.map(({ season, driver, team }) => (
            <li key={`${season}-${driver.id}`}>
              <Link to={`/race/${season}`}>
                <Card
                  driver={driver.name}
                  driverNationality={driver.nationality}
                  team={team.name}
                  entries={[{ label: 'Season', value: season }]}
                  aside={<ChevronRightIcon className="w-4 h-4" aria-hidden />}
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </DataBoundary>
  );
};

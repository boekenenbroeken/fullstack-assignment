import { useEffect } from 'react';
import { useChampionsStore } from 'store/champions';
import { Loader } from 'components/Loader/Loader';
import { ErrorScreen } from 'pages/ErrorScreen/ErrorScreen';
import { Link } from 'react-router-dom';
import { Card } from 'components/Card/Card';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useDelayedLoader } from 'utils/useDelayedLoader';

export const WorldsChampions = () => {
  const { data, loading, error, hydrate } = useChampionsStore();
  const showLoader = useDelayedLoader(loading || !data?.length); // 2 second min

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (showLoader) return <Loader />;
  if (error) return <ErrorScreen />;

  return (
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
  );
};

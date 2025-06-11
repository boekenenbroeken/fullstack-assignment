import { useEffect } from 'react';
import { useChampionsStore } from '../../store/champions';
import { Loader } from '../../components/Loader/Loader';
import { ErrorState } from '../../components/Error/Error';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const WorldsChampions = () => {
  const { data, loading, error, fetch } = useChampionsStore();

  useEffect(() => {
    if (!data?.length) {
      fetch();
    }
  }, [data, fetch]);

  if (loading || !data?.length) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">F1 World Champions</h1>
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

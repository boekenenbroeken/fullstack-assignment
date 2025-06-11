import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRacesStore } from 'store/races';
import { useChampionsStore } from 'store/champions';
import { Loader } from 'components/Loader/Loader';
import { ErrorScreen } from 'pages/ErrorScreen/ErrorScreen';
import { Card } from 'components/Card/Card';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useDelayedLoader } from 'utils/useDelayedLoader';

export const RacesWinners = () => {
  const { season } = useParams<{ season: string }>();

  const {
    data: races,
    loading: racesLoading,
    error: racesError,
    fetch: fetchRaces,
  } = useRacesStore();
  const {
    data: champions,
    loading: championsLoading,
    error: championsError,
    fetch: fetchChampions,
  } = useChampionsStore();

  const isStillLoading = (racesLoading || championsLoading) && !(racesError || championsError);

  const showLoader = useDelayedLoader(isStillLoading);

  useEffect(() => {
    if (season) {
      fetchRaces(season);
    }
  }, [season, fetchRaces]);

  useEffect(() => {
    if (!champions.length) {
      fetchChampions();
    }
  }, [champions.length, fetchChampions]);

  if (showLoader) return <Loader />;

  if (racesError || championsError) return <ErrorScreen />;

  const noData = races.length === 0 || champions.length === 0;

  if (!season || noData) return <ErrorScreen />;

  const championId = champions.find((champion) => champion.season === season)?.driver.id;

  return (
    <main className="p-4">
      <Link to="/" className="inline-flex items-center text-blue-500 mb-6">
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to World Champions
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight mb-10 text-center">
        🏁 Races Winners — {season}
      </h1>

      <ul className="space-y-4">
        {races.map(({ winner, team, name }) => (
          <li key={name}>
            <Card
              driver={winner.name}
              driverNationality={winner.nationality}
              team={team.name}
              isHighlighted={championId === winner.id}
              entries={[{ label: 'Race', value: name }]}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

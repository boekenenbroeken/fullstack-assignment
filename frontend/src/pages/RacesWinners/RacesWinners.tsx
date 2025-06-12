import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRacesStore } from 'store/races';
import { useChampionsStore } from 'store/champions';
import { Card } from 'components/Card/Card';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useDelayedLoader } from 'utils/useDelayedLoader';
import { DataBoundary } from 'components/DataBoundary/DataBoundary';

export const RacesWinners = () => {
  const { season } = useParams<{ season: string }>();

  const {
    data: races,
    loading: racesLoading,
    error: racesError,
    hydrate: hydrateRaces,
  } = useRacesStore();

  const {
    data: champions,
    loading: championsLoading,
    error: championsError,
    hydrate: hydrateChampions,
  } = useChampionsStore();

  useEffect(() => {
    if (season) {
      hydrateRaces(season);
    }
    if (!champions.length) {
      hydrateChampions();
    }
  }, [season, champions.length, hydrateRaces, hydrateChampions]);

  const isStillLoading = (racesLoading || championsLoading) && !(racesError || championsError);
  const showLoader = useDelayedLoader(isStillLoading);
  const hasError = racesError || championsError;
  const noData = !season || !races?.length || !champions?.length;

  return (
    <DataBoundary loading={showLoader} error={hasError} empty={noData}>
      <main className="p-4">
        <Link to="/" className="inline-flex items-center text-blue-500 mb-6">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back to World Champions
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight mb-10 text-center">
          🏁 {season} Race Winners
        </h1>
        <ul className="space-y-4">
          {races.map(({ winner, team, name }) => (
            <li key={`${season}-${name}`}>
              <Card
                driver={winner.name}
                driverNationality={winner.nationality}
                team={team.name}
                isHighlighted={champions.find((c) => c.season === season)?.driver?.id === winner.id}
                entries={[{ label: 'Race', value: name }]}
              />
            </li>
          ))}
        </ul>
      </main>
    </DataBoundary>
  );
};

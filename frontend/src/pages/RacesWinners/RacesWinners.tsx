import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRacesStore } from '../../store/races';
import { useChampionsStore } from '../../store/champions';
import { Loader } from '../../components/Loader/Loader';
import { ErrorState } from '../../components/Error/Error';
import { Card } from '../../components/Card/Card';

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

  if (!season) return <div>Invalid season</div>;

  if (racesLoading || championsLoading || !races.length || !champions.length) {
    return <Loader />;
  }

  if (racesError || championsError) {
    return <ErrorState />;
  }

  const championId = champions.find((champion) => champion.season === season)?.driver.id;

  return (
    <main className="p-4">
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

import { useEffect, useState } from 'react';
import { fetchRaces, Race } from '../api/api';

export default function RaceWinners({ season, championId }: { season: string; championId: string }) {
  const [data, setData] = useState<Race[] | null>(null);
  const [error, setError] = useState<string>();
  useEffect(() => {
    fetchRaces(season)
      .then(setData)
      .catch(e => setError(e.message));
  }, [season]);

  if (error) return <div className="error">{error}</div>;
  if (!data) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Round</th><th>Race</th><th>Winner</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r => (
          <tr key={r.round} style={{ fontWeight: r.winner.id === championId ? 'bold' : 'normal' }}>
            <td>{r.round}</td>
            <td>{r.raceName}</td>
            <td>{r.winner.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

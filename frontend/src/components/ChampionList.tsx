import { useEffect, useState } from 'react';
import { fetchChampions, Champion } from '../api/api';

export default function ChampionList({ onSelect }: { onSelect: (season: string) => void }) {
  const [data, setData] = useState<Champion[] | null>(null);
  const [error, setError] = useState<string>();
  useEffect(() => {
    fetchChampions()
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(ch => (
        <li key={ch.season}>
          <button onClick={() => onSelect(ch.season)}>
            {ch.season}: {ch.driver.name} ({ch.constructorName})
          </button>
        </li>
      ))}
    </ul>
  );
}

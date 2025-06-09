import { useState } from 'react';
import ChampionList from './components/ChampionList';
import RaceWinners from './components/RaceWinners';
import { fetchChampions } from './api/api';
export default function App() {
  const [season, setSeason] = useState<string>();
  const [championId, setChampionId] = useState<string>();

  // When a season is selected, fetch champions again to get driverId
  const handleSelect = async (yr: string) => {
    setSeason(yr);
    const champs = await fetchChampions(yr);  // reuse fetch from api
    setChampionId(champs[0].driver.id);
  };

  return (
    <div>
      <h1>F1 World Champions</h1>
      <ChampionList onSelect={handleSelect} />
      {/* {season && championId && <RaceWinners season={season} championId={championId} />} */}
    </div>
  );
}

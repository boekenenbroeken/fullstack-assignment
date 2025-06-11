import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { WorldsChampions } from '../pages/WorldsChampions/WorldsChampions';
import { RacesWinners } from '../pages/RacesWinners/RacesWinners';

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<WorldsChampions />} />
      <Route path="/race/:season" element={<RacesWinners />} />
    </ReactRoutes>
  );
}

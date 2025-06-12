import { NotFound } from 'pages/NotFound/NotFound';
import { RacesWinners } from 'pages/RacesWinners/RacesWinners';
import { WorldsChampions } from 'pages/WorldsChampions/WorldsChampions';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<WorldsChampions />} />
      <Route path="/race/:season" element={<RacesWinners />} />
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
}

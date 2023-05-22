import { Routes as RouterRoutes, Route } from 'react-router-dom';

import Home from './pages/home';
import Team from './pages/team';
import Championship from './pages/championship';
import AllTeams from './pages/all_teams';
import AllChampionships from './pages/all_championships';

/**
 * Define the app routes.
 */
export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/:date?" element={<Home />} />
      <Route path="/times/:name" element={<Team />} />
      <Route path="/campeonatos/:name" element={<Championship />} />
      <Route path="/todos-os-times" element={<AllTeams />} />
      <Route path="/todos-os-campeonatos" element={<AllChampionships />} />
    </RouterRoutes>
  );
}

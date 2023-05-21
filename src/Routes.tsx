import { Routes as RouterRoutes, Route } from 'react-router-dom';

import Home from './pages/home';

/**
 * Define the app routes.
 */
export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/:date?" element={<Home />} />
    </RouterRoutes>
  );
}

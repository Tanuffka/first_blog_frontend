import { Route, Routes } from 'react-router';

import Home from 'src/pages/Home';

export default function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

import { Outlet } from 'react-router-dom';

import Header from 'src/components/Header';

function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default DefaultLayout;

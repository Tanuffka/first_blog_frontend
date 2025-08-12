import { Outlet } from 'react-router-dom';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;

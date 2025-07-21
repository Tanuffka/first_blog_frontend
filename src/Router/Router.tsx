import { Route, Routes } from 'react-router-dom';

import DefaultLayout from 'src/layouts/DefaultLayout';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import ResetPassword from 'src/pages/ResetPassword';
import ForgotPassword from 'src/pages/ForgotPassword';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

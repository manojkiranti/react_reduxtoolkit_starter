import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';

export const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
};

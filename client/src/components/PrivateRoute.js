import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePage  from './ProfilePage';

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated ? <ProfilePage  /> : <Navigate to='/login' />;
};

export default PrivateRoute;

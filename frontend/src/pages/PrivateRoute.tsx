import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
};
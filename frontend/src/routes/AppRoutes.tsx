import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { ShortenUrl } from '../pages/ShortenUrl';
import { PrivateRoute } from '../pages/PrivateRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/shorten"
        element={
          <PrivateRoute>
            <ShortenUrl />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
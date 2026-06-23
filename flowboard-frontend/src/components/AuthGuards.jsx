import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../api/axios';

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get('/auth/verify');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get('/auth/verify');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

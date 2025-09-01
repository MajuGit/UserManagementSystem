import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CreateProfilePage from '../pages/CreateProfilePage';
import UsersListPage from '../pages/UsersListPage';
import ProfilePage from '../pages/ProfilePage';
import ForbiddenPage from '../pages/ForbiddenPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const getDefaultRoute = (): string => {
    if (!isAuthenticated) return '/login';
    
    switch (user?.role) {
      case 'admin':
        return '/dashboard';
      case 'supervisor':
        return '/dashboard';
      case 'associate':
        return '/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <LoginPage />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />
          
          {/* Dashboard - All roles */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Create Profile - Admin only */}
          <Route
            path="create-profile"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateProfilePage />
              </ProtectedRoute>
            }
          />
          
          {/* Users List - Admin and Supervisor */}
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
                <UsersListPage />
              </ProtectedRoute>
            }
          />
          
          {/* Profile - All roles */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="profile/:userId/edit" element={<ProfilePage />} />
        </Route>

        {/* Error Pages */}
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

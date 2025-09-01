import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { users, isLoading } = useUsers();

  const getRoleStats = () => {
    const stats = {
      total: users.length,
      admin: users.filter(u => u.role === 'admin').length,
      supervisor: users.filter(u => u.role === 'supervisor').length,
      associate: users.filter(u => u.role === 'associate').length,
    };
    return stats;
  };

  const getQuickActions = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { name: 'Create New Profile', href: '/create-profile', icon: '➕', color: 'bg-green-500' },
          { name: 'View All Users', href: '/users', icon: '👥', color: 'bg-blue-500' },
        ];
      case 'supervisor':
        return [
          { name: 'View All Users', href: '/users', icon: '👥', color: 'bg-blue-500' },
        ];
      case 'associate':
        return [
          { name: 'View My Profile', href: '/profile', icon: '👤', color: 'bg-purple-500' },
        ];
      default:
        return [];
    }
  };

  const stats = getRoleStats();
  const quickActions = getQuickActions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-600">
          You are logged in as a <span className="font-semibold text-primary-600">{user?.role}</span>
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <span className="text-2xl">👑</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.admin}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Supervisors</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.supervisor}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <span className="text-2xl">👤</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Associates</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.associate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className={`p-2 rounded-full ${action.color} text-white`}>
                <span className="text-lg">{action.icon}</span>
              </div>
              <span className="ml-3 font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Role-based Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Permissions</h2>
        <div className="space-y-3">
          {user?.role === 'admin' && (
            <>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>Create, edit, and delete user profiles</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>View all users in the system</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>Manage system settings</span>
              </div>
            </>
          )}
          {user?.role === 'supervisor' && (
            <>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>Edit and view user profiles</span>
              </div>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>View all users in the system</span>
              </div>
              <div className="flex items-center text-red-600">
                <span className="mr-2">❌</span>
                <span>Cannot create new user profiles</span>
              </div>
            </>
          )}
          {user?.role === 'associate' && (
            <>
              <div className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                <span>View your own profile</span>
              </div>
              <div className="flex items-center text-red-600">
                <span className="mr-2">❌</span>
                <span>Cannot view other users</span>
              </div>
              <div className="flex items-center text-red-600">
                <span className="mr-2">❌</span>
                <span>Cannot create or edit profiles</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

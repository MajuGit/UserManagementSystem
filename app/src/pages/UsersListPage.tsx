import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import { UserList, User } from 'user-list';

const UsersListPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { users, deleteUser, isLoading } = useUsers();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleView = (user: User) => {
    navigate(`/profile/${user.id}`);
  };

  const handleEdit = (user: User) => {
    navigate(`/profile/${user.id}/edit`);
  };

  const handleDelete = async (userId: string) => {
    if (deleteConfirm === userId) {
      try {
        await deleteUser(userId);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      setDeleteConfirm(userId);
      // Auto-clear confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users List</h1>
        <p className="text-gray-600">
          Manage user profiles. You can view, edit, and delete users based on your permissions.
        </p>
      </div>

      <UserList
        users={users}
        role={currentUser.role}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Confirm Deletion</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersListPage;

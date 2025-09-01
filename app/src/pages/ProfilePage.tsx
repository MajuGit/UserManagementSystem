import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import { UserProfileForm, UserFormData } from 'user-profile-form';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const { getUserById, updateUser } = useUsers();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      const foundUser = getUserById(userId);
      setUser(foundUser);
    } else if (currentUser) {
      // If no userId, show current user's profile
      const foundUser = getUserById(currentUser.id);
      setUser(foundUser);
    }
  }, [userId, currentUser, getUserById]);

  const handleSubmit = async (formData: UserFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updatedUser: User = {
        ...user,
        ...formData
      };
      
      await updateUser(updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const canEdit = () => {
    if (!currentUser || !user) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'supervisor' && user.role !== 'admin') return true;
    if (currentUser.id === user.id) return true; // Users can edit their own profile
    return false;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isOwnProfile ? 'My Profile' : `${user.fullName}'s Profile`}
            </h1>
            <p className="text-gray-600">
              {isEditing 
                ? 'Edit the user profile information below.' 
                : 'View and manage user profile information.'
              }
            </p>
          </div>
          
          {!isEditing && canEdit() && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <UserProfileForm
        mode={isEditing ? 'edit' : 'view'}
        initialData={{
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role:user.role,
          addresses: user.addresses
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      {!isEditing && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'supervisor' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.updatedAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Addresses</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user.addresses.length}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

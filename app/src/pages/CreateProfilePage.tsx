import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { UserProfileForm, UserFormData } from 'user-profile-form';
//import { UserRole } from '../types';

const CreateProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = async (formData: UserFormData) => {
    setIsLoading(true);
    try {

     // const roles: UserRole[] = ['admin', 'supervisor', 'associate'];
     // const randomRole = roles[Math.floor(Math.random() * roles.length)];
      
      await addUser({
         ...formData,
       // role: randomRole
       role: formData.role
       });
      
      navigate('/users', { 
        state: { message: 'User profile created successfully!' }
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      // In a real app, you'd show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New User Profile</h1>
        <p className="text-gray-600">
          Fill out the form below to create a new user profile. All fields marked with * are required.
        </p>
      </div>

      <UserProfileForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateProfilePage;

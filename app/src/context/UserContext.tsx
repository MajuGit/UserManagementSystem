import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { LocalStorageService } from '../utils/localStorage';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'LOAD_USERS_START' }
  | { type: 'LOAD_USERS_SUCCESS'; payload: User[] }
  | { type: 'LOAD_USERS_FAILURE'; payload: string }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOAD_USERS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOAD_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOAD_USERS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        error: null,
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface UserContextType extends UserState {
  loadUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getUserById: (userId: string) => User | null;
  getUsersByRole: (role: UserRole) => User[];
  clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (): Promise<void> => {
    dispatch({ type: 'LOAD_USERS_START' });

    try {
      const users = LocalStorageService.getUsers();
      dispatch({ type: 'LOAD_USERS_SUCCESS', payload: users });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load users';
      dispatch({ type: 'LOAD_USERS_FAILURE', payload: errorMessage });
    }
  };

  const addUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      LocalStorageService.addUser(newUser);
      dispatch({ type: 'ADD_USER', payload: newUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add user';
      dispatch({ type: 'LOAD_USERS_FAILURE', payload: errorMessage });
    }
  };

  const updateUser = async (updatedUser: User): Promise<void> => {
    try {
      const userWithUpdatedTimestamp: User = {
        ...updatedUser,
        updatedAt: new Date().toISOString(),
      };

      LocalStorageService.updateUser(userWithUpdatedTimestamp);
      dispatch({ type: 'UPDATE_USER', payload: userWithUpdatedTimestamp });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      dispatch({ type: 'LOAD_USERS_FAILURE', payload: errorMessage });
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      LocalStorageService.deleteUser(userId);
      dispatch({ type: 'DELETE_USER', payload: userId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      dispatch({ type: 'LOAD_USERS_FAILURE', payload: errorMessage });
    }
  };

  const getUserById = (userId: string): User | null => {
    return state.users.find(user => user.id === userId) || null;
  };

  const getUsersByRole = (role: UserRole): User[] => {
    return state.users.filter(user => user.role === role);
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: UserContextType = {
    ...state,
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByRole,
    clearError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthUser, UserRole, LoginCredentials } from '../types';
import { LocalStorageService } from '../utils/localStorage';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
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

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials for demo purposes
const DEMO_CREDENTIALS = {
  'admin@company.com': { password: 'admin123', role: 'admin' as UserRole, fullName: 'Admin User' },
  'supervisor@company.com': { password: 'supervisor123', role: 'supervisor' as UserRole, fullName: 'Supervisor User' },
  'associate@company.com': { password: 'associate123', role: 'associate' as UserRole, fullName: 'Associate User' },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = LocalStorageService.getAuthUser();
    if (savedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: savedUser });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userCreds = DEMO_CREDENTIALS[credentials.email as keyof typeof DEMO_CREDENTIALS];

      if (!userCreds || userCreds.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }

      const authUser: AuthUser = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        role: userCreds.role,
        fullName: userCreds.fullName,
      };

      // Save to localStorage
      LocalStorageService.saveAuthUser(authUser);

      dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
  };

  const logout = (): void => {
    LocalStorageService.clearAuthUser();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

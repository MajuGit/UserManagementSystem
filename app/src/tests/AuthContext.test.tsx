import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types';

// Mock the LocalStorage service
jest.mock('../utils/localStorage', () => ({
  LocalStorageService: {
    getAuthUser: jest.fn(),
    saveAuthUser: jest.fn(),
    clearAuthUser: jest.fn(),
  },
}));

// Test component to access auth context
const TestComponent: React.FC = () => {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();

  const handleLogin = async () => {
    const credentials: LoginCredentials = {
      email: 'admin@company.com',
      password: 'admin123'
    };
    await login(credentials);
  };

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="user-info">
        {user ? `${user.fullName} (${user.role})` : 'No user'}
      </div>
      <div data-testid="loading-status">
        {isLoading ? 'Loading' : 'Not Loading'}
      </div>
      <div data-testid="error-message">
        {error || 'No error'}
      </div>
      <button onClick={handleLogin} data-testid="login-button">
        Login
      </button>
      <button onClick={logout} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('error-message')).toHaveTextContent('No error');
  });

  it('should handle successful login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });

    expect(screen.getByTestId('user-info')).toHaveTextContent('Admin User (admin)');
  });

  it('should handle login failure', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Mock invalid credentials by temporarily modifying the component
    const TestComponentWithInvalidCredentials = () => {
      const { login } = useAuth();

      const handleInvalidLogin = async () => {
        const credentials: LoginCredentials = {
          email: 'invalid@company.com',
          password: 'wrongpassword'
        };
        await login(credentials);
      };

      return (
        <div>
          <button onClick={handleInvalidLogin} data-testid="invalid-login-button">
            Invalid Login
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponentWithInvalidCredentials />
      </AuthProvider>
    );

    const invalidLoginButton = screen.getByTestId('invalid-login-button');
    fireEvent.click(invalidLoginButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
    });
  });

  it('should handle logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First login
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });

    // Then logout
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
  });

  it('should show loading state during login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    // Should show loading state immediately
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Loading');

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading-status')).toHaveTextContent('Not Loading');
    });
  });
});

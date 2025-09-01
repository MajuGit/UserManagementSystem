import { User, AuthUser } from '../types';

const STORAGE_KEYS = {
  USERS: 'user_profile_users',
  AUTH_USER: 'user_profile_auth_user',
  SESSION: 'user_profile_session'
} as const;

export class LocalStorageService {
  static getUsers(): User[] {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading users from localStorage:', error);
      return [];
    }
  }

  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      throw new Error('Failed to save users');
    }
  }

  static addUser(user: User): void {
    try {
      const users = this.getUsers();
      users.push(user);
      this.saveUsers(users);
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Failed to add user');
    }
  }

  static updateUser(updatedUser: User): void {
    try {
      const users = this.getUsers();
      const index = users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        this.saveUsers(users);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  static deleteUser(userId: string): void {
    try {
      const users = this.getUsers();
      const filteredUsers = users.filter(user => user.id !== userId);
      this.saveUsers(filteredUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  static getUserById(userId: string): User | null {
    try {
      const users = this.getUsers();
      return users.find(user => user.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  static getAuthUser(): AuthUser | null {
    try {
      const authUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return authUser ? JSON.parse(authUser) : null;
    } catch (error) {
      console.error('Error reading auth user from localStorage:', error);
      return null;
    }
  }

  static saveAuthUser(authUser: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
    } catch (error) {
      console.error('Error saving auth user to localStorage:', error);
      throw new Error('Failed to save auth user');
    }
  }

  static clearAuthUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (error) {
      console.error('Error clearing auth user from localStorage:', error);
    }
  }

  static isAuthenticated(): boolean {
    return this.getAuthUser() !== null;
  }

  static clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

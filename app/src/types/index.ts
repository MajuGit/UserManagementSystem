export type UserRole = 'admin' | 'supervisor' | 'associate';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  //role: UserRole;
   role: string;
  fullName: string;
}

export interface FormMode {
  mode: 'create' | 'edit' | 'view';
}

export interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface SearchFilters {
  searchTerm: string;
  role?: UserRole;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

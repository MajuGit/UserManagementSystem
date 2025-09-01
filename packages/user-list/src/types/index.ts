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
  role: UserRole;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
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

export interface UserListProps {
  users: User[];
  role: UserRole;
  onEdit?: (user: User) => void;
  onView?: (user: User) => void;
  onDelete?: (userId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export interface SearchAndFilterProps {
  searchTerm: string;
  selectedRole?: UserRole;
  onSearchChange: (term: string) => void;
  onRoleFilterChange: (role?: UserRole) => void;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

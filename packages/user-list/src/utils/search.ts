import { User, UserRole, SearchFilters } from '../types';

export class SearchService {
  static filterUsers(users: User[], filters: SearchFilters): User[] {
    return users.filter(user => {
      // Search term filter
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm);

      // Role filter
      const matchesRole = !filters.role || user.role === filters.role;

      return matchesSearch && matchesRole;
    });
  }

  static paginateUsers(users: User[], page: number, pageSize: number): User[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
  }

  static getTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  static getPageInfo(currentPage: number, pageSize: number, totalItems: number) {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    return {
      startItem,
      endItem,
      totalItems,
      hasNextPage: currentPage * pageSize < totalItems,
      hasPrevPage: currentPage > 1
    };
  }
}

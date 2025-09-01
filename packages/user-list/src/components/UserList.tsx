import React, { useState, useMemo } from 'react';
import { UserListProps, User, UserRole, SearchFilters, PaginationState } from '../types';
import { SearchService } from '../utils/search';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';

const UserList: React.FC<UserListProps> = ({
  users,
  role,
  onEdit,
  onView,
  onDelete,
  isLoading = false,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter and paginate users
  const filteredUsers = useMemo(() => {
    const filters: SearchFilters = {
      searchTerm,
      role: selectedRole
    };
    return SearchService.filterUsers(users, filters);
  }, [users, searchTerm, selectedRole]);

  const paginatedUsers = useMemo(() => {
    return SearchService.paginateUsers(filteredUsers, currentPage, pageSize);
  }, [filteredUsers, currentPage]);

  const totalPages = SearchService.getTotalPages(filteredUsers.length, pageSize);
  const pageInfo = SearchService.getPageInfo(currentPage, pageSize, filteredUsers.length);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole]);

  const getRoleBadgeColor = (userRole: UserRole) => {
    switch (userRole) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'supervisor':
        return 'bg-yellow-100 text-yellow-800';
      case 'associate':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canEdit = (userRole: UserRole) => {
    if (role === 'admin') return true;
    if (role === 'supervisor' && userRole !== 'admin') return true;
    return false;
  };

  const canDelete = (userRole: UserRole) => {
    return role === 'admin' && userRole !== 'admin';
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedRole={selectedRole}
        onSearchChange={setSearchTerm}
        onRoleFilterChange={setSelectedRole}
      />

      {/* Results Summary */}
      <div className="text-sm text-gray-700">
        Showing {pageInfo.startItem} to {pageInfo.endItem} of {pageInfo.totalItems} users
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedRole && ` with role "${selectedRole}"`}
      </div>

      {/* Users Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {paginatedUsers.map((user) => (
            <li key={user.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <p>{user.email}</p>
                      <span className="mx-2">•</span>
                      <p>{user.phone}</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {user.addresses.length} address{user.addresses.length !== 1 ? 'es' : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(user)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                  )}
                  {onEdit && canEdit(user.role) && (
                    <button
                      onClick={() => onEdit(user)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && canDelete(user.role) && (
                    <button
                      onClick={() => onDelete(user.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {paginatedUsers.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedRole ? 'Try adjusting your search or filter criteria.' : 'Get started by creating a new user profile.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserList;

import React from 'react';
import { SearchAndFilterProps, UserRole } from '../types';

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  selectedRole,
  onSearchChange,
  onRoleFilterChange,
  className = ''
}) => {
  const roles: { value: UserRole; label: string }[] = [
    // { value: 'admin', label: 'Admin' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'associate', label: 'Associate' }
  ];

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Search Input */}
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search users
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg> */}
          </div>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search users by name, email, phone, or role..."
          />
        </div>
      </div>

      {/* Role Filter */}
      <div className="sm:w-48">
        <label htmlFor="role-filter" className="sr-only">
          Filter by role
        </label>
        <select
          id="role-filter"
          value={selectedRole || ''}
          onChange={(e) => onRoleFilterChange(e.target.value as UserRole || undefined)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;

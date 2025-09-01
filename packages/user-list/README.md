# user-list

A reusable React component for displaying and managing user lists with search, filtering, and pagination capabilities, built with TypeScript and TailwindCSS.

## 🚀 Features

- **Real-time Search**: Search users by name, email, phone, or role
- **Role-based Filtering**: Filter users by role (Admin, Supervisor, Associate)
- **Pagination**: Configurable pagination with page size options
- **Role-based Actions**: Dynamic action buttons based on user permissions
- **Responsive Design**: Mobile-first design using TailwindCSS
- **TypeScript Support**: Full type safety and IntelliSense
- **Accessibility**: ARIA labels and keyboard navigation

## 📦 Installation

```bash
npm install user-list
```

## 🎯 Usage

### Basic Usage

```tsx
import { UserList, User, UserRole } from 'user-list';

const MyComponent = () => {
  const users: User[] = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'admin',
      addresses: [],
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }
  ];

  const handleView = (user: User) => {
    console.log('View user:', user);
  };

  const handleEdit = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
  };

  return (
    <UserList
      users={users}
      role="admin"
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
```

### Advanced Usage

```tsx
import { UserList, User, UserRole } from 'user-list';

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserRole: UserRole = 'supervisor';

  const handleView = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handleEdit = (user: User) => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <UserList
        users={users}
        role={currentUserRole}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};
```

## 📋 Props

### UserListProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `users` | `User[]` | Yes | - | Array of users to display |
| `role` | `UserRole` | Yes | - | Current user's role for permissions |
| `onView` | `(user: User) => void` | No | - | View user handler |
| `onEdit` | `(user: User) => void` | No | - | Edit user handler |
| `onDelete` | `(userId: string) => void` | No | - | Delete user handler |
| `isLoading` | `boolean` | No | `false` | Loading state |
| `className` | `string` | No | `''` | Additional CSS classes |

## 📊 Data Types

### User

```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}
```

### UserRole

```typescript
type UserRole = 'admin' | 'supervisor' | 'associate';
```

### Address

```typescript
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
```

## 🎨 Styling

The component uses TailwindCSS classes and can be customized with additional CSS classes via the `className` prop.

### Custom Styling

```tsx
<UserList
  users={users}
  role="admin"
  onView={handleView}
  className="custom-user-list bg-gray-50 p-4 rounded-lg"
/>
```

## 🔍 Search & Filtering

### Search Functionality

The component includes real-time search across multiple fields:

- **Full Name**: Partial matching
- **Email**: Partial matching
- **Phone**: Partial matching
- **Role**: Exact matching

### Role-based Filtering

Users can be filtered by role:

- **All Roles**: Shows all users
- **Admin**: Shows only admin users
- **Supervisor**: Shows only supervisor users
- **Associate**: Shows only associate users

### Search Example

```tsx
// Search for "john" will match:
// - Full Name: "John Doe"
// - Email: "john@example.com"
// - Phone: "123-456-7890"
// - Role: "admin" (if searching "admin")
```

## 📄 Pagination

### Pagination Features

- **Configurable Page Size**: Default 10 items per page
- **Page Navigation**: Previous/Next buttons
- **Page Numbers**: Direct page navigation
- **Results Summary**: Shows current page range and total

### Pagination Example

```tsx
// With 25 users and page size of 10:
// Page 1: Users 1-10
// Page 2: Users 11-20
// Page 3: Users 21-25
```

## 🔐 Role-based Permissions

### Permission Matrix

| Current User Role | Can View | Can Edit | Can Delete |
|------------------|----------|----------|------------|
| Admin | All users | All users | Non-admin users |
| Supervisor | All users | Non-admin users | None |
| Associate | Own profile only | Own profile only | None |

### Action Button Visibility

Action buttons are automatically shown/hidden based on:

1. **Current user's role**
2. **Target user's role**
3. **Whether the target user is the current user**

## 🧪 Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserList } from 'user-list';

const mockUsers = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    role: 'admin',
    addresses: [],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];

test('renders user list with search functionality', () => {
  const handleView = jest.fn();
  
  render(
    <UserList
      users={mockUsers}
      role="admin"
      onView={handleView}
    />
  );
  
  expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### Search Testing

```tsx
test('filters users based on search term', () => {
  const handleView = jest.fn();
  
  render(
    <UserList
      users={mockUsers}
      role="admin"
      onView={handleView}
    />
  );
  
  const searchInput = screen.getByPlaceholderText(/search users/i);
  fireEvent.change(searchInput, { target: { value: 'john' } });
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  
  fireEvent.change(searchInput, { target: { value: 'jane' } });
  expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
});
```

## 🔧 Customization

### Custom Search Logic

You can extend the search functionality by using the exported `SearchService`:

```tsx
import { SearchService } from 'user-list';

const customSearch = (users: User[], searchTerm: string) => {
  // Add custom search logic
  return users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
```

### Custom Pagination

The component includes built-in pagination, but you can customize it:

```tsx
// The component handles pagination internally
// Page size is configurable via the component's internal state
// Default page size is 10 items per page
```

## 🚀 Development

### Building the Package

```bash
npm run build
```

### Running Tests

```bash
npm run test
npm run test:coverage
```

### Development Mode

```bash
npm run dev
```

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📚 Examples

### Read-only List

```tsx
<UserList
  users={users}
  role="associate"
  onView={handleView}
  // No edit or delete handlers for read-only access
/>
```

### Admin Management Interface

```tsx
<UserList
  users={users}
  role="admin"
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  className="admin-user-list"
/>
```

### Loading State

```tsx
<UserList
  users={[]}
  role="admin"
  isLoading={true}
  onView={handleView}
/>
```

### Empty State

```tsx
// When no users match the search criteria
<UserList
  users={[]}
  role="admin"
  onView={handleView}
/>
// Shows "No users found" message with helpful text
```

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**

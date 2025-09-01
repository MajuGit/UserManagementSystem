# User Profile Management System

A comprehensive React + TypeScript role-based user profile management system with reusable NPM packages, built with modern web technologies and best practices.

## 🚀 Features

### Core Features
- **Role-based Authentication**: Admin, Supervisor, and Associate roles with different permissions
- **User Profile Management**: Create, edit, view, and delete user profiles
- **Dynamic Address Management**: Add, edit, and remove multiple addresses per user
- **Form Validation**: Comprehensive client-side validation with TypeScript
- **Data Persistence**: LocalStorage-based data storage with proper error handling
- **Responsive Design**: Mobile-first design using TailwindCSS

### Role-based Permissions
- **Admin**: Full access (Create, Edit, View, Delete Users)
- **Supervisor**: Edit & View Users only (cannot create or delete)
- **Associate**: View own profile only

### Reusable NPM Packages
1. **user-profile-form**: Dynamic form component with address management
2. **user-list**: Searchable and paginated user list component

## 🏗️ Project Structure

```
packages/
├── user-profile-form/     # Reusable NPM Package 1
│   ├── src/
│   │   ├── components/    # Form components
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Validation utilities
│   │   └── tests/         # Unit tests
│   ├── package.json
│   └── README.md
├── user-list/            # Reusable NPM Package 2
│   ├── src/
│   │   ├── components/    # List components
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Search utilities
│   │   └── tests/         # Unit tests
│   ├── package.json
│   └── README.md
app/                      # Main Application
├── src/
│   ├── context/          # AuthContext, UserContext
│   ├── pages/            # Login, Dashboard, Profile pages
│   ├── routes/           # Protected routes, role-based routing
│   ├── components/       # Layout, Navigation components
│   ├── utils/            # LocalStorage, validation helpers
│   ├── types/            # TypeScript interfaces
│   └── tests/            # Unit tests
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + React Router DOM
- **Styling**: TailwindCSS with responsive design
- **State Management**: React Context API
- **Testing**: React Testing Library + Jest
- **Build**: Vite with proper TypeScript configuration
- **Package Management**: NPM workspaces

## 📦 Installation & Setup

### Prerequisites
- Node.js >= 18.0.0
- NPM >= 8.0.0

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-profile-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Build packages**
   ```bash
   cd packages/user-profile-form && npm run build
   cd ../user-list && npm run build
   cd ../../app
   ```

4. **Start development server**
   ```bash
   Ctrl + C  # stop the server
   rm -rf node_modules/.vite   #delete .vite and dist cache
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

Use these credentials to test different roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Supervisor | supervisor@company.com | supervisor123 |
| Associate | associate@company.com | associate123 |

## 🧪 Testing

### Run all tests
```bash
npm run test
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm run test:watch
```

## 📚 Package Documentation

### user-profile-form Package

A reusable React component for user profile forms with dynamic address management.

**Features:**
- Three modes: create, edit, view
- Dynamic address fields (add/remove)
- Comprehensive form validation
- TypeScript support
- Responsive design

**Usage:**
```tsx
import { UserProfileForm } from 'user-profile-form';

<UserProfileForm
  mode="create"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={false}
/>
```

### user-list Package

A reusable React component for displaying and managing user lists with search and pagination.

**Features:**
- Real-time search functionality
- Role-based filtering
- Pagination with configurable page size
- Role-based action buttons
- TypeScript support

**Usage:**
```tsx
import { UserList } from 'user-list';

<UserList
  users={users}
  role={currentUser.role}
  onEdit={handleEdit}
  onView={handleView}
  onDelete={handleDelete}
/>
```

## 🎯 Key Features Implementation

### Authentication System
- Context API-based state management
- Role-based route protection
- Session persistence with LocalStorage
- 403 Forbidden page for unauthorized access

### User Profile Management
- Dynamic form with validation
- Multiple address management
- Role-based permissions
- Real-time form validation

### Navigation Structure
- Role-based menu items
- Responsive mobile navigation
- Active link highlighting
- Breadcrumb navigation

### Data Persistence
- LocalStorage implementation
- CRUD operations with error handling
- Data validation before storage
- Automatic data recovery

## 🧪 Testing Strategy

- **Unit Tests**: Component behavior, utility functions
- **Integration Tests**: Form submission, data flow
- **Coverage**: Minimum 80% code coverage
- **Test Types**: Props validation, user interactions, error handling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

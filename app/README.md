# User Profile Management System - Main Application

The main React application for the User Profile Management System, featuring role-based authentication, user profile management, and integration with reusable NPM packages.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- NPM >= 8.0.0

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Supervisor | supervisor@company.com | supervisor123 |
| Associate | associate@company.com | associate123 |

## 📁 Project Structure

```
src/
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication state management
│   └── UserContext.tsx   # User data management
├── pages/                # Application pages
│   ├── LoginPage.tsx     # Authentication page
│   ├── DashboardPage.tsx # Main dashboard
│   ├── CreateProfilePage.tsx # User creation
│   ├── UsersListPage.tsx # User management
│   ├── ProfilePage.tsx   # Profile viewing/editing
│   ├── ForbiddenPage.tsx # 403 error page
│   └── NotFoundPage.tsx  # 404 error page
├── routes/               # Routing configuration
│   ├── AppRoutes.tsx     # Main routing setup
│   └── ProtectedRoute.tsx # Route protection
├── components/           # Reusable components
│   ├── Layout.tsx        # Main layout wrapper
│   └── Navigation.tsx    # Navigation component
├── utils/                # Utility functions
│   ├── localStorage.ts   # LocalStorage operations
│   └── validation.ts     # Form validation
├── types/                # TypeScript definitions
│   └── index.ts          # Main type definitions
└── tests/                # Test files
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=User Profile Management System
VITE_API_URL=http://localhost:3000
```

### Build Configuration
The application uses Vite for building. Configuration can be found in `vite.config.ts`.

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

### Test Structure
- Unit tests for components
- Integration tests for user flows
- Context provider tests
- Utility function tests

## 📦 Dependencies

### Core Dependencies
- React 18
- React Router DOM
- TypeScript
- TailwindCSS

### Development Dependencies
- Vite
- Jest
- React Testing Library
- ESLint

### Local Package Dependencies
- `user-profile-form` - Form component package
- `user-list` - List component package

## 🎯 Key Features

### Authentication System
- Role-based authentication (Admin, Supervisor, Associate)
- Session persistence with LocalStorage
- Protected routes with role-based access control
- Login/logout functionality

### User Management
- Create new user profiles
- Edit existing profiles
- View user details
- Delete users (admin only)
- Role-based permissions

### Navigation
- Responsive navigation menu
- Role-based menu items
- Active link highlighting
- Mobile-friendly design

### Data Persistence
- LocalStorage-based data storage
- CRUD operations for user data
- Error handling and validation
- Data recovery mechanisms

## 🔒 Security Features

- Role-based access control
- Protected routes
- Form validation
- Input sanitization
- Session management

## 📱 Responsive Design

The application is built with a mobile-first approach using TailwindCSS:

- Responsive navigation
- Mobile-friendly forms
- Adaptive layouts
- Touch-friendly interactions

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- Static hosting (Netlify, Vercel)
- Docker containerization
- Traditional web server

## 🐛 Troubleshooting

### Common Issues

1. **Package not found errors**
   - Ensure local packages are built: `cd packages/user-profile-form && npm run build`
   - Reinstall dependencies: `npm install`

2. **TypeScript errors**
   - Check TypeScript configuration in `tsconfig.json`
   - Ensure all type definitions are properly imported

3. **Styling issues**
   - Verify TailwindCSS configuration
   - Check for CSS conflicts

### Getting Help

1. Check the console for error messages
2. Review the browser's developer tools
3. Check the test suite for failing tests
4. Open an issue in the repository

## 📄 License

This project is licensed under the MIT License.

---

**Part of the User Profile Management System**

# user-profile-form

A reusable React component for user profile forms with dynamic address management, built with TypeScript and TailwindCSS.

## 🚀 Features

- **Three Form Modes**: Create, Edit, and View modes
- **Dynamic Address Management**: Add, edit, and remove multiple addresses
- **Comprehensive Validation**: Client-side validation with TypeScript
- **Responsive Design**: Mobile-first design using TailwindCSS
- **TypeScript Support**: Full type safety and IntelliSense
- **Accessibility**: ARIA labels and keyboard navigation

## 📦 Installation

```bash
npm install user-profile-form
```

## 🎯 Usage

### Basic Usage

```tsx
import { UserProfileForm, UserFormData } from 'user-profile-form';

const MyComponent = () => {
  const handleSubmit = (data: UserFormData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  const handleCancel = () => {
    // Handle cancel action
  };

  return (
    <UserProfileForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={false}
    />
  );
};
```

### Advanced Usage

```tsx
import { UserProfileForm, UserFormData, FormMode } from 'user-profile-form';

const ProfileEditor = ({ user, onSave, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      await onSave(data);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserProfileForm
      mode="edit"
      initialData={{
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses
      }}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      className="max-w-2xl mx-auto"
    />
  );
};
```

## 📋 Props

### UserProfileFormProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `mode` | `'create' \| 'edit' \| 'view'` | Yes | - | Form mode |
| `initialData` | `UserFormData` | No | - | Initial form data |
| `onSubmit` | `(data: UserFormData) => void` | Yes | - | Submit handler |
| `onCancel` | `() => void` | No | - | Cancel handler |
| `isLoading` | `boolean` | No | `false` | Loading state |
| `className` | `string` | No | `''` | Additional CSS classes |

## 📊 Data Types

### UserFormData

```typescript
interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  addresses: Address[];
}
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

### FormMode

```typescript
type FormMode = 'create' | 'edit' | 'view';
```

## 🎨 Styling

The component uses TailwindCSS classes and can be customized with additional CSS classes via the `className` prop.

### Custom Styling

```tsx
<UserProfileForm
  mode="create"
  onSubmit={handleSubmit}
  className="bg-gray-50 p-6 rounded-lg shadow-lg"
/>
```

## ✅ Validation

The component includes comprehensive client-side validation:

### Field Validation Rules

- **Full Name**: Required, 2-100 characters
- **Email**: Required, valid email format
- **Phone**: Required, valid phone number format
- **Addresses**: At least one address required
- **Address Fields**: All fields required, valid zip code format

### Validation Errors

Validation errors are displayed inline with the form fields and include:

- Field-specific error messages
- Real-time validation feedback
- Form-level validation summary

## 🔧 Customization

### Custom Validation

You can extend the validation by using the exported `ValidationService`:

```tsx
import { ValidationService } from 'user-profile-form';

const customValidation = (data: UserFormData) => {
  const result = ValidationService.validateUserForm(data);
  
  // Add custom validation logic
  if (data.fullName.includes('admin')) {
    result.errors.push({
      field: 'fullName',
      message: 'Admin is a reserved word'
    });
    result.isValid = false;
  }
  
  return result;
};
```

### Custom Address Fields

The component supports dynamic address management with add/remove functionality:

- Add multiple addresses
- Remove addresses (minimum one required)
- Individual address validation
- Address field validation

## 🧪 Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfileForm } from 'user-profile-form';

test('renders form in create mode', () => {
  const handleSubmit = jest.fn();
  
  render(
    <UserProfileForm
      mode="create"
      onSubmit={handleSubmit}
    />
  );
  
  expect(screen.getByText('Basic Information')).toBeInTheDocument();
  expect(screen.getByText('Addresses')).toBeInTheDocument();
});
```

### Form Submission Testing

```tsx
test('submits form with valid data', async () => {
  const handleSubmit = jest.fn();
  
  render(
    <UserProfileForm
      mode="create"
      onSubmit={handleSubmit}
    />
  );
  
  // Fill form fields
  fireEvent.change(screen.getByLabelText('Full Name *'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.change(screen.getByLabelText('Email *'), {
    target: { value: 'john@example.com' }
  });
  
  // Submit form
  fireEvent.click(screen.getByText('Create Profile'));
  
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      fullName: 'John Doe',
      email: 'john@example.com'
    })
  );
});
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

### View Mode Example

```tsx
<UserProfileForm
  mode="view"
  initialData={userData}
  className="readonly-form"
/>
```

### Edit Mode with Loading State

```tsx
<UserProfileForm
  mode="edit"
  initialData={userData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={isSaving}
/>
```

### Create Mode with Custom Styling

```tsx
<UserProfileForm
  mode="create"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  className="custom-form-styles"
/>
```

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**

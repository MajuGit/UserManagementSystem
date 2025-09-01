export type FormMode = 'create' | 'edit' | 'view';
export type UserRole = 'admin' | 'supervisor' | 'associate';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  //role: UserRole;
  role:string,
  addresses: Address[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface UserProfileFormProps {
  mode: FormMode;
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

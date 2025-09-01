import React, { useState, useEffect } from 'react';
import { UserProfileFormProps, UserFormData, Address, ValidationError } from '../types';
import { ValidationService } from '../utils/validation';
import AddressField from './AddressField';
import { UserRole  } from '../types';

 const UserProfileForm: React.FC<UserProfileFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    email: '',
    phone: '',
    role:'',
    addresses: [{ id: '1', street: '', city: '', state: '', zipCode: '' }]
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleFieldChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Mark field as touched
    setTouched(prev => new Set(prev).add(field));
    
    // Clear error for this field
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleAddressUpdate = (index: number, address: Address) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => i === index ? address : addr)
    }));
  };

  const handleAddressRemove = (index: number) => {
    if (formData.addresses.length > 1) {
      setFormData(prev => ({
        ...prev,
        addresses: prev.addresses.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      street: '',
      city: '',
      state: '',
      zipCode: ''
    };
    
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ['fullName', 'email', 'phone','role', 'addresses'];
    setTouched(new Set(allFields));
    
    // Validate form
    const validation = ValidationService.validateUserForm(formData);
    setErrors(validation.errors);
    
    if (validation.isValid) {
      onSubmit(formData);
    }
  };

  const getFieldError = (field: string) => {
    return ValidationService.getFieldError(errors, field);
  };

  const hasFieldError = (field: string) => {
    return ValidationService.hasFieldError(errors, field);
  };

  const isFieldTouched = (field: string) => {
    return touched.has(field);
  };

  const shouldShowError = (field: string) => {
    return isFieldTouched(field) && hasFieldError(field);
  };

  const isReadOnly = mode === 'view';

   const roles: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'associate', label: 'Associate' }
  ];

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                disabled={isReadOnly || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  shouldShowError('fullName') ? 'border-red-300' : 'border-gray-300'
                } ${isReadOnly ? 'bg-gray-100' : ''}`}
                placeholder="Enter full name"
              />
              {shouldShowError('fullName') && (
                <p className="text-red-600 text-sm mt-1">{getFieldError('fullName')}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                disabled={isReadOnly || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  shouldShowError('email') ? 'border-red-300' : 'border-gray-300'
                } ${isReadOnly ? 'bg-gray-100' : ''}`}
                placeholder="Enter email address"
              />
              {shouldShowError('email') && (
                <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone * 
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                disabled={isReadOnly || isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  shouldShowError('phone') ? 'border-red-300' : 'border-gray-300'
                } ${isReadOnly ? 'bg-gray-100' : ''}`}
                placeholder="Enter phone number"
              />
              {shouldShowError('phone') && (
                <p className="text-red-600 text-sm mt-1">{getFieldError('phone')}</p>
              )}
            </div>

              {/* role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
          id="role-filter"
          value={formData.role}
          onChange={(e) => handleFieldChange('role', e.target.value)}
          required              
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${isReadOnly ? 'bg-gray-100' : ''}`}
        >
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Addresses</h3>
            {!isReadOnly && (
              <button
                type="button"
                onClick={handleAddAddress}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Add Address
              </button>
            )}
          </div>

          {formData.addresses.map((address, index) => (
            <AddressField
              key={address.id}
              address={address}
              index={index}
              errors={errors}
              isReadOnly={isReadOnly}
              onUpdate={handleAddressUpdate}
              onRemove={handleAddressRemove}
            />
          ))}

          {shouldShowError('addresses') && (
            <p className="text-red-600 text-sm mt-2">{getFieldError('addresses')}</p>
          )}
        </div>

        {/* Form Actions */}
        {!isReadOnly && (
          <div className="flex justify-end space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Profile' : 'Update Profile'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfileForm;

import React from 'react';
import { Address, ValidationError } from '../types';
import { ValidationService } from '../utils/validation';

interface AddressFieldProps {
  address: Address;
  index: number;
  errors: ValidationError[];
  isReadOnly?: boolean;
  onUpdate: (index: number, address: Address) => void;
  onRemove: (index: number) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({
  address,
  index,
  errors,
  isReadOnly = false,
  onUpdate,
  onRemove
}) => {
  const handleFieldChange = (field: keyof Address, value: string) => {
    const updatedAddress = { ...address, [field]: value };
    onUpdate(index, updatedAddress);
  };

  const getFieldError = (field: string) => {
    return ValidationService.getFieldError(errors, `addresses[${index}].${field}`);
  };

  const hasFieldError = (field: string) => {
    return ValidationService.hasFieldError(errors, `addresses[${index}].${field}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-gray-900">Address {index + 1}</h4>
        {!isReadOnly && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Street Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleFieldChange('street', e.target.value)}
            disabled={isReadOnly}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldError('street') ? 'border-red-300' : 'border-gray-300'
            } ${isReadOnly ? 'bg-gray-100' : ''}`}
            placeholder="Enter street address"
          />
          {getFieldError('street') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('street')}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            disabled={isReadOnly}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldError('city') ? 'border-red-300' : 'border-gray-300'
            } ${isReadOnly ? 'bg-gray-100' : ''}`}
            placeholder="Enter city"
          />
          {getFieldError('city') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('city')}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => handleFieldChange('state', e.target.value)}
            disabled={isReadOnly}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldError('state') ? 'border-red-300' : 'border-gray-300'
            } ${isReadOnly ? 'bg-gray-100' : ''}`}
            placeholder="Enter state"
          />
          {getFieldError('state') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('state')}</p>
          )}
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code
          </label>
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => handleFieldChange('zipCode', e.target.value)}
            disabled={isReadOnly}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldError('zipCode') ? 'border-red-300' : 'border-gray-300'
            } ${isReadOnly ? 'bg-gray-100' : ''}`}
            placeholder="Enter zip code"
          />
          {getFieldError('zipCode') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('zipCode')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressField;

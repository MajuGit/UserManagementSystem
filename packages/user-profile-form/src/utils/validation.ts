import { UserFormData, Address, ValidationError, ValidationResult } from '../types';

export class ValidationService {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  static validateZipCode(zipCode: string): boolean {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  }

  static validateRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  static validateMinLength(value: string, minLength: number): boolean {
    return value.trim().length >= minLength;
  }

  static validateMaxLength(value: string, maxLength: number): boolean {
    return value.trim().length <= maxLength;
  }

  static validateAddress(address: Address): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!this.validateRequired(address.street)) {
      errors.push({ field: 'street', message: 'Street address is required' });
    }

    if (!this.validateRequired(address.city)) {
      errors.push({ field: 'city', message: 'City is required' });
    }

    if (!this.validateRequired(address.state)) {
      errors.push({ field: 'state', message: 'State is required' });
    }

    if (!this.validateRequired(address.zipCode)) {
      errors.push({ field: 'zipCode', message: 'Zip code is required' });
    } else if (!this.validateZipCode(address.zipCode)) {
      errors.push({ field: 'zipCode', message: 'Please enter a valid zip code' });
    }

    return errors;
  }

  static validateUserForm(formData: UserFormData): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate full name
    if (!this.validateRequired(formData.fullName)) {
      errors.push({ field: 'fullName', message: 'Full name is required' });
    } else if (!this.validateMinLength(formData.fullName, 2)) {
      errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters' });
    } else if (!this.validateMaxLength(formData.fullName, 100)) {
      errors.push({ field: 'fullName', message: 'Full name must be less than 100 characters' });
    }

    // Validate email
    if (!this.validateRequired(formData.email)) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!this.validateEmail(formData.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    // Validate phone
    if (!this.validateRequired(formData.phone)) {
      errors.push({ field: 'phone', message: 'Phone number is required' });
    } else if (!this.validatePhone(formData.phone)) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }

    // Validate addresses
    if (formData.addresses.length === 0) {
      errors.push({ field: 'addresses', message: 'At least one address is required' });
    } else {
      formData.addresses.forEach((address, index) => {
        const addressErrors = this.validateAddress(address);
        addressErrors.forEach(error => {
          errors.push({
            field: `addresses[${index}].${error.field}`,
            message: error.message
          });
        });
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static getFieldError(errors: ValidationError[], field: string): string | undefined {
    return errors.find(error => error.field === field)?.message;
  }

  static hasFieldError(errors: ValidationError[], field: string): boolean {
    return errors.some(error => error.field === field);
  }
}

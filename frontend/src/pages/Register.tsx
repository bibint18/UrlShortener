
import React, { useState } from 'react';
import { authService } from '../api/authService';
import { Form } from '../components/common/Form';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getErrorMessage } from '../utils/error.utils';
import { VerifyOtp } from './VerifyOtp';
import toast from 'react-hot-toast'
export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified,setIsEmailVerified] = useState(false)
  // const navigate = useNavigate();


  const noSpacesRegex = /^\S*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!noSpacesRegex.test(value)) return 'Email cannot contain spaces';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!noSpacesRegex.test(value)) return 'Password cannot contain spaces';
        if (!passwordRegex.test(value)) {
          return 'Password must be at least 6 characters and include one uppercase letter, one lowercase letter, one number, and one special character';
        }
        return '';
      case 'confirmPassword':
        if (!value) return 'Confirm password is required';
        if (!noSpacesRegex.test(value)) return 'Confirm password cannot contain spaces';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Validate on change for immediate feedback
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await authService.register(formData);
      // navigate('/verify-otp', { state: { email: formData.email } });
      toast.success("Otp Sent Succesfully")
      setIsEmailVerified(true)
    } catch (err) {
      setErrors({ ...errors, email: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailVerified) {
    return (
      <VerifyOtp
        fullName={formData.fullName}
        email={formData.email}
        password={formData.password}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          error={errors.fullName}
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};
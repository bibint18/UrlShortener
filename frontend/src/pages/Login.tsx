import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../api/authService';
import { setCredentials } from '../redux/slices/authSlice';
import { Form } from '../components/common/Form';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getErrorMessage } from '../utils/error.utils';
import { store, type RootState } from '../redux/store';
import GoogleLoginButton from '../components/Google/GoogleLoginButton';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors,setErrors] = useState({email:'',password:''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state:RootState)=> state.auth)

  useEffect(() => {
    if(user){
      navigate('/dashboard')
    }
  },[user,navigate])

    const validateField = (name: string, value: string): string => {
    if (!value.trim()) return `${name[0].toUpperCase() + name.slice(1)} is required`;
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({...errors,[name]:validateField(name,value)})
  };

    const validateForm = (): boolean => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await authService.login(formData);
      console.log('Login response.data:', response.data);
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
      console.log('Credentials dispatched, state:', store.getState());
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <GoogleLoginButton />
    </div>
  );
};
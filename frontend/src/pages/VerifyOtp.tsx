import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../api/authService';
import { Form } from '../components/common/Form';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { getErrorMessage } from '../utils/error.utils';
interface VerifyOtpProps {
  fullName: string;
  email: string;
  password: string;
}

export const VerifyOtp: React.FC<VerifyOtpProps> = ({fullName,email,password}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || !/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await authService.verifyOtp({fullName,email,password,otp });
      navigate('/login');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <p className="mb-4">An OTP has been sent to {email}</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          error={error.includes('otp') ? 'Invalid OTP' : ''}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </Form>
      <p className="mt-4 text-center text-gray-600">
        Resend OTP in {timer}s
      </p>
      <Button
      
        disabled={resendDisabled || isLoading}
        className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
      >
        {isLoading ? 'Resending...' : 'Resend OTP'}
      </Button>
    </div>
  );
};
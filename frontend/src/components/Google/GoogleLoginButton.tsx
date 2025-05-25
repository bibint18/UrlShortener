import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../redux/slices/authSlice';
import axiosInstance from '../../api/axiosInstance';

const GoogleLoginButton = () => {
  const dispatch = useDispatch()
  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    try {
      const response = await axiosInstance.post('/api/auth/google-login', {
        idToken: credentialResponse.credential,
      });
      const { accessToken, refreshToken, user } = response.data.data;
      dispatch(
              setCredentials({
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
              }),
            );
      window.location.href = '/dashboard';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error('Google Login Error');
          toast.error('Google login failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
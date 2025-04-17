
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/buttonShadcn';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  // Authentication states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Forgot password states
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { 
    login, 
    loading, 
    isAuthenticated,
    forgotPassword,
    verifyOtp,
    resetPassword 
  } = useAuth();
  
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = await login(email, password);
    
    if (success) {
      navigate('/dashboard');
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    const success = await forgotPassword(email);
    
    if (success) {
      setOtpMode(true);
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    
    const success = await verifyOtp(otp);
    
    if (success) {
      setOtpMode(false);
      setResetPasswordMode(true);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = await resetPassword(newPassword);
    
    if (success) {
      setResetPasswordMode(false);
      setForgotPasswordMode(false);
      setEmail('');
      setPassword('');
    }
  };
  
  // Reset form when switching between login and forgot password
  const toggleForgotPassword = () => {
    setError('');
    setForgotPasswordMode(!forgotPasswordMode);
    setOtpMode(false);
    setResetPasswordMode(false);
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  // Helper function to render the back button
  const renderBackButton = () => (
    <Button 
      type="button"
      variant="ghost"
      className="absolute left-4 top-4"
      onClick={toggleForgotPassword}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Login
    </Button>
  );
  
  // Render the forgot password form
  if (forgotPasswordMode) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] px-4 py-12 sm:px-6 lg:px-8 relative">
          {renderBackButton()}
          
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="w-auto h-12 mx-auto" src="/dut-logo.png" alt="DUT Logo" />
              <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                {otpMode 
                  ? 'Enter OTP' 
                  : resetPasswordMode 
                    ? 'Reset Your Password'
                    : 'Reset Password'}
              </h2>
              <p className="mt-2 text-sm text-center text-gray-600">
                {otpMode 
                  ? 'We sent a verification code to your email' 
                  : resetPasswordMode 
                    ? 'Create a new password for your account'
                    : 'Enter your email to receive a password reset code'}
              </p>
            </div>
            
            {error && (
              <div className="p-3 text-sm font-medium text-white bg-red-500 rounded-md">
                {error}
              </div>
            )}
            
            {!otpMode && !resetPasswordMode && (
              <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </Button>
                </div>
              </form>
            )}
            
            {otpMode && (
              <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1"
                    placeholder="Enter the 6-digit code"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </div>
              </form>
            )}
            
            {resetPasswordMode && (
              <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <Input
                      id="new-password"
                      name="new-password"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Layout>
    );
  }
  
  // Render the login form
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="w-auto h-12 mx-auto" src="/dut-logo.png" alt="DUT Logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary/90">
                create a new account
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm font-medium text-white bg-red-500 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <button 
                  type="button"
                  onClick={toggleForgotPassword}
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                <span className="sr-only">Sign in with Google</span>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                <span className="sr-only">Sign in with Microsoft</span>
                Microsoft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

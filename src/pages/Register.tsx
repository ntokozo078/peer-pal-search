
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/buttonShadcn';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('tutee');
  const [error, setError] = useState('');
  
  const { register, loading, isAuthenticated } = useAuth();
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
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = await register(email, password, name, role);
    
    if (success) {
      navigate('/dashboard');
    }
  };
  
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="w-auto h-12 mx-auto" src="/dut-logo.png" alt="DUT Logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/90">
                sign in to your existing account
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  placeholder="Full name"
                />
              </div>
              
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="Password"
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                  placeholder="Confirm password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  I want to register as
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="tutee"
                      name="role"
                      type="radio"
                      value="tutee"
                      checked={role === 'tutee'}
                      onChange={() => setRole('tutee')}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="tutee" className="block ml-2 text-sm text-gray-900">
                      Student (I need tutoring)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="tutor"
                      name="role"
                      type="radio"
                      value="tutor"
                      checked={role === 'tutor'}
                      onChange={() => setRole('tutor')}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="tutor" className="block ml-2 text-sm text-gray-900">
                      Tutor (I want to help others)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <p className="mt-2 text-xs text-center text-gray-600">
              By signing up, you agree to our{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/90">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/90">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

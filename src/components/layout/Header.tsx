
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import Button from '@/components/ui/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <Link to="/" className="flex items-center">
          <img 
            src="/dut-logo.png" 
            alt="DUT Logo" 
            className="w-auto h-10 mr-2" 
          />
          <span className="hidden text-xl font-bold md:inline-block">
            DUT Peer Tutoring
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/search" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Find Tutors
              </Link>
              <Link 
                to="/schedule" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Schedule
              </Link>
              <Link 
                to="/resources" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Resources
              </Link>
              <div className="relative ml-3">
                <Link 
                  to="/profile" 
                  className="flex items-center"
                >
                  <span className="mr-2 text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium uppercase text-gray-700">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      user?.name.charAt(0)
                    )}
                  </div>
                </Link>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="p-2 md:hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

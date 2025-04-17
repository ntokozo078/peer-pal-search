
import { create } from 'zustand';
import { User, UserRole } from '@/types';
import { findUserByEmail, tutors, tutees } from './mock-data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = findUserByEmail(email);
      
      if (user && password === 'password') { // Simple mock password check
        set({ user, isAuthenticated: true, loading: false });
        return true;
      } else {
        set({ error: 'Invalid email or password', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'An error occurred during login', loading: false });
      return false;
    }
  },
  
  register: async (email, password, name, role) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = findUserByEmail(email);
      
      if (existingUser) {
        set({ error: 'User with this email already exists', loading: false });
        return false;
      }
      
      // Create a new user
      const newUser: User = {
        id: `new-${Date.now()}`,
        email,
        name,
        role,
        createdAt: new Date(),
      };
      
      // In a real app, we would save the user to the database
      // Here we're just setting the state
      set({ user: newUser, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ error: 'An error occurred during registration', loading: false });
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

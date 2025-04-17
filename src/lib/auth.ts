
import { create } from 'zustand';
import { User, UserRole } from '@/types';
import { 
  findUserByEmail, 
  addUser, 
  addUserCredentials, 
  findUserCredentials 
} from './mock-data';
import { toast } from '@/components/ui/use-toast';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  resetPasswordEmail: string | null;
  resetPasswordOtp: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resetPassword: (newPassword: string) => Promise<boolean>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  resetPasswordEmail: null,
  resetPasswordOtp: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const credentials = findUserCredentials(email);
      const user = findUserByEmail(email);
      
      if (user && credentials && credentials.password === password) {
        set({ user, isAuthenticated: true, loading: false });
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
        return true;
      } else {
        set({ error: 'Invalid email or password', loading: false });
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      set({ error: 'An error occurred during login', loading: false });
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  },
  
  register: async (email, password, name, role) => {
    set({ loading: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingUser = findUserByEmail(email);
      
      if (existingUser) {
        set({ error: 'User with this email already exists', loading: false });
        toast({
          title: "Registration Failed",
          description: "A user with this email already exists.",
          variant: "destructive"
        });
        return false;
      }
      
      // Create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role,
        createdAt: new Date(),
        bio: '',
      };
      
      // Add user to the database
      addUser(newUser);
      
      // Store user credentials for later authentication
      addUserCredentials(email, password, newUser.id);
      
      set({ user: newUser, isAuthenticated: true, loading: false });
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      return true;
    } catch (error) {
      set({ error: 'An error occurred during registration', loading: false });
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  },
  
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would verify the email exists and send an OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = findUserByEmail(email);
      
      if (user) {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // In a real app, this would send the OTP via email
        console.log(`OTP for ${email}: ${otp}`);
        
        set({ 
          resetPasswordEmail: email, 
          resetPasswordOtp: otp, 
          loading: false 
        });
        
        toast({
          title: "OTP Sent",
          description: `An OTP has been sent to ${email}. Please check your email.`,
        });
        
        return true;
      } else {
        set({ error: 'No account found with this email', loading: false });
        toast({
          title: "Reset Failed",
          description: "No account found with this email address.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      set({ error: 'An error occurred', loading: false });
      toast({
        title: "Reset Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  },
  
  verifyOtp: async (otp) => {
    const { resetPasswordOtp } = get();
    
    if (otp === resetPasswordOtp) {
      toast({
        title: "OTP Verified",
        description: "Please set your new password.",
      });
      return true;
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  },
  
  resetPassword: async (newPassword) => {
    set({ loading: true });
    
    try {
      // In a real app, this would update the password in the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ 
        resetPasswordEmail: null, 
        resetPasswordOtp: null, 
        loading: false 
      });
      
      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      return true;
    } catch (error) {
      set({ 
        error: 'An error occurred during password reset', 
        loading: false 
      });
      
      toast({
        title: "Reset Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      
      return false;
    }
  },
}));

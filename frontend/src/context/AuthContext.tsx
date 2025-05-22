import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Mock user data
const mockUser: User = {
  id: "user123",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved auth in localStorage
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      setUser(parsedAuth.user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to validate credentials
    // For demo purposes, we'll accept any credentials and use mock data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('auth', JSON.stringify({ user: mockUser }));
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create the user
    // For demo purposes, we'll accept any input and create a mock user
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      ...mockUser,
      name,
      email
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('auth', JSON.stringify({ user: newUser }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  const updateProfile = async (userData: Partial<User>) => {
    // In a real app, this would make an API call to update the user
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('auth', JSON.stringify({ user: updatedUser }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
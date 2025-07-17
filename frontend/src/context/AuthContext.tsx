import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Mock user data
// const mockUser: User = {
//   id: "user123",
//   name: "John Doe",
//   email: "john@example.com",
//   avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
//   phone: "+1 (555) 123-4567",
//   address: {
//     street: "123 Main Street",
//     city: "New York",
//     state: "NY",
//     zipCode: "10001",
//     country: "USA"
//   }
// };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth);
      setUser(parsedAuth.user);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await axios.post("http://localhost:5000/auth/login", { email, password });
    setUser(res.data.user);
    setIsAuthenticated(true);
    localStorage.setItem('auth', JSON.stringify({ user: res.data.user }));
    return res.data.user;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string
  ) => {
    await axios.post("http://localhost:5000/auth/register", {
      name,
      email,
      password,
      address,
      phone_number,
    });
    // setUser(res.data.user);
    // setIsAuthenticated(true);
    // localStorage.setItem('auth', JSON.stringify({ user: res.data.user }));
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
        setUser,
        isAuthenticated,
        isLoading,
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
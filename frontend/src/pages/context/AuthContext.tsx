import React, { createContext, useContext, ReactNode } from "react";
import instanceAxios from "../../utils/instanceAxios";



interface AuthContextType {
  register: (data: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
  }) => Promise<any>;
   login: (data: {
     email: string;
     password: string 
    }) => Promise<any>; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("AuthContext instance:", import.meta.url);

    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const register = async (data: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
  }) => {
    try {
      const res = await instanceAxios.post("auth/register", data);
      return res.data;
    } catch (err: any) {
      throw err.response?.data || err;
    }
  };

  const login = async (data: { email: string; password: string }) => {
  try {
    const res = await instanceAxios.post("auth/login", data);
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

  return (
    <AuthContext.Provider value={{ register,login }}>{children}</AuthContext.Provider>
  );
};

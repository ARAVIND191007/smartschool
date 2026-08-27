'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile_photo?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, User> = {
  'student@smartschool.com': { id: 'S001', name: 'Rahul Sharma', email: 'student@smartschool.com', role: 'STUDENT' },
  'teacher@smartschool.com': { id: 'T001', name: 'Anita Desai', email: 'teacher@smartschool.com', role: 'TEACHER' },
  'parent@smartschool.com': { id: 'P001', name: 'Vikram Sharma', email: 'parent@smartschool.com', role: 'PARENT' },
  'admin@smartschool.com': { id: 'A001', name: 'Admin Principal', email: 'admin@smartschool.com', role: 'ADMIN' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('smartschool_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, you would make an API call here
    // For demo, we just use the mock users
    const mockUser = MOCK_USERS[email.toLowerCase()];

    if (mockUser && mockUser.role === role && password === 'password123') {
      setUser(mockUser);
      localStorage.setItem('smartschool_user', JSON.stringify(mockUser));

      // Redirect to role-specific dashboard
      const roleRoutes: Record<UserRole, string> = {
        STUDENT: '/student',
        TEACHER: '/teacher',
        PARENT: '/parent',
        ADMIN: '/admin',
      };
      router.push(roleRoutes[role]);
    } else {
      throw new Error('Invalid credentials. Check your email, password, and selected role.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartschool_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  subscriptionStatus?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ require2FA: boolean; email?: string }>;
  verify2FA: (email: string, otpCode: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  registerUser: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<{ require2FA: boolean; email?: string }>;
  logout: () => Promise<void>;
  updateProfile: (fullName: string, email: string, currentPassword?: string, newPassword?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  error: string | null;
  setError: (err: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/auth/me');
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
      }
    } catch (err: any) {
      // User is not logged in, ignore error
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string): Promise<{ require2FA: boolean; email?: string }> => {
    try {
      setError(null);
      const res = await api.post('/auth/login', { email, password });
      if (res.data.require2FA) {
        return { require2FA: true, email: res.data.data.email };
      }
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
        if (res.data.data.token) {
          localStorage.setItem('token', res.data.data.token);
        }
      }
      return { require2FA: false };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to sign in. Please check your credentials.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const verify2FA = async (email: string, otpCode: string) => {
    try {
      setError(null);
      const res = await api.post('/auth/verify-2fa', { email, otpCode });
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
        if (res.data.data.token) {
          localStorage.setItem('token', res.data.data.token);
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid or expired verification code.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const googleLogin = async (credential: string) => {
    try {
      setError(null);
      const res = await api.post('/auth/google', { credential });
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
        if (res.data.data.token) {
          localStorage.setItem('token', res.data.data.token);
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Google authentication failed.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const registerUser = async (fullName: string, email: string, password: string, confirmPassword: string): Promise<{ require2FA: boolean; email?: string }> => {
    try {
      setError(null);
      const res = await api.post('/auth/register', { fullName, email, password, confirmPassword });
      if (res.data.require2FA) {
        return { require2FA: true, email: res.data.data.email };
      }
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
        if (res.data.data.token) {
          localStorage.setItem('token', res.data.data.token);
        }
      }
      return { require2FA: false };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create account.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const updateProfile = async (fullName: string, email: string, currentPassword?: string, newPassword?: string) => {
    try {
      setError(null);
      const res = await api.put('/auth/profile', { fullName, email, currentPassword, newPassword });
      if (res.data.success && res.data.data.user) {
        setUser(res.data.data.user);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update profile settings.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verify2FA,
        googleLogin,
        registerUser,
        logout,
        updateProfile,
        refreshUser: fetchCurrentUser,
        error,
        setError,
      }}
    >
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

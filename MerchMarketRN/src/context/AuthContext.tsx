import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getTokens, saveTokens, clearTokens } from '../api/client';

interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  favorite_artist: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: { display_name?: string; favorite_artist?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const tokens = await getTokens();
      if (tokens?.access) {
        try {
          const res = await api.get('/auth/profile/', true);
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            await clearTokens();
          }
        } catch {
          await clearTokens();
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await api.post('/auth/login/', { username, password });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Ошибка входа' };
      await saveTokens({ access: data.access, refresh: data.refresh });
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Сервер недоступен' };
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string, displayName: string) => {
    try {
      const res = await api.post('/auth/register/', { username, email, password, display_name: displayName });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || 'Ошибка регистрации' };
      await saveTokens({ access: data.access, refresh: data.refresh });
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Сервер недоступен' };
    }
  }, []);

  const logout = useCallback(async () => {
    await clearTokens();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profileData: { display_name?: string; favorite_artist?: string }) => {
    const res = await api.put('/auth/profile/', profileData, true);
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

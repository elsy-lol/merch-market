import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://127.0.0.1:8001/api';

interface User {
  username: string;
  display_name?: string;
  favorite_artist?: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string, display_name: string) => Promise<User>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<User>;
  fetchWithAuth: (url: string, options?: Record<string, any>) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const stored = localStorage.getItem('auth_tokens');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  const saveTokens = (t: Tokens | null) => {
    setTokens(t);
    if (t) {
      localStorage.setItem('auth_tokens', JSON.stringify(t));
    } else {
      localStorage.removeItem('auth_tokens');
    }
  };

  const fetchWithAuth = useCallback(async (url: string, options: Record<string, any> = {}) => {
    const headers: Record<string, string> = { ...options.headers };
    if (tokens?.access) {
      headers['Authorization'] = `Bearer ${tokens.access}`;
    }
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const res = await fetch(url, { ...options, headers });
    return res;
  }, [tokens]);

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    saveTokens({ access: data.access, refresh: data.refresh });
    setUser(data.user);
    return data.user;
  };

  const register = async (username: string, email: string, password: string, display_name: string) => {
    const res = await fetch(`${API_BASE}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, display_name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    saveTokens({ access: data.access, refresh: data.refresh });
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    saveTokens(null);
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    const res = await fetchWithAuth(`${API_BASE}/auth/profile/`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Update failed');
    setUser(data.user);
    return data.user;
  };

  const refreshToken = useCallback(async () => {
    if (!tokens?.refresh) return;
    try {
      const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
      const data = await res.json();
      if (res.ok) {
        saveTokens({ ...tokens, access: data.access });
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, [tokens]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!tokens?.access) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetchWithAuth(`${API_BASE}/auth/profile/`);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401) {
          await refreshToken();
          const retry = await fetchWithAuth(`${API_BASE}/auth/profile/`);
          if (retry.ok) {
            const data = await retry.json();
            setUser(data.user);
          } else {
            logout();
          }
        } else {
          logout();
        }
      } catch {
        logout();
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const value: AuthContextType = {
    user,
    tokens,
    loading,
    login,
    register,
    logout,
    updateProfile,
    fetchWithAuth,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, verifyToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      verifyToken(storedToken).then((payload) => {
        if (payload?.user) {
          // Update the argument passed to setUser to ensure the 'passwordHash' property is included
          setUser({ ...payload.user, passwordHash: 'yourValueHere' });
          setToken(storedToken);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


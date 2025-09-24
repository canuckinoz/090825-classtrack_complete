import React, { createContext, useContext, useMemo, useState } from 'react';

type User = {
  userId: string;
  role: 'TEACHER' | 'LEADER' | 'CENTRAL';
  subroles: string[];
  scope: Record<string, unknown>;
  permissions: string[];
};

type AuthCtx = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  hasPermission: (p: string) => boolean;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const setAuth = (u: User, t: string) => {
    setUser(u);
    setToken(t);
  };
  const hasPermission = (p: string) => Boolean(user?.permissions?.includes(p));
  const value = useMemo(
    () => ({ user, token, setAuth, hasPermission }),
    [user, token]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

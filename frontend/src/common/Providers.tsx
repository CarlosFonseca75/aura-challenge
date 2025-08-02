"use client";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => (
  <SessionProvider>{children}</SessionProvider>
);

export { AuthProvider };

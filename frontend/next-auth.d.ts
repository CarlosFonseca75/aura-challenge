import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    accessToken: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    token: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    accessToken: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

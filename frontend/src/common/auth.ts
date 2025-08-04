import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Invalid credentials");

        const { data: user } = data;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }

      // TODO: Add refresh token logic.

      return token;
    },
    async session({ session, token }) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // TODO: Handle a session error.
      }

      const { data: user } = data;

      session.user = {
        id: token.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: { signIn: "/", error: "/" },
};

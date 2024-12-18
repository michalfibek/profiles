import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", email: "admin@example.com", password: "123456" };

        if (credentials?.email === user.email && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

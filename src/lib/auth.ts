import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Role } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET ?? '',
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    
      authorize: async (credentials) => {
        const email = credentials?.email ? String(credentials.email) : undefined;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new Error("Please provide both email & password");
        }

        const user = await prisma.user.findFirst({ where: { email: email } });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await bcrypt.compare(
          password.toString(),
          user.password.toString()
        );

        if (!isMatched) {
          throw new Error("Password did not match");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || Role.USER,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.role) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          if (!user.email) {
            throw new Error("Google account missing email");
          }
          const email = user.email.toLowerCase();
          const name = user.name || "Unknown";

          const alreadyUser = await prisma.user.findUnique({
            where: { email }
          });
          if (!alreadyUser) {
            await prisma.user.create({
              data: {
                name,
                email,
                role: Role.USER
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
  },
});
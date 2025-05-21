import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Role } from "@prisma/client";

// This is a workaround for the NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use JWT strategy for sessions
  session: { strategy: "jwt" },
  
  // Set the secret key for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,
  
  // Use Prisma adapter for database integration
  adapter: PrismaAdapter(prisma),
  
  // Custom pages
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  
  // Configure providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      // Authorization logic
      async authorize(credentials) {
        try {
          console.log("Auth attempt with email:", credentials?.email);
          
          // Check if credentials are provided
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }
          
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
          
          // Check if user exists
          if (!user) {
            console.log("User not found");
            return null;
          }
          
          if (!user.password) {
            console.log("User has no password set");
            return null;
          }
          
          console.log("Found user:", { id: user.id, email: user.email, role: user.role });
          
          // Verify password
          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          
          // Check if password matches
          if (!passwordMatch) {
            console.log("Password does not match");
            return null;
          }
          
          console.log("Authentication successful");
          
          // Return user data
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  
  // Callbacks
  callbacks: {
    // JWT callback - called when JWT is created / updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as Role;
      }
      return token;
    },
    
    // Session callback - called whenever a session is checked
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
})
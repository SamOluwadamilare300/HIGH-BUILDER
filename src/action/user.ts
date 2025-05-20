'use server'

import { signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const login = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    try {
        await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });
    } catch (error) {
        const authError = error as CredentialsSignin;
        return authError.cause;
    }
}

export const register = async (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
        throw new Error("Please fill all fields");
    }

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }  // Correct syntax for findUnique
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER'
            }
        });

        // Sign in the new user
        await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });
        // redirect("/auth/sign-in");
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

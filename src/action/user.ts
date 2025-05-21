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
        // First check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, password: true, role: true }
        });

        if (!user || !user.password) {
            throw new Error("Invalid email or password");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Return success without calling signIn from server action
        // The client will handle the actual sign-in
        return { 
            success: true, 
            message: "Login successful", 
            role: user.role,
            email,
            password 
        };
    } catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An error occurred during login");
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

        // Return success instead of auto sign-in
        return { success: true, message: "Account created successfully!" };
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

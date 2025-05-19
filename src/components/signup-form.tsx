'use client';

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateUserInput, createUserSchema } from "@/lib/user-schema";
import { register } from "@/action/user";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);

      // Call server action
      await register(formData);
      
      // If successful, the server action will handle the redirect
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
      setDebugInfo(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="grid gap-6 w-full max-w-md mx-auto">
      {error && (
        <div className="bg-destructive/15 text-destructive text-center p-2 rounded-md">
          {error}
        </div>
      )}

      {debugInfo && (
        <div className="bg-blue-100 text-blue-800 text-sm p-2 rounded-md overflow-auto">
          <p className="font-bold">Debug Info:</p>
          <pre className="mt-1 whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitHandler)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isLoading}
            {...formRegister("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...formRegister("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...formRegister("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignUp}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline hover:text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
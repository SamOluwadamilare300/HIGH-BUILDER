"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for error parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const errorType = searchParams.get("error")
    const errorCode = searchParams.get("code")
    
    if (errorType) {
      console.log(`Auth error detected: ${errorType}, code: ${errorCode}`)
      let errorMessage = "Authentication failed"
      
      if (errorType === "CredentialsSignin") {
        errorMessage = "Invalid email or password. Please try again."
      }
      
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }, [])

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Attempting login with:", { email })
      
      // First try without redirect to handle errors better
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      console.log("Sign in result:", result)
      
      if (result?.error) {
        setError("Invalid email or password")
        toast.error("Invalid email or password")
      } else if (result?.ok) {
        toast.success("Login successful!")
        // Redirect after successful login
        router.push("/dashboard/user")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      const errorMessage = error.message || "An error occurred during login"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <div className="bg-destructive/15 text-destructive text-center p-2 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleCredentialsLogin} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link href="/auth/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
} 
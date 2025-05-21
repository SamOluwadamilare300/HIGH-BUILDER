"use client"

import { signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  userName: string
  userEmail: string
}

export function DashboardLayout({ 
  children, 
  userRole,
  userName,
  userEmail
}: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      toast.loading("Logging out...")
      await signOut({ redirect: false })
      toast.success("Logged out successfully")
      router.push("/auth/sign-in")
    } catch (error) {
      toast.error("Failed to log out")
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-blue-600" />
        ) : (
          <Menu className="h-6 w-6 text-blue-600" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">HIGH-BUILDER</h1>
            <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
            <div className="mt-2 px-2 py-1 rounded-md bg-blue-50 text-xs font-medium text-blue-700 inline-block">
              {userRole}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link href="/dashboard/user" 
              className={cn(
                "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group transition-all",
                pathname === "/dashboard/user" && "bg-blue-50 text-blue-700"
              )}
            >
              <LayoutDashboard className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" />
              Dashboard
              <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
            </Link>

            {userRole === "ADMIN" && (
              <Link href="/dashboard/admin" 
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 group transition-all",
                  pathname === "/dashboard/admin" && "bg-blue-50 text-blue-700"
                )}
              >
                <Users className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                Admin Panel
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Link>
            )}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {isLoggingOut ? "Logging out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "md:ml-64" : "md:ml-0"
      )}>
        <main className="p-6 md:p-10 min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}

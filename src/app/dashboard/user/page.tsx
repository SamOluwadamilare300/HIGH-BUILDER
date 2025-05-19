import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default async function UserDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <form
          action={async () => {
            "use server"
            await fetch("/api/auth/signout", { method: "POST" })
          }}
        >
          <Button variant="outline">Sign Out</Button>
        </form>
      </div>

      <div className="rounded-lg border p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-medium">Your Account Information</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{session.user.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{session.user.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
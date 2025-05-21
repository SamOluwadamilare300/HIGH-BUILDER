import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

async function promoteToAdmin(userId: string) {
  "use server"
  
  await prisma.user.update({
    where: { id: userId },
    data: { role: Role.ADMIN }
  })
  
  revalidatePath("/dashboard/admin")
}

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user || session.user.role !== Role.ADMIN) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-8 rounded-xl bg-white shadow-md max-w-md">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-500">You don't have permission to view this page.</p>
          <Button 
            className="mt-6" 
            onClick={() => redirect("/dashboard/user")}
          >
            Go to User Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  // Calculate stats
  const totalUsers = users.length
  const adminUsers = users.filter(user => user.role === Role.ADMIN).length
  const regularUsers = totalUsers - adminUsers

  return (
    <DashboardLayout
      userRole={session.user.role as string}
      userName={session.user.name || "Admin"}
      userEmail={session.user.email || ""}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users and system settings</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-lg border border-blue-100 p-6 shadow-sm bg-white">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="rounded-lg border border-blue-100 p-6 shadow-sm bg-white">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Admin Users</h3>
          <p className="text-3xl font-bold">{adminUsers}</p>
        </div>
        <div className="rounded-lg border border-blue-100 p-6 shadow-sm bg-white">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Regular Users</h3>
          <p className="text-3xl font-bold">{regularUsers}</p>
        </div>
      </div>

      {/* User List */}
      <div className="rounded-lg border border-blue-100 p-6 shadow-sm bg-white">
        <h2 className="mb-6 text-xl font-medium text-blue-700">User Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">Role</th>
                <th className="py-3 px-4 text-left font-medium">Created At</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === Role.ADMIN 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{format(new Date(user.createdAt), "MMM d, yyyy")}</td>
                  <td className="py-3 px-4">
                    {user.role !== Role.ADMIN && (
                      <form action={promoteToAdmin.bind(null, user.id)}>
                        <Button variant="outline" size="sm">
                          Promote to Admin
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
} 
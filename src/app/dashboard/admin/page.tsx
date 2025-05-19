import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { revalidatePath } from "next/cache"
import { Role, User } from "@/generated/prisma/index"

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
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this page.</p>
        </div>
      </div>
    )
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form
          action={async () => {
            "use server"
            await fetch("/api/auth/signout", { method: "POST" })
          }}
        >
          <Button variant="outline">Sign Out</Button>
        </form>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-medium">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Role</th>
                  <th className="px-4 py-2 font-medium">Created At</th>
                  <th className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-2">
                      {user.role !== Role.ADMIN && (
                        <form action={promoteToAdmin.bind(null, user.id)}>
                          <Button variant="outline" size="sm" type="submit">
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
      </div>
    </div>
  )
} 
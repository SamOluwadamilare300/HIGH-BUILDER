import { auth } from "@/lib/auth"
import { format } from "date-fns"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default async function UserDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    return null
  }

  return (
    <DashboardLayout
      userRole={session.user.role as string}
      userName={session.user.name || "User"}
      userEmail={session.user.email || ""}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Welcome, {session.user.name}!</h1>
        <p className="text-sm text-gray-500 mt-1">Here's your account information</p>
      </div>

      <div className="rounded-lg border border-blue-100 p-6 shadow-sm bg-white">
        <h2 className="mb-6 text-xl font-medium text-blue-700">Your Account Information</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1 p-4 rounded-lg bg-blue-50">
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{session.user.name}</p>
          </div>
          <div className="space-y-1 p-4 rounded-lg bg-blue-50">
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{session.user.email}</p>
          </div>
          <div className="space-y-1 p-4 rounded-lg bg-blue-50">
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="font-medium text-gray-900">{session.user.role}</p>
          </div>
          <div className="space-y-1 p-4 rounded-lg bg-blue-50">
            <p className="text-sm font-medium text-gray-500">Member Since</p>
            <p className="font-medium text-gray-900">{format(new Date(), "MMMM d, yyyy")}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
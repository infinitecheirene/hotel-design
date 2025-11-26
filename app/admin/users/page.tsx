"use client"

import UsersClient from "@/components/admin/UsersClient"
import AdminGuard from "@/components/admin/AdminGuard"

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <div>
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <div className="text-sm text-gray-500">Manage hotel customers and accounts</div>
        </div>

        <UsersClient />
      </div>
    </AdminGuard>
  )
}

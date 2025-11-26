"use client"

import DashboardClient from "@/components/admin/DashboardClient"
import AdminGuard from "@/components/admin/AdminGuard"

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin dashboard</h1>
        <DashboardClient />
      </div>
    </AdminGuard>
  )
}

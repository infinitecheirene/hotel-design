"use client"

import RoomsClient from "@/components/admin/RoomsClient"
import AdminGuard from "@/components/admin/AdminGuard"

export default function AdminRoomsPage() {
  return (
    <AdminGuard>
      <div>
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold mb-4">Rooms</h1>
          <button className="px-3 py-2 rounded bg-green-600 text-white text-sm">Create room</button>
        </div>

        <RoomsClient />
      </div>
    </AdminGuard>
  )
}

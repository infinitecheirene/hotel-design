"use client"

import BookingsClient from "@/components/admin/BookingsClient"
import AdminGuard from "@/components/admin/AdminGuard"

export default function AdminBookingsPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        <BookingsClient />
      </div>
    </AdminGuard>
  )
}

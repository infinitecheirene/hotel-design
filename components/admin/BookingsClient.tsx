"use client"

import React, { useEffect, useState } from "react"
import { getBookings, setAuthToken } from "@/lib/adminService"

export default function BookingsClient() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) return setLoading(false)

    setAuthToken(token)
    getBookings()
      .then((res) => setItems(res?.data || res || []))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading bookings…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-3">
      {items.length === 0 ? <div className="text-gray-500">No bookings</div> : items.map((b, i) => (
        <div key={b.id || i} className="p-3 border rounded-md bg-white flex justify-between">
          <div>
            <div className="font-semibold">{b.guest || b.user_name || b.customer}</div>
            <div className="text-xs text-gray-500">{b.room || b.room_name} • {b.date || b.checkin_date}</div>
          </div>
          <div className="text-sm text-gray-700">{b.status || '—'}</div>
        </div>
      ))}
    </div>
  )
}

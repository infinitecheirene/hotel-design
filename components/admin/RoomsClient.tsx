"use client"

import React, { useEffect, useState } from "react"
import { getRooms, setAuthToken } from "@/lib/adminService"

export default function RoomsClient() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) return setLoading(false)

    setAuthToken(token)
    getRooms()
      .then((res) => setItems(res?.data || res || []))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading rooms…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.length === 0 ? (
        <div className="text-gray-500">No rooms</div>
      ) : (
        items.map((r, i) => (
          <div key={r.id || i} className="p-3 border rounded-md bg-white">
            <div className="font-semibold">{r.name || r.room_name}</div>
            <div className="text-xs text-gray-500">{r.type || r.category} • ${r.price || r.rate}</div>
          </div>
        ))
      )}
    </div>
  )
}

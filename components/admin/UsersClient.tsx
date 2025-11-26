"use client"

import React, { useEffect, useState } from "react"
import { getUsers, setAuthToken } from "@/lib/adminService"

export default function UsersClient() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) return setLoading(false)

    setAuthToken(token)
    getUsers()
      .then((res) => setItems(res?.data || res || []))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading users…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="text-gray-500">No users</div>
      ) : (
        items.map((u, i) => (
          <div key={u.id || i} className="p-3 border rounded-md bg-white flex justify-between items-center">
            <div>
              <div className="font-semibold">{u.name || u.full_name || u.username}</div>
              <div className="text-xs text-gray-500">{u.email}</div>
            </div>
            <div className="text-sm text-gray-700">{u.id}</div>
          </div>
        ))
      )}
    </div>
  )
}

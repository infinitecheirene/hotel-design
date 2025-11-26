"use client"

import React, { useEffect, useState } from "react"
import { getDashboard, setAuthToken } from "@/lib/adminService"
import Link from "next/link"

export default function DashboardClient() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("admin_token") : null
    if (!token) {
      setLoading(false)
      return
    }

    setAuthToken(token)

    getDashboard()
      .then((res) => setData(res))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-4">Loading dashboard…</div>

  if (!data) return (
    <div className="p-4 border rounded bg-white">
      <div className="text-gray-700">No data available — check your Laravel API connection or sign in as admin.</div>
      <div className="mt-3">
        <Link href="/admin/login" className="text-sm text-green-600">Sign in</Link>
      </div>
    </div>
  )

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 border border-green-100 rounded-md">
          <div className="text-sm text-gray-500">Rooms</div>
          <div className="text-3xl font-semibold">{data.rooms}</div>
        </div>

        <div className="p-4 bg-green-50 border border-green-100 rounded-md">
          <div className="text-sm text-gray-500">Bookings</div>
          <div className="text-3xl font-semibold">{data.bookings}</div>
        </div>

        <div className="p-4 bg-green-50 border border-green-100 rounded-md">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-3xl font-semibold">{data.users}</div>
        </div>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { adminLogin, setAuthToken } = await import("@/lib/adminService")
      const { token } = await adminLogin(username, password)
      if (!token) {
        setError("Login failed: missing token")
        return
      }

      localStorage.setItem("admin_token", token)
      setAuthToken(token)
      router.push("/admin")
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow">
        <h1 className="text-2xl font-bold mb-4">Admin login</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" placeholder="username" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded" placeholder="password" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2 items-center">
            <button disabled={loading} className="px-3 py-2 bg-green-600 text-white rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
            <div className="text-xs text-gray-500">Admin uses your Laravel API credentials.</div>
          </div>
        </form>
      </div>
    </div>
  )
}

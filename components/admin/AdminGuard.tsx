"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { setAuthToken } from "@/lib/adminService"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Set token on client API instance
    setAuthToken(token)
  }, [router])

  return <>{children}</>
}

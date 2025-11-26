"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { setAuthToken } from "@/lib/adminService"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/rooms", label: "Rooms" },
    { href: "/admin/users", label: "Users" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto flex gap-6 py-8 px-6">
        <aside className="w-64 bg-white rounded-md shadow-sm p-4 sticky top-6 h-[86vh] overflow-auto">
          <h2 className="font-bold text-lg mb-4">Admin</h2>
          <div className="text-xs text-gray-500 mb-3">Manage the hotel</div>
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md hover:bg-gray-100 ${pathname === item.href ? 'bg-green-50 border border-green-200' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t pt-3">
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("admin_token")
                  setAuthToken(null)
                } finally {
                  router.push("/admin/login")
                }
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-red-600"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 bg-white rounded-md shadow-sm min-h-[78vh]">{children}</main>
      </div>
    </div>
  )
}

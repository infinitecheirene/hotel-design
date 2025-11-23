"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { RoomProvider } from "@/contexts/room-context"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <AuthProvider>
      <RoomProvider>
        {!isAuthPage && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isAuthPage && <Footer />}
      </RoomProvider>
    </AuthProvider>
  )
}

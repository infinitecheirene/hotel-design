"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Menu, X, CircleUserRound } from "lucide-react"
import { useState } from "react"
import PWAInstallButton from "@/components/PWAInstallButton"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/rooms", label: "Rooms" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-linear-to-br from-red-900 via-red-800 to-red-900 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/eurotel-logo.png" alt="Eurotel Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium text-red-100 transition-colors ${
                  isActive(item.href) ? "border-b-2 border-red-200" : "text-foreground hover:text-red-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons + PWA Install */}
          <div className="hidden md:flex items-center space-x-2 text-red-900">
            {/* PWA Install Text */}
            <PWAInstallButton />
            
            {user ? (
              <div className="flex items-center px-3 space-x-3">
                <Link href="/profile">
                  <CircleUserRound className="text-red-200 hover:text-red-300" />
                </Link>
                  <LogOut
                    onClick={handleLogout}
                    className="text-red-200 hover:text-red-300 cursor-pointer"
                    size={20}
                  />

              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/register">
                  <Button variant="outline" size="sm" className="bg-red-900 text-red-200 border border-red-200 hover:bg-red-200 hover:text-red-900 hover:border-red-900">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="default" size="sm" className="px-6 bg-red-200 text-red-900 border border-red-900 hover:bg-red-900 hover:text-red-200 hover:border-red-200">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: PWA Install Text + Menu Button */}
          <div className="md:hidden flex items-center space-x-3 text-red-900">
            {/* PWA Install Text for Mobile - positioned between logo and hamburger */}
            <PWAInstallButton />
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5 text-red-200 border rounded-xl" /> : <Menu className="w-5 h-5 text-red-200" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base text-red-200 hover:text-red-700 active:text-red-700 font-medium transition-colors ${
                    isActive(item.href) ? "bg-muted" : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    {/* keep avatar+welcome visible, but show Profile + Logout buttons below */}
                    <div className="flex items-center px-3 space-x-3">
                      <div className="flex items-center justify-center">
                        <CircleUserRound className="text-red-200 w-8 h-8 py-1" />
                          <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="text-md text-red-100 py-1 pt-2">Welcome, {user.name}</div>
                          </Link>
                      </div>
                    </div>

                    <div className="px-3 flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full my-2 bg-red-900 text-red-200 border border-red-200 hover:bg-red-200 hover:text-red-900 hover:border-red-900">
                        Register
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="default" size="sm" className="w-full my-2 px-6 bg-red-200 text-red-900 border border-red-900 hover:bg-red-900 hover:text-red-200 hover:border-red-200">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
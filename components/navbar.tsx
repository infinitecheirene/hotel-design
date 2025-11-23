"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Menu, X } from "lucide-react"
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
    { href: "/contact", label: "Contact Us" },
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
    <nav className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/eurotel-logo.png" alt="Eurotel Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-primary border-b-2 border-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons + PWA Install */}
          <div className="hidden md:flex items-center space-x-4">
            {/* PWA Install Text */}
            <PWAInstallButton />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
                <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/register">
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="default" size="sm">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: PWA Install Text + Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* PWA Install Text for Mobile - positioned between logo and hamburger */}
            <PWAInstallButton />
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href) ? "text-primary bg-muted" : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-muted-foreground">Welcome, {user.username}</div>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-transparent"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Register
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="default" size="sm" className="w-full">
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
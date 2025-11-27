"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  /** set user directly on the client provider and persist to localStorage */
  setUserData: (user: User | null) => void
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session on mount.
    // Support both older `user` key and current `eurotel_user` to remain compatible.
    const storedEurotel = localStorage.getItem("eurotel_user")
    const storedUser = localStorage.getItem("user")

    const raw = storedEurotel ?? storedUser
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch (error) {
        // Cleanup invalid entries
        localStorage.removeItem("eurotel_user")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        // persist under `eurotel_user` (new canonical key) and `user` for compatibility
        localStorage.setItem("eurotel_user", JSON.stringify(userData.user))
        try {
          localStorage.setItem("user", JSON.stringify(userData.user))
        } catch {}
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const setUserData = (u: User | null) => {
    setUser(u)
    if (u) {
      try {
        localStorage.setItem("eurotel_user", JSON.stringify(u))
        localStorage.setItem("user", JSON.stringify(u))
      } catch {}
    } else {
      localStorage.removeItem("eurotel_user")
      localStorage.removeItem("user")
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      // remove both keys for safety
      localStorage.removeItem("eurotel_user")
      localStorage.removeItem("user")
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, setUserData, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

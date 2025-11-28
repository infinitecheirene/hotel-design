"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (identifier: string, password: string) => Promise<boolean>
  setUserData: (user: User | null) => void
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load stored token and fetch user from Laravel
  useEffect(() => {
    const token = localStorage.getItem("eurotel_token")

    if (token) {
      fetch("http://127.0.0.1:8000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then(async (res) => {
          if (res.ok) {
            setUser(await res.json())
          } else {
            localStorage.removeItem("eurotel_token")
          }
        })
        .catch(() => {
          localStorage.removeItem("eurotel_token")
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  // LOGIN
  const login = async (identifier: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      })

      if (!response.ok) return false

      const data = await response.json()

      // store token only
      localStorage.setItem("eurotel_token", data.token)

      setUser(data.user)

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const setUserData = (u: User | null) => {
    setUser(u)
  }

  // LOGOUT
  const logout = async () => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("eurotel_token")

      await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("eurotel_token")
      setUser(null)
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, setUserData, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

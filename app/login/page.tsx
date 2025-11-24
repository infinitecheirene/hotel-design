"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { CustomLoader } from "@/components/custom-loader"
import { Eye, EyeOff, LogIn, CircleChevronLeft } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    if (username.length < 3) {
      alert("Username must be at least 3 characters long")
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long")
      setIsSubmitting(false)
      return
    }

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/")
      } else {
        alert("Invalid username or password")
      }
    } catch {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <CustomLoader isLoading={isLoading || isSubmitting} />
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-200 to-red-300 px-4 relative overflow-hidden">
        <Card className="w-full max-w-md z-10 border-red-200 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-linear-to-r from-red-800 to-red-700 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/">
                <CircleChevronLeft />
              </Link>
              <CardTitle className="text-3xl font-bold ml-4 sm:ml-14">Welcome Back</CardTitle>
            </div>
            <CardDescription className="text-red-100">Sign in to your Eurotel account to continue</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-red-800 font-medium text-md">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full border-red-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-red-800 font-medium text-md">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pr-10 border-red-200 focus:border-red-500 focus:ring-red-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-red-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-semibold py-3 shadow-lg transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-red-700 hover:text-red-800 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

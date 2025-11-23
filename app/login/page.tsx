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
import { Eye, EyeOff, LogIn } from "lucide-react"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/5 via-transparent to-yellow-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23059669 fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=4/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <Card className="w-full max-w-md relative z-10 border-green-200 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-green-800 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-green-100">Sign in to your Eurotel account to continue</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-800 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-800 font-medium">
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
                    className="w-full pr-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-green-50 text-green-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-semibold py-3 shadow-lg transition-all duration-200"
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
                <Link href="/register" className="text-green-700 hover:text-green-800 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

{/*             <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-green-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-green-800 text-center mb-2 font-semibold">Demo Credentials:</p>
              <div className="text-xs text-center space-y-1 text-green-700">
                <p>
                  <strong className="text-yellow-700">Username:</strong> demo
                </p>
                <p>
                  <strong className="text-yellow-700">Password:</strong> password123
                </p>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

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
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUserData, isLoading } = useAuth()
  const router = useRouter()

  // Helper function to check if input is an email
  const isEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!emailOrUsername.trim() || !password.trim()) {
      alert("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    const trimmedInput = emailOrUsername.trim()

    // Validate based on whether it's email or username
    if (isEmail(trimmedInput)) {
      // Email validation
      if (trimmedInput.length < 5) {
        alert("Please enter a valid email address")
        setIsSubmitting(false)
        return
      }
    } else {
      // Username validation
      if (trimmedInput.length < 3) {
        alert("Username must be at least 3 characters long")
        setIsSubmitting(false)
        return
      }
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long")
      setIsSubmitting(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
      
      // Determine if input is email or username and structure payload accordingly
      const payload = isEmail(trimmedInput)
        ? { email: trimmedInput, password: password }
        : { username: trimmedInput, password: password }
      
      console.log('=== LOGIN DEBUG ===')
      console.log('API URL:', `${apiUrl}/api/auth/login`)
      console.log('Payload:', { 
        ...(isEmail(trimmedInput) ? { email: trimmedInput } : { username: trimmedInput }), 
        password: '[HIDDEN]' 
      })
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      })

      console.log('Response Status:', response.status)
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
      
      const responseText = await response.text()
      console.log('Raw Response:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
        console.log('Parsed Response:', data)
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError)
        alert('Server returned invalid response: ' + responseText)
        setIsSubmitting(false)
        return
      }

      if (response.ok && data.success) {
        // Store authentication token
        if (data.data?.token) {
          localStorage.setItem('auth_token', data.data.token)
        }
        
        // Store user data if needed
        if (data.data?.user) {
          // persist under `user` and `eurotel_user` so the AuthProvider and other parts of the app detect the session
          localStorage.setItem('user', JSON.stringify(data.data.user))
          try {
            localStorage.setItem('eurotel_user', JSON.stringify(data.data.user))
          } catch {}
          // update the AuthProvider immediately so navbar & other UI respond
          try {
            setUserData?.(data.data.user)
          } catch {}
        }
        
        alert(data.message || "Login successful!")
        
        // Navigate to home page
        router.push("/")
        router.refresh() // Refresh to update auth state
      } else {
        // Handle different error scenarios
        let errorMessage = data.message || 'Login failed'
        
        if (data.errors) {
          console.log('Validation Errors:', data.errors)
          const errorList = Object.entries(data.errors)
            .map(([field, messages]) => {
              const msgArray = Array.isArray(messages) ? messages : [messages]
              return `${field}: ${msgArray.join(', ')}`
            })
            .join('\n')
          errorMessage += '\n\n' + errorList
        }
        
        alert(errorMessage)
      }
    } catch (error) {
      console.error("Caught Error:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <CustomLoader isLoading={isLoading || isSubmitting} />
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-200 to-red-300 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-green-800/5 via-transparent to-yellow-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23059669%22 fillOpacity%3D%220.03%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>

        <Card className="w-full max-w-md relative z-10 border-red-200 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center py-6 bg-linear-to-br from-red-900 via-red-800 to-red-900 text-white rounded-t-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/">
                <CircleChevronLeft className="text-red-200"/>
              </Link>
              <CardTitle className="text-3xl font-bold ml-4 sm:ml-14">Welcome Back</CardTitle>
            </div>
            <CardDescription className="text-red-100">Sign in to your Eurotel account to continue</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername" className="text-red-800 font-medium text-md">
                  Email or Username
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
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
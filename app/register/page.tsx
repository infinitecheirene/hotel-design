"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, User, Mail, Lock, CircleChevronLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match")
    setIsLoading(false)
    return
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
    
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }
    
    console.log('=== REGISTRATION DEBUG ===')
    console.log('API URL:', `${apiUrl}/api/auth/register`)
    console.log('Payload:', payload)
    
    const response = await fetch(`${apiUrl}/api/auth/register`, {
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
      setIsLoading(false)
      return
    }

    if (response.ok && data.success) {
      if (data.data?.token) {
        localStorage.setItem('auth_token', data.data.token)
      }
      
      alert(data.message || "Registration successful!")
      router.push("/login?message=Registration successful! Please login.")
    } else {
      // Display all validation errors
      let errorMessage = data.message || 'Registration failed'
      
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
    alert("Network error. Please try again. Check console for details.")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-200 to-red-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-green-800/5 via-transparent to-yellow-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23059669%22 fillOpacity%3D%220.03%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>

      <Card className="w-full max-w-md relative z-10 border-red-200 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center py-6 bg-linear-to-br from-red-900 via-red-800 to-red-900 text-white rounded-t-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/">
                <CircleChevronLeft className="text-red-200"/>
              </Link>
              <CardTitle className="text-3xl font-bold ml-10 sm:ml-20">Join Eurotel</CardTitle>
            </div>
          <CardDescription className="text-red-100">
            Create your account to start booking luxury stays
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-red-800">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-10 border-red-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-red-800">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 border-red-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-red-800">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 border-red-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-red-800">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 pr-10 border-red-200 focus:border-red-500 focus:ring-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-red-700 hover:text-red-800 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
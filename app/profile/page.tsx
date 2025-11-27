"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CustomLoader } from "@/components/custom-loader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, CreditCard, Phone, Mail, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface Booking {
  id: string
  roomType: string
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  status: "confirmed" | "completed" | "cancelled"
  bookingDate: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false) // Added contentReady state

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Mock booking data - replace with actual API call
    const mockBookings: Booking[] = [
      {
        id: "BK001",
        roomType: "Deluxe Suite",
        roomNumber: "205",
        checkIn: "2024-01-15",
        checkOut: "2024-01-18",
        guests: 2,
        totalAmount: 450,
        status: "completed",
        bookingDate: "2024-01-10",
      },
      {
        id: "BK002",
        roomType: "Executive Room",
        roomNumber: "312",
        checkIn: "2024-02-20",
        checkOut: "2024-02-23",
        guests: 1,
        totalAmount: 300,
        status: "confirmed",
        bookingDate: "2024-02-15",
      },
    ]

    setTimeout(() => {
      setBookings(mockBookings)
      setLoading(false)
    }, 1000)
  }, [user, router])

  const handleLoadingComplete = () => {
    setPageLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!user) return null

  if (pageLoading || !contentReady) {
    return <CustomLoader isLoading={pageLoading} onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-red-50 to-red-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-linear-to-r from-red-800 to-red-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="hidden md:flex lg:flex w-20 h-20 rounded-full bg-linear-to-r bg-red-400 items-center justify-center text-2xl font-bold text-red-900">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl md:text-3xl font-bold mb-2">
                Welcome back, <span className="text-yellow-400">{user.name}</span>&nbsp;!
              </h1>
              <p className="text-green-100">Manage your bookings and account details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-green-100">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <User className="w-4 h-4" />
              <span className="text-yellow-400 font-semibold">Gold Member</span>
            </div>
          </div>
        </div>

        <Card className="rounded-2xl border-red-200 shadow-lg">
          <CardHeader className="bg-linear-to-r from-red-800 to-red-700 text-white rounded-t-2xl py-4">
            <CardTitle className="flex items-center gap-2 text-white text-2xl">
              <Calendar className="w-5 h-5 text-3xl" />
              Your Bookings
            </CardTitle>
            <CardDescription className="text-red-100">View and manage your hotel reservations</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-3 border-green-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-green-600">Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-semibold text-red-800 mb-2">No bookings yet</h3>
                <p className="text-red-600 mb-6">Start planning your perfect stay at Eurotel</p>
                <Button
                  onClick={() => router.push("/rooms")}
                  className="bg-linear-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
                >
                  Browse Rooms
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-red-200 rounded-xl p-6 bg-linear-to-r from-white to-red-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-red-900 mb-1">{booking.roomType}</h3>
                        <p className="text-red-700">Booking #{booking.id}</p>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} capitalize`}>{booking.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700">Room {booking.roomNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700">
                          {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700">
                          {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-800">${booking.totalAmount}</span>
                      </div>
                    </div>

                    <div className="flex justify-between gap-2 pt-4 border-t border-red-200">
                      {booking.status === "confirmed" && (
                        <Button variant="ghost" size="sm" className="text-red-700 hover:bg-red-50 border border-red-400">
                          View Details
                        </Button>
                      )}
                      {booking.status === "confirmed" && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action Section */}
      <section className="py-10 text-white relative overflow-hidden bg-linear-to-br from-red-300 to-red-200" 
      style={{ boxShadow: '0 -9px 20px -9px rgba(0,0,0,0.15)' }}>
        <div className="absolute inset-0 bg-linear-radial from-red-600/20 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #66000A, #99000F, #CC0014, #FF3347, #FF6675)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Experience Eurotel?
            </motion.h2>
          
              <p className="text-xl mb-12 text-pretty max-w-2xl mx-auto opacity-95 text-red-900">
                Contact us today to book your stay or learn more about our services and amenities.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-800/90">
                    <Phone className="w-6 h-6 text-red-300" />
                  </div>
                  <span className="text-lg">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-800/90">
                    <Mail className="w-6 h-6 text-red-300" />
                  </div>
                  <span className="text-lg">info@eurotel.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-800/90">
                    <MapPin className="w-6 h-6 text-red-300" />
                  </div>
                  <span className="text-lg">123 Luxury Ave, City Center</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <Link href="/rooms">
                  <button 
                    className="group w-46 h-16 px-10 py-4 rounded-sm flex items-center justify-center font-medium text-lg transition-all duration-500 transform hover:scale-105 text-gray-200 shadow-2xl hover:shadow-3xl bg-red-800 border-2 border-red-800/40 hover:text-white hover:bg-red-800/30 hover:backdrop-blur-sm">
                    Book Now
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    className="w-46 h-16 px-10 py-4 rounded-sm font-medium text-lg transition-all duration-500 border-2 border-red-800/40 text-gray-200 bg-red-800/30 backdrop-blur-sm hover:bg-red-800 hover:border-red-800 transform hover:scale-105">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
      </section>
    </main>
  )
}

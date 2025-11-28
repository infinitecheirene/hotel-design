"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRoom, type Room } from "@/contexts/room-context"
import { useAuth } from "@/contexts/auth-context"
import { CustomLoader } from "@/components/custom-loader"
import {
  Wifi,
  Coffee,
  Tv,
  Bath,
  Bed,
  Users,
  Star,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  CircleX,
  BedSingle,
  BedDouble,
} from "lucide-react"
import Link from "next/link"
import SectionDivider from "@/components/home/section-divider"
import AmenitiesSection from "@/components/home/amenities-section"

export default function RoomsComponent() {
  const { rooms, setRooms, selectedRoom, setSelectedRoom } = useRoom()
  const { user } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [contentReady, setContentReady] = useState(false)

  // FETCH ROOMS FROM API

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true)
        setContentReady(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch rooms")
        }

        const data = await response.json()

        setRooms(data)
        setFilteredRooms(data)
      } catch (error) {
        console.error("ROOM FETCH ERROR:", error)
      } finally {
        setIsLoading(false)
        setContentReady(true)
      }
    }

    fetchRooms()
  }, [setRooms])

  // FILTER ROOMS

  useEffect(() => {
    let filtered = [...rooms]

    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((room) => room.type === typeFilter)
    }

    if (priceFilter !== "all") {
      if (priceFilter === "budget") filtered = filtered.filter((room) => room.price <= 150)
      if (priceFilter === "mid") filtered = filtered.filter((room) => room.price > 150 && room.price <= 300)
      if (priceFilter === "luxury") filtered = filtered.filter((room) => room.price > 300)
    }

    setFilteredRooms(filtered)
  }, [rooms, searchTerm, typeFilter, priceFilter])

  // HANDLE ROOM SELECT
  const handleSelectRoom = (room: Room) => {
    if (!room.available) return
    setSelectedRoom(room)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi className="w-4 h-4" />
      case "room service":
        return <Coffee className="w-4 h-4" />
      case "flat screen tv":
        return <Tv className="w-4 h-4" />
      case "jacuzzi":
        return <Bath className="w-4 h-4" />
      case "city view":
      case "balcony":
        return <Star className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  if (isLoading || !contentReady) {
    return <CustomLoader isLoading={isLoading} onLoadingComplete={() => setContentReady(true)} />
  }

  return (
    <main className="min-h-screen">
      <section className="relative py-20 bg-linear-to-br from-red-50 to-red-100">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/executive-suite.jpg')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-6">
            Our <span className="text-red-900 underline">Rooms & Suites</span>
          </h1>
          <p className="text-lg md:text-xl text-red-800 max-w-3xl mx-auto">
            Choose from our carefully designed accommodations, each offering comfort, luxury, and exceptional service.
          </p>
        </div>
      </section>

{/* Need to fix the room visibility when guest view mode */}

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-8">

        {/* Filter section - keeping your existing filter code */}
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
          {/* Mobile-First Compact Header */}
          <div className="bg-linear-to-r from-red-900 to-red-700 px-4 py-3">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Find Your Perfect Room
            </h2>
          </div>

          {/* Filter Controls */}
            <div className="md:flex p-4 items-center justify-left">
              <div className="relative flex lg:mr-0 md:mr-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 w-4 h-4 z-10" />
                <Input
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 h-11 lg:w-3xl border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-base rounded-lg"
                />
                {searchTerm && (
                  <CircleX
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-400 w-5 h-5 z-10 cursor-pointer"
                  />
                )}
              </div>

              {/* Room Type Filter */}
              <div className="flex lg:px-2">
                <div className="relative mr-1">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="items-center justify-center max-w-md border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-base rounded-lg">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-2 text-red-600" />
                        <SelectValue placeholder="Room Type" />
                      </div>
                    </SelectTrigger>

                    <SelectContent className="max-w-md">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Clear button inside the select box */}
                  {typeFilter !== "all" && (
                    <CircleX
                      onClick={() => setTypeFilter("all")}
                      className="absolute max-w-md right-3 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-400 w-5 h-5 cursor-pointer"
                    />
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="border-red-200 focus:border-red-500 focus:ring-red-500 bg-red-50/30 text-base rounded-lg">
                      <div className="flex items-center">
                        <span className="text-red-600 mr-1">₱</span>
                        <SelectValue placeholder="Price Range" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">
                        Budget&nbsp;
                        <span className="text-xs">(₱0–₱150)</span>
                      </SelectItem>
                      <SelectItem value="mid">
                        Mid&nbsp;
                        <span className="text-xs">(₱151–₱300)</span>
                      </SelectItem>
                      <SelectItem value="luxury">
                        Luxury&nbsp;
                        <span className="text-xs">(₱300+)</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Clear button INSIDE the select box */}
                  {priceFilter !== "all" && (
                    <CircleX
                      onClick={() => setPriceFilter("all")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-400 w-5 h-5 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {/* Active filters display */}
              {(searchTerm || typeFilter !== "all" || priceFilter !== "all") && (
                <div className="flex gap-2 lg:mt-0 lg:ml-1 items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setTypeFilter("all")
                      setPriceFilter("all")
                    }}
                    className="text-red-700 hover:text-red-800 bg-red-300 hover:bg-red-200 text-md"
                  >
                    Clear All
                    <CircleX className=""/>
                  </Button>
                </div>
              )}
            </div>
          </div>

        {/* ROOMS GRID */}
        {filteredRooms.length === 0 ? (
          <Card className="text-center py-12 border-red-200">
            <CardContent>
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="mb-2 text-red-800">No rooms found</CardTitle>
              <CardDescription className="text-red-600">
                Try adjusting your filters to see more room options.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col p-0 border-red-200 hover:border-red-400"
              onClick={() => handleSelectRoom(room)}
            >
              <div
                className="h-48 bg-cover bg-center relative opacity-90"
                style={{ backgroundImage: `url(${room.image})` }}
              />
                        
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cl sm:text-2xl text-red-800">
                  {room.type === "single" && <BedSingle className="w-5 h-5" />}
                  {room.type === "double" && <BedDouble className="w-5 h-5" />}
                  {room.type === "suite" && <Star className="w-5 h-5" />}
                  {room.name}
                </CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} className="flex bg-red-300 text-red-800 items-center gap-1">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between py-2 pb-3 border-t border-red-200 mt-auto">
                  <div className="text-2xl font-bold text-red-900">
                    ₱{room.price}
                    <span className="text-sm text-red-700 font-normal">/night</span>
                  </div>

                  {room.available ? (
                      user ? (
                        <Link href={`/rooms/${room.id}`}>
                          <Button
                            className="bg-linear-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white"
                            size="sm"
                          >
                            Select Room
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/login">
                          <Button
                            className="bg-linear-to-r bg-red-300 text-red-900 shadow-lg hover:bg-red-400"
                            size="sm"
                          >
                            Login to Book
                          </Button>
                        </Link>
                      )
                    ) : (
                      <Button disabled size="sm" className="bg-gray-400">
                        Not Available
                      </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
         )}
      </section>

      <SectionDivider />
      <AmenitiesSection />

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
                <Link href="/about">
                  <button 
                    className="group w-46 h-16 px-10 py-4 rounded-sm flex items-center justify-center font-medium text-lg transition-all duration-500 transform hover:scale-105 text-gray-200 shadow-2xl hover:shadow-3xl bg-red-800 border-2 border-red-800/40 hover:text-white hover:bg-red-800/30 hover:backdrop-blur-sm">
                    Learn More
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

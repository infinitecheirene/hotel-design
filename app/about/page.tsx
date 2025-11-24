"use client"

import { useState, useEffect } from "react"
import { CustomLoader } from "@/components/custom-loader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactSection from "@/components/home/contact-section"

import {
  Award,
  Users,
  Calendar,
  Globe,
  Heart,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Building2,
} from "lucide-react"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const milestones = [
    { year: "1998", event: "Eurotel Makati opened its doors in the heart of the CBD" },
    { year: "2003", event: "Expanded with renovated executive floors" },
    { year: "2008", event: "Launched premium business center facilities" },
    { year: "2015", event: "Achieved DOT 4-star accreditation" },
    { year: "2019", event: "Completed major renovation of all guest rooms" },
    { year: "2024", event: "Celebrating 26 years of hospitality excellence" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Filipino Hospitality",
      description: "We embody the warmth of Filipino hospitality combined with international standards of service.",
    },
    {
      icon: Shield,
      title: "Business Excellence",
      description: "Located in Makati's CBD, we understand and cater to the needs of business travelers.",
    },
    {
      icon: Building2,
      title: "Strategic Location",
      description: "Perfectly positioned in the financial district with easy access to major corporations.",
    },
    {
      icon: Globe,
      title: "International Quality",
      description: "World-class amenities and services that meet the expectations of global travelers.",
    },
  ]

  const awards = [
    { year: "2023", award: "Best Business Hotel - Makati Chamber of Commerce" },
    { year: "2022", award: "Excellence in Service - Philippines Hotel Awards" },
    { year: "2021", award: "Top Rated Hotel - TripAdvisor Travelers' Choice" },
    { year: "2020", award: "Outstanding Hospitality - Department of Tourism" },
  ]

  const stats = [
    { number: "25+", label: "Years in Makati" },
    { number: "83", label: "Comfortable Rooms" },
    { number: "300K+", label: "Satisfied Guests" },
    { number: "4.0", label: "Guest Rating" },
  ]

  if (isLoading || !contentReady) {
    return <CustomLoader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-red-50 to-red-100">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/luxury-hotel-exterior.png')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-6 text-balance">
            About <span className="text-red-900 underline">Eurotel Makati</span>
          </h1>
          <p className="text-lg md:text-xl text-red-800 mb-8 text-pretty max-w-3xl mx-auto">
            Located at the corner of Don Chino Roces and Arnaiz Avenue in Makati City, Eurotel has been providing
            quality accommodation and warm Filipino hospitality in the heart of the Philippines&apos; premier business
            district.
          </p>
          <div className="flex items-center justify-center text-red-700 text-lg">
            <MapPin className="w-5 h-5 mr-2 text-orange-500" />
            Don Chino Roces Avenue Corner Arnaiz Avenue, Makati City
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-br shadow-md from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-800 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-red-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-6 text-balance">Our Story</h2>
            <div className="w-24 h-1 mb-6 bg-linear-to-r from-red-500 to-red-400" />
            <div className="space-y-4 text-red-800">
              <p className="text-pretty">
                  Eurotel Makati has been serving guests at the strategic corner of Don Chino Roces and Arnaiz Avenue,
                  providing comfortable accommodations in one of Metro Manila&apos;s most accessible business locations.
                  Our 83-room property offers a more intimate hotel experience compared to larger establishments.
              </p>
              <p className="text-pretty">
                  As part of one of the Philippines&apos; established hotel chains, we focus on delivering consistent
                  quality and reliable service. Our location provides easy access to Makati&apos;s business district
                  while maintaining competitive rates that make us a practical choice for both business and leisure
                  travelers.
              </p>
              <p className="text-pretty">
                  With amenities including free WiFi, on-site parking, a restaurant, and 24-hour room service, Eurotel
                  Makati continues to serve guests who appreciate straightforward hospitality in a convenient location.
              </p>
            </div>
          </div>

          {/* Awards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 space-x-5 mt-10">
            <div
              className="h-100 bg-cover bg-center rounded-lg shadow-xl border-4 border-red-300"
              style={{
                backgroundImage: "url('/elegant-hotel-lobby-interior.jpg')",
              }}
            />

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 text-balance">Recognition and Awards</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <Card
                    key={index}
                    className="flex items-center p-6 bg-linear-to-br from-white to-red-50 shadow-lg border border-red-200 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex">
                      <div className="w-18 h-10 bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-red-800" />
                      </div>
                      <div className="space-y-3">
                        <div className="font-semibold text-red-800 px-3">{award.award}</div>
                        <div className="text-sm text-red-700">{award.year}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 text-balance">Our Journey in Makati</h2>
              <div className="w-24 h-1 mx-auto mb-6 bg-linear-to-r from-red-500 to-red-400" />
              <p className="text-lg text-red-700 max-w-2xl mx-auto text-pretty">
                Key milestones in our journey of serving guests in the heart of Metro Manila&apos;s business district.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-linear-to-br from-white to-red-50 border border-red-200"
                >
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit bg-red-300 text-red-900 hover:bg-red-400">
                      {milestone.year}
                    </Badge>
                    <CardTitle className="text-lg text-red-800">{milestone.event}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="pb-16 pt-10 bg-white-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 text-balance">What Sets Us Apart</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-linear-to-r from-red-500 to-red-400" />
            <p className="text-lg text-red-800 max-w-2xl mx-auto text-pretty">
              Our commitment to excellence is built on these core principles that define the Eurotel Makati experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center h-full bg-linear-to-br from-white to-red-50 shadow-lg border border-red-200 hover:scale-105 transition-transform duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-red-800" />
                  </div>
                  <CardTitle className="text-xl text-red-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-red-700">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 text-balance">Prime Makati Location</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-linear-to-r from-red-500 to-red-400" />
            <p className="text-lg text-red-800 max-w-2xl mx-auto text-pretty">
              Strategically positioned in the heart of Metro Manila&apos;s premier business and shopping district.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center bg-linear-to-br from-white to-red-50 shadow-lg border border-red-200">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-red-800" />
                </div>
                <CardTitle className="text-red-800">Business District Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-sm">
                  Walking distance to major corporations, banks, and financial institutions in Makati CBD.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-linear-to-br from-white to-red-50 shadow-lg border border-red-200">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-800" />
                </div>
                <CardTitle className="text-red-800">Shopping and Dining</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-sm">
                  Close proximity to Greenbelt, Glorietta, and Power Plant Mall for shopping and entertainment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-linear-to-br from-white to-red-50 shadow-lg border border-red-200">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-red-800" />
                </div>
                <CardTitle className="text-red-800">Transportation Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 text-sm">
                  Easy access to MRT stations, bus routes, and major expressways connecting to NAIA and other key areas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <ContactSection />
    </div>
  )
}

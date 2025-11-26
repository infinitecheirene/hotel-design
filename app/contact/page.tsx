"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CustomLoader } from "@/components/custom-loader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Building2, HeartHandshake, MapPin, X } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [pageLoading, setPageLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setPageLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
      
      console.log('Sending request to:', `${apiUrl}/api/contact`) // Debug log
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      console.log('Response status:', response.status) // Debug log

      const data = await response.json()
      console.log('Response data:', data) // Debug log

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error('Full error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (pageLoading || !contentReady) {
    return <CustomLoader isLoading={pageLoading} onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <main className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-red-50 to-red-100">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/lobby.webp')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-6 text-balance">
            Let's <span className="text-red-900 underline">Connect</span>
          </h1>
          <p className="text-lg md:text-xl text-red-800 mb-8 text-pretty max-w-3xl mx-auto">
            Your perfect stay begins with a conversation. Our dedicated team is ready to make your experience extraordinary.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Information */}
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-red-900 leading-tight">
                Ready to Create
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
                  Unforgettable Memories?
                </span>
              </h2>
              <p className="text-lg text-red-700 leading-relaxed">
                Whether you&apos;re planning a business trip, romantic getaway, or family vacation, our team is here to
                ensure every detail is perfect.
              </p>
            </div>

            {/* Contact Information Card */}
            <Card className="border-2 border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl group overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Visit Our Hotel */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-7 h-7 text-red-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 underline text-lg mb-3">Visit Our Hotel</h3>
                      <div className="text-red-700 space-y-1">
                        <p className="font-bold text-red-800">Eurotel Luxury Hotel</p>
                        <p>123 Luxury Avenue</p>
                        <p>Downtown District, City 12345</p>
                      </div>
                    </div>
                  </div>

                  {/* Call Us Anytime */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-300 flex items-center justify-center shrink-0">
                      <Phone className="w-7 h-7 text-red-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 underline text-lg mb-3">Call Us Anytime</h3>
                      <div className="text-red-700 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Reservations:</span>
                          <span className="text-red-700 font-semibold">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Concierge:</span>
                          <span className="text-red-700 font-semibold">+1 (555) 123-4568</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Emergency:</span>
                          <span className="text-red-700 font-semibold">+1 (555) 123-4569</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-300 flex items-center justify-center shrink-0">
                      <Mail className="w-7 h-7 text-red-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 underline text-lg mb-3">Email Support</h3>
                      <div className="text-red-600 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">General:</span>
                          <span className="text-red-700 font-semibold">info@eurotel.com</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Bookings:</span>
                          <span className="text-red-700 font-semibold">reservations@eurotel.com</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Events:</span>
                          <span className="text-red-700 font-semibold">events@eurotel.com</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-300 flex items-center justify-center shrink-0">
                      <Clock className="w-7 h-7 text-red-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 underline text-lg mb-3">Service Hours</h3>
                      <div className="text-red-600 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Front Desk:</span>
                          <span className="text-red-700 font-semibold">24/7</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Concierge:</span>
                          <span className="text-red-700 font-semibold">6 AM - 10 PM</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold text-red-800">Restaurant:</span>
                          <span className="text-red-700 font-semibold">6 AM - 11 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="bg-gradient-to-r from-red-700 to-red-600 border-0 text-white overflow-hidden">
              <CardContent className="p-5">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                  <HeartHandshake className="w-6 h-6 mr-3" />
                  Why Guests Love Us
                </h3>
                <div className="grid gap-4">
                  {[
                    "Personalized service tailored to your needs",
                    "Award-winning hospitality since 1995",
                    "Multilingual staff available 24/7",
                    "Concierge services for local experiences",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-300 shrink-0" />
                      <span className="text-green-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Right Column - Contact Form */}
          <section>
            <div className="border-2 border-red-200 shadow-2xl overflow-hidden rounded-lg bg-white">
              <div className="bg-gradient-to-r from-red-800 to-red-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative p-8">
                  <h3 className="text-3xl font-black text-white flex items-center mb-2">
                    <MessageCircle className="w-8 h-8 mr-3" />
                    Get in Touch
                  </h3>
                  <p className="text-red-100 text-lg">Send us a message and we&apos;ll respond within 30 minutes</p>
                </div>
              </div>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-red-800 mb-4">Message Sent!</h3>
                    <p className="text-red-600 mb-8 text-lg">
                      Thank you for reaching out. Our team will contact you within 30 minutes.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 px-8 py-3 rounded-full font-semibold"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message Display */}
                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                            <X className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-red-800 mb-1">Error</h4>
                            <p className="text-red-700">{error}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setError(null)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            aria-label="Close error"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-red-800">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-red-800">Email Address *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-red-800">Phone Number</label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-red-800">Subject *</label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-12 rounded-lg"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-red-800">Your Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="h-48 text-lg border-2 border-red-200 focus:border-red-500 focus:ring-red-500 resize-none rounded-lg"
                        placeholder="Tell us about your inquiry, special requests, or how we can make your stay perfect..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 h-14 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          Sending Your Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-red-600 text-center">
                      We respect your privacy and will never share your information with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="my-8 border border-red-200 shadow-2xl overflow-hidden rounded-lg">
              <div className="relative w-full overflow-hidden rounded-lg">
                <div className="w-full h-90 pb-[56.25%] sm:pb-[56.25%] md:pb-[60%] lg:pb-[56.25%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d682.6813886664107!2d121.0139271410784!3d14.55176281155918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9125525a2c9%3A0x7361a05f453add65!2sEurotel%20Makati%20Hotel!5e0!3m2!1sen!2sph!4v1763965983541!5m2!1sen!2sph"
                    title="Eurotel Makati Hotel Map"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 text-white relative overflow-hidden bg-gradient-to-br from-red-300 to-red-200" 
      style={{ boxShadow: '0 -9px 20px -9px rgba(0,0,0,0.15)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]" />
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
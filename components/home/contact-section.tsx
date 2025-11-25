"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-10 text-white relative overflow-hidden bg-linear-to-br from-red-300 to-red-200" 
      style={{ boxShadow: '0 -9px 20px -9px rgba(0,0,0,0.15)' }}>
        <div className="absolute inset-0 bg-linear-radial from-red-900/20 via-transparent to-transparent" />
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
  )
}

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-red-900 via-red-800 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="space-y-4 md:space-x-7 lg:space-x-0">
            <h3 className="text-2xl font-bold text-red-200 underline">Eurotel</h3>
            <p className="text-green-100 leading-relaxed text-justify">
              Where service and comfort meet. Experience luxury redefined with our world-class amenities and exceptional
              hospitality.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/50 transition-colors"
              >
                <Facebook className="w-5 h-5 text-red-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/50 transition-colors"
              >
                <Twitter className="w-5 h-5 text-red-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/50 transition-colors"
              >
                <Instagram className="w-5 h-5 text-red-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 lg:ml-10">
            <h4 className="text-lg font-semibold text-red-300">Services</h4>
            <ul className="space-y-2 text-green-100">
              <li>24/7 Room Service</li>
              <li>Concierge Service</li>
              <li>Valet Parking</li>
              <li>Spa & Wellness</li>
              <li>Fine Dining</li>
              <li>Business Center</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-red-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-red-100 hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-red-100 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-red-100 hover:text-red-400 transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-red-100 hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-red-100 hover:text-red-400 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-red-300">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-red-100">123 Luxury Ave, City Center</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-red-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-red-100">info@eurotel.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-100 text-sm">© 2025 Eurotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-green-100 hover:text-orange-200 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-green-100 hover:text-orange-200 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-green-100 hover:text-orange-200 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

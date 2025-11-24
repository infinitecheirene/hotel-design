"use client"

import { useEffect, useState } from "react"

interface CustomLoaderProps {
  isLoading: boolean
  onLoadingComplete?: () => void
}

export function CustomLoader({ isLoading, onLoadingComplete }: CustomLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showLoader, setShowLoader] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  const loadingMessages = [
    "Initializing Eurotel Experience...",
    "Preparing luxury accommodations...",
    "Configuring premium services...",
    "Activating concierge systems...",
    "Finalizing your perfect stay...",
    "Welcome to Eurotel Makati!",
  ]

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
      setLoadingComplete(false)
      setProgress(0)
      setCurrentMessage(0)

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2.5 // Slower, more controlled progress

          if (newProgress >= 100) {
            clearInterval(interval)
            setLoadingComplete(true)
            setTimeout(() => {
              setShowLoader(false)
              onLoadingComplete?.() // Callback when loading is truly complete
            }, 1500) // Longer delay to ensure 100% completion is visible
            return 100
          }

          // Update message based on progress
          const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1))
          setCurrentMessage(messageIndex)

          return newProgress
        })
      }, 80) // Slower interval for more controlled loading

      return () => clearInterval(interval)
    } else {
      setShowLoader(false)
    }
  }, [isLoading, onLoadingComplete, loadingMessages.length])

  if (!showLoader) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-br from-red-950 via-red-900 to-red-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]"></div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 text-white">
        <div className="relative">
          {/* Main building structure with enhanced design */}
          <div className="relative w-40 h-48 bg-linear-to-t from-red-800 via-red-700 to-red-600 rounded-t-xl shadow-2xl border border-red-600/30">
            {[...Array(7)].map((_, floor) => (
              <div
                key={floor}
                className="absolute w-full h-6 border-b border-red-600/20"
                style={{ top: `${floor * 28}px` }}
              >
                {/* Enhanced windows with better animation */}
                {[...Array(5)].map((_, window) => (
                  <div
                    key={window}
                    className={`absolute w-4 h-5 rounded-sm transition-all duration-1500 ease-in-out ${
                      progress > (floor * 14 + window * 3)
                        ? "bg-linear-to-b from-red-200 via-red-400 to-red-600 shadow-lg shadow-amber-400/60 animate-pulse"
                        : "bg-green-900/80 border border-red-700/50"
                    }`}
                    style={{
                      left: `${6 + window * 14}px`,
                      top: "2px",
                      animationDelay: `${(floor * 5 + window) * 150}ms`,
                    }}
                  ></div>
                ))}
              </div>
            ))}

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-linear-to-t from-amber-800 via-amber-700 to-amber-600 rounded-t-xl border-2 border-amber-500/50">
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-7 bg-red-900/90 rounded border border-red-700"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-amber-400/60 rounded-full blur-sm"></div>
            </div>

            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 text-red-300 animate-pulse" style={{ animationDuration: "2s" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
                  <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.5L18.5 12H17v6H7v-6H5.5L12 5.5z" />
                  <rect x="9" y="13" width="2" height="2" fill="currentColor" />
                  <rect x="13" y="13" width="2" height="2" fill="currentColor" />
                  <rect x="9" y="16" width="2" height="2" fill="currentColor" />
                  <rect x="13" y="16" width="2" height="2" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-red-800/90 px-3 py-1 rounded border border-red-400/50">
              <span className="text-red-300 text-xs font-bold tracking-wider">EUROTEL</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-transparent via-red-500/15 to-transparent rounded-t-xl animate-pulse"></div>
          <div className="absolute -inset-2 bg-linear-to-t from-transparent via-red-500/10 to-transparent rounded-t-xl blur-xl"></div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black bg-linear-to-r from-red-200 via-red-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            EUROTEL
          </h1>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 text-red-300">
              <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-red-400 to-amber-400"></div>
              <span className="text-sm font-bold tracking-widest">MAKATI</span>
              <div className="w-12 h-0.5 bg-linear-to-l from-transparent via-red-400 to-amber-400"></div>
            </div>
            <p className="text-xs text-red-200/80 font-medium tracking-wider">LUXURY • HOSPITALITY • EXCELLENCE</p>
          </div>
        </div>

        <div className="text-center h-8">
          <p className="text-xl text-red-100 font-semibold transition-all duration-700 transform animate-pulse">
            {loadingMessages[currentMessage]}
          </p>
        </div>

        <div className="relative w-96">
          <div className="h-2 bg-green-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-green-700/50">
            <div className="h-full bg-linear-to-r from-red-400 via-red-500 to-red-400 rounded-full transition-all duration-500 ease-out relative">
              <div
                className="absolute inset-0 bg-linear-to-r from-red-400 via-red-500 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
              <div
                className="absolute top-0 right-0 w-3 h-full bg-white/90 rounded-full shadow-lg shadow-red-400/60 transition-all duration-500"
                style={{ transform: `translateX(${progress < 100 ? "0" : "100%"})` }}
              ></div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-lg text-red-200 font-bold">{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-700 ${
                progress > i * 16.67
                  ? "bg-red-400 shadow-lg shadow-red-400/60 scale-110"
                  : "bg-red-700/60 scale-90"
              }`}
              style={{ animationDelay: `${i * 300}ms` }}
            ></div>
          ))}
        </div>

        {loadingComplete && (
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 text-red-300">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <p className="text-xl text-red-300 font-bold">Experience Ready!</p>
            </div>
            <p className="text-sm text-red-200/80">Welcome to Eurotel Makati</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out;
        }
      `}</style>
    </div>
  )
}

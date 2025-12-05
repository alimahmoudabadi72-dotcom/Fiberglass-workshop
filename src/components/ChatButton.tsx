'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ChatButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // نمایش دکمه بعد از اسکرول
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    
    // نمایش tooltip بعد از 3 ثانیه
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-3 animate-bounce-in">
          <div className="bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl text-sm font-medium whitespace-nowrap">
            سوالی دارید؟ با ما صحبت کنید!
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45" />
          </div>
        </div>
      )}
      
      {/* Button */}
      <Link
        href="/chat"
        className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* Pulse Effect */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white" />
        </div>
        <span className="font-semibold">گفتگو با ما</span>
      </Link>
    </div>
  )
}

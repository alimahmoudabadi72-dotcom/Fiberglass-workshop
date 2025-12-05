'use client'

import { useEffect, useState } from 'react'

export default function DateTimeClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // مخفی شدن هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!currentTime || !isVisible) {
    return null
  }

  // تبدیل به تاریخ شمسی
  const persianDate = currentTime.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // ساعت فارسی
  const persianTime = currentTime.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="absolute top-20 left-4 z-40 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-green-500/20">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-green-400 font-mono" dir="ltr">{persianTime}</span>
        <span className="text-green-500/50">|</span>
        <span className="text-gray-400">{persianDate}</span>
      </div>
    </div>
  )
}

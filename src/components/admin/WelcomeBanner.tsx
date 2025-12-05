'use client'

import { useState, useEffect } from 'react'

export default function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setIsVisible(true)
    
    // تعیین سلام بر اساس ساعت
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setGreeting('صبح بخیر')
      } else if (hour >= 12 && hour < 17) {
        setGreeting('ظهر بخیر')
      } else if (hour >= 17 && hour < 21) {
        setGreeting('عصر بخیر')
      } else {
        setGreeting('شب بخیر')
      }
    }

    // به‌روزرسانی ساعت
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }))
    }

    updateGreeting()
    updateTime()

    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // تاریخ شمسی
  const getPersianDate = () => {
    return new Date().toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          {/* Animated Circles */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Welcome Text */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {/* Online Status */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-indigo-600 animate-pulse" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/70 text-sm">{greeting}</span>
                <span className="text-xl">👋</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                آقای محمد علی غارسی
              </h1>
              <p className="text-white/70 text-sm">
                به پنل مدیریت کارگاه فایبرگلاس خوش آمدید
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-bold text-lg font-mono" dir="ltr">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{getPersianDate()}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">۴</div>
            <div className="text-white/60 text-xs">اعضای تیم</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-2xl font-bold text-white mb-1">فعال</div>
            <div className="text-white/60 text-xs">وضعیت سایت</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">۱۳۸۵</div>
            <div className="text-white/60 text-xs">سال تأسیس</div>
          </div>
        </div>
      </div>
    </div>
  )
}


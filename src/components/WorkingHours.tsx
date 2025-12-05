'use client'

import { useEffect, useRef, useState } from 'react'

export default function WorkingHours() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const schedule = [
    { day: 'شنبه', hours: '۸:۰۰ - ۱۷:۰۰', isOpen: true },
    { day: 'یکشنبه', hours: '۸:۰۰ - ۱۷:۰۰', isOpen: true },
    { day: 'دوشنبه', hours: '۸:۰۰ - ۱۷:۰۰', isOpen: true },
    { day: 'سه‌شنبه', hours: '۸:۰۰ - ۱۷:۰۰', isOpen: true },
    { day: 'چهارشنبه', hours: '۸:۰۰ - ۱۷:۰۰', isOpen: true },
    { day: 'پنجشنبه', hours: '۸:۰۰ - ۱۳:۰۰', isOpen: true },
    { day: 'جمعه', hours: 'تعطیل', isOpen: false },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Working Hours Card */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="glass rounded-3xl p-8 lg:p-10 animated-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">ساعات کاری</h3>
                  <p className="text-gray-400 text-sm">برنامه هفتگی کارگاه</p>
                </div>
              </div>

              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      item.isOpen 
                        ? 'bg-green-500/10 hover:bg-green-500/20' 
                        : 'bg-red-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.isOpen ? 'bg-green-400 pulse-green' : 'bg-red-400'}`} />
                      <span className="text-white font-medium">{item.day}</span>
                    </div>
                    <span className={`text-sm font-medium ${item.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    در روزهای تعطیل رسمی، کارگاه تعطیل می‌باشد. برای هماهنگی خارج از ساعات کاری با ما تماس بگیرید.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-green-400 font-semibold text-sm tracking-wider">زمان‌بندی</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
              همیشه در <span className="gradient-text">خدمت شما</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              کارگاه فایبرگلاس ما در تمام روزهای هفته به جز جمعه‌ها آماده ارائه خدمات به شما عزیزان است. تیم متخصص ما با تجربه و تخصص کافی، پروژه‌های شما را با بالاترین کیفیت و در کوتاه‌ترین زمان ممکن انجام می‌دهند.
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-5 text-center hover-card">
                <div className="text-3xl font-bold gradient-text mb-2">۶</div>
                <p className="text-gray-400 text-sm">روز در هفته</p>
              </div>
              <div className="glass rounded-xl p-5 text-center hover-card">
                <div className="text-3xl font-bold gradient-text mb-2">۹+</div>
                <p className="text-gray-400 text-sm">ساعت کاری روزانه</p>
              </div>
              <div className="glass rounded-xl p-5 text-center hover-card">
                <div className="text-3xl font-bold gradient-text mb-2">۲۴/۷</div>
                <p className="text-gray-400 text-sm">پشتیبانی تلفنی</p>
              </div>
              <div className="glass rounded-xl p-5 text-center hover-card">
                <div className="text-3xl font-bold gradient-text mb-2">سریع</div>
                <p className="text-gray-400 text-sm">پاسخگویی</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


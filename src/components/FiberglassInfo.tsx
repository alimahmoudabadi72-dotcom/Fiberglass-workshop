'use client'

import { useEffect, useRef, useState } from 'react'

export default function FiberglassInfo() {
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

  const infoCards = [
    {
      title: 'فایبرگلاس چیست؟',
      content: 'فایبرگلاس یا شیشه‌الیاف، ماده‌ای مرکب است که از الیاف شیشه و رزین پلیمری ساخته می‌شود. این ماده به دلیل سبکی، استحکام بالا و مقاومت در برابر خوردگی، کاربردهای فراوانی در صنایع مختلف دارد.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'ویژگی‌های فایبرگلاس',
      content: 'سبکی و استحکام بالا، مقاومت در برابر رطوبت و خوردگی، عایق حرارتی و الکتریکی، قابلیت شکل‌دهی در طرح‌های مختلف، دوام و طول عمر بالا، و نگهداری آسان از مهم‌ترین ویژگی‌های این ماده هستند.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: 'کاربردهای فایبرگلاس',
      content: 'صنایع خودروسازی و هوافضا، ساخت قایق و شناورها، مخازن ذخیره‌سازی، لوله‌کشی صنعتی، تجهیزات بهداشتی، المان‌های تزئینی و معماری، و بسیاری موارد دیگر از کاربردهای فایبرگلاس هستند.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ]

  const advantages = [
    'وزن کم نسبت به فلزات',
    'مقاومت بالا در برابر ضربه',
    'عدم زنگ‌زدگی و خوردگی',
    'عایق الکتریکی عالی',
    'مقاومت در برابر اشعه UV',
    'قابلیت رنگ‌آمیزی',
  ]

  return (
    <section id="services" ref={sectionRef} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-green-400 font-semibold text-sm tracking-wider">اطلاعات فنی</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            همه چیز درباره <span className="gradient-text">فایبرگلاس</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            فایبرگلاس یکی از پرکاربردترین مواد کامپوزیتی در صنایع مختلف است که با ویژگی‌های منحصر به فرد خود، جایگزین مناسبی برای فلزات و پلاستیک‌های معمولی شده است.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 hover-card transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-green-500/30">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{card.content}</p>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <div className={`glass rounded-3xl p-8 lg:p-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                مزایای استفاده از <span className="gradient-text">فایبرگلاس</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                فایبرگلاس با ترکیب ویژگی‌های منحصر به فرد خود، انتخابی هوشمندانه برای پروژه‌های صنعتی و تزئینی است. این ماده با دوام بالا و نیاز به نگهداری کم، در درازمدت صرفه‌جویی قابل توجهی را به همراه دارد.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                {/* Decorative Layers */}
                <div className="absolute inset-4 rounded-2xl border border-green-500/30 animate-pulse" />
                <div className="absolute inset-8 rounded-xl border border-green-500/20" />
                <div className="absolute inset-12 rounded-lg border border-green-500/10" />
                
                {/* Center Icon */}
                <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40 animate-float">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


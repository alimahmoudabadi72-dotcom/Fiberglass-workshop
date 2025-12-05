'use client'

import { useEffect, useRef, useState } from 'react'
import { getContactInfo, ContactInfo, addContactMessage } from '@/lib/contact'

// مقادیر پیش‌فرض
const DEFAULT_CONTACT: ContactInfo = {
  phone1: '۰۲۱-۱۲۳۴۵۶۷۸',
  phone2: '۰۹۱۲-۱۲۳-۴۵۶۷',
  email1: 'info@fiberglass-workshop.ir',
  email2: 'sales@fiberglass-workshop.ir',
  address: 'تهران، منطقه صنعتی',
  addressDetail: 'خیابان صنعت، پلاک ۱۲۳'
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  useEffect(() => {
    // Load contact info
    const loadData = () => {
      try {
        const data = getContactInfo()
        setContact(data)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading contact:', error)
        setContact(DEFAULT_CONTACT)
        setIsLoaded(true)
      }
    }

    loadData()

    // Update on changes
    const handleUpdate = () => {
      loadData()
    }

    window.addEventListener('contactUpdated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    // Poll for updates
    const interval = setInterval(loadData, 500)

    return () => {
      window.removeEventListener('contactUpdated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
      clearInterval(interval)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // اعتبارسنجی
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // ذخیره پیام
      addContactMessage({
        name: formData.name,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })
      
      // ریست فرم
      setFormData({ name: '', phone: '', subject: '', message: '' })
      setSubmitStatus('success')
      
      // مخفی کردن پیام موفقیت بعد از 5 ثانیه
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'تلفن تماس',
      value: contact.phone1,
      subValue: contact.phone2,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'ایمیل',
      value: contact.email1,
      subValue: contact.email2,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'آدرس',
      value: contact.address,
      subValue: contact.addressDetail,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-green-400 font-semibold text-sm tracking-wider">ارتباط با ما</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            با ما در <span className="gradient-text">تماس باشید</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            برای دریافت مشاوره رایگان، استعلام قیمت یا هرگونه سوال، با ما تماس بگیرید. کارشناسان ما آماده پاسخگویی به شما هستند.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-8 text-center hover-card transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-500/30">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-green-400 font-medium mb-1">{item.value}</p>
              <p className="text-gray-400 text-sm">{item.subValue}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass rounded-3xl p-8 lg:p-10 animated-border">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">فرم تماس سریع</h3>
            
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  خطا در ارسال پیام. لطفاً دوباره تلاش کنید.
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-300"
                    placeholder="نام خود را وارد کنید"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-300"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">موضوع</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-300"
                  placeholder="موضوع پیام خود را وارد کنید"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">پیام شما</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="پیام خود را بنویسید..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    ارسال پیام
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

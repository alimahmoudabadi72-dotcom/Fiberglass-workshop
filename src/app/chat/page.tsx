'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  createChat, 
  getChatByPhone, 
  getChatMessages, 
  sendMessage,
  ChatMessage,
  Chat
} from '@/lib/chat'

export default function CustomerChatPage() {
  const [step, setStep] = useState<'register' | 'chat'>('register')
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // فرم ثبت‌نام
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })

  // بررسی وجود چت قبلی
  useEffect(() => {
    const savedPhone = localStorage.getItem('customer_phone')
    if (savedPhone) {
      const existingChat = getChatByPhone(savedPhone)
      if (existingChat) {
        setChat(existingChat)
        setMessages(getChatMessages(existingChat.id))
        setStep('chat')
      }
    }
  }, [])

  // به‌روزرسانی پیام‌ها
  useEffect(() => {
    if (!chat) return

    const loadMessages = () => {
      const msgs = getChatMessages(chat.id)
      setMessages(msgs)
    }

    loadMessages()
    
    const interval = setInterval(loadMessages, 1000)
    window.addEventListener('messagesUpdated', loadMessages)

    return () => {
      clearInterval(interval)
      window.removeEventListener('messagesUpdated', loadMessages)
    }
  }, [chat])

  // اسکرول به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    setIsLoading(true)
    
    // ایجاد یا دریافت چت
    const newChat = createChat(formData.name, formData.phone)
    setChat(newChat)
    setMessages(getChatMessages(newChat.id))
    
    // ذخیره شماره تلفن برای دفعات بعدی
    localStorage.setItem('customer_phone', formData.phone)
    localStorage.setItem('customer_name', formData.name)
    
    setStep('chat')
    setIsLoading(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !chat) return

    sendMessage(chat.id, newMessage.trim(), 'customer')
    setNewMessage('')
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // گروه‌بندی پیام‌ها بر اساس تاریخ
  const groupMessagesByDate = (msgs: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {}
    
    msgs.forEach(msg => {
      const date = new Date(msg.createdAt).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })
    
    return groups
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-bold">پیام به مدیریت</h1>
                <p className="text-slate-500 text-xs">کارگاه فایبرگلاس</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {step === 'register' ? (
          /* Registration Form */
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">شروع گفتگو</h2>
              <p className="text-slate-400 text-center text-sm mb-8">
                برای شروع گفتگو با مدیریت کارگاه، اطلاعات خود را وارد کنید
              </p>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="نام خود را وارد کنید"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">شماره موبایل</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      شروع گفتگو
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <p className="text-slate-500 text-xs text-center mt-6">
                اطلاعات شما محفوظ است و فقط برای پاسخگویی استفاده می‌شود
              </p>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl h-[70vh] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">مدیریت کارگاه فایبرگلاس</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400 text-xs">آنلاین</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm">اولین پیام خود را ارسال کنید</p>
                    <p className="text-slate-500 text-xs mt-1">ما در اسرع وقت پاسخ خواهیم داد</p>
                  </div>
                ) : (
                  Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="flex items-center justify-center my-4">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">
                          {formatDate(msgs[0].createdAt)}
                        </span>
                      </div>
                      
                      {/* Messages */}
                      {msgs.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex mb-3 ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                              msg.sender === 'customer'
                                ? 'bg-slate-800 text-white rounded-tr-sm'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-tl-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                            <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                              <span className={`text-xs ${msg.sender === 'customer' ? 'text-slate-500' : 'text-green-100'}`}>
                                {formatTime(msg.createdAt)}
                              </span>
                              {msg.sender === 'customer' && (
                                <svg className={`w-4 h-4 ${msg.isRead ? 'text-blue-400' : 'text-slate-500'}`} fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="پیام خود را بنویسید..."
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

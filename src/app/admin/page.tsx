'use client'

import { useState, useEffect } from 'react'
import { getSettings, saveSettings, SiteSettings } from '@/lib/settings'
import Link from 'next/link'
import GalleryManager from '@/components/admin/GalleryManager'
import TeamManager from '@/components/admin/TeamManager'
import WelcomeBanner from '@/components/admin/WelcomeBanner'
import ContactManager from '@/components/admin/ContactManager'
import MessagesManager from '@/components/admin/MessagesManager'
import ChatManager from '@/components/admin/ChatManager'
import { getUnreadMessagesCount } from '@/lib/contact'
import { getTotalUnreadChats } from '@/lib/chat'

export default function AdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [lockMessage, setLockMessage] = useState('')
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [activeSection, setActiveSection] = useState<'settings' | 'gallery' | 'team' | 'contact' | 'messages' | 'chat' | 'dashboard'>('settings')
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [unreadChats, setUnreadChats] = useState(0)

  useEffect(() => {
    const currentSettings = getSettings()
    setSettings(currentSettings)
    setLockMessage(currentSettings.lockMessage)
    
    // Update unread messages count
    const updateUnread = () => {
      setUnreadMessages(getUnreadMessagesCount())
      setUnreadChats(getTotalUnreadChats())
    }
    updateUnread()
    
    window.addEventListener('messagesUpdated', updateUnread)
    window.addEventListener('chatsUpdated', updateUnread)
    window.addEventListener('storage', updateUnread)
    
    const interval = setInterval(updateUnread, 1000)
    
    return () => {
      window.removeEventListener('messagesUpdated', updateUnread)
      window.removeEventListener('chatsUpdated', updateUnread)
      window.removeEventListener('storage', updateUnread)
      clearInterval(interval)
    }
  }, [])

  const handleToggleLock = () => {
    if (!settings) return
    
    const newSettings: SiteSettings = {
      ...settings,
      isLocked: !settings.isLocked,
      lastUpdated: new Date().toISOString(),
    }
    saveSettings(newSettings)
    setSettings(newSettings)
    
    // Force update across tabs
    window.dispatchEvent(new Event('storage'))
    
    showSuccessMessage()
  }

  const handleSaveMessage = () => {
    if (!settings) return
    
    const newSettings: SiteSettings = {
      ...settings,
      lockMessage: lockMessage,
      lastUpdated: new Date().toISOString(),
    }
    saveSettings(newSettings)
    setSettings(newSettings)
    showSuccessMessage()
  }

  const showSuccessMessage = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-sm">تغییرات ذخیره شد</span>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-l border-slate-800 p-6 flex flex-col">
          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-bold">پنل مدیریت</h1>
                <div className="flex items-center gap-1">
                  <p className="text-slate-500 text-xs">کارگاه فایبرگلاس</p>
                  <span className="text-slate-600 text-xs">|</span>
                  <p className="text-slate-500 text-xs">ورود: محمد علی غارسی</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'settings'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              تنظیمات
            </button>

            <button
              onClick={() => setActiveSection('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'gallery'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              گالری
            </button>

            <button
              onClick={() => setActiveSection('team')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'team'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              تیم کارگاه
            </button>

            <button
              onClick={() => setActiveSection('contact')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'contact'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ارتباط با ما
            </button>

            <button
              onClick={() => setActiveSection('messages')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'messages'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                پیام‌ها
              </div>
              {unreadMessages > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                  {unreadMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('chat')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'chat'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                گفتگوها
              </div>
              {unreadChats > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-bold animate-pulse">
                  {unreadChats}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === 'dashboard'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              داشبورد
            </button>
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت به سایت
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {activeSection === 'settings' ? (
            <>
              {/* Welcome Banner - فقط در بخش تنظیمات */}
              <WelcomeBanner />
            <div className="max-w-3xl">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">تنظیمات</h2>
                <p className="text-slate-400 text-sm">مدیریت تنظیمات وبسایت</p>
              </div>

              {/* Site Lock Card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      settings.isLocked 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {settings.isLocked ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        )}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">قفل وبسایت</h3>
                      <p className="text-slate-500 text-sm">غیرفعال کردن دسترسی کاربران به وبسایت</p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={handleToggleLock}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.isLocked ? 'bg-red-500' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      settings.isLocked ? 'right-1' : 'right-8'
                    }`} />
                  </button>
                </div>

                {/* Status */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  settings.isLocked 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${settings.isLocked ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`} />
                  {settings.isLocked ? 'وبسایت قفل است - کاربران نمی‌توانند وارد شوند' : 'وبسایت فعال است'}
                </div>
              </div>

              {/* Lock Message Card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">پیام قفل</h3>
                    <p className="text-slate-500 text-sm">پیامی که هنگام قفل بودن نمایش داده می‌شود</p>
                  </div>
                </div>

                <textarea
                  value={lockMessage}
                  onChange={(e) => setLockMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none mb-4"
                  placeholder="پیام خود را وارد کنید..."
                />

                <div className="flex items-center justify-between">
                  <div className="text-slate-500 text-xs">
                    این پیام به کاربران نمایش داده می‌شود
                  </div>
                  <button
                    onClick={handleSaveMessage}
                    className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ذخیره
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 text-slate-600 text-xs text-center">
                آخرین بروزرسانی: {new Date(settings.lastUpdated).toLocaleDateString('fa-IR')} ساعت {new Date(settings.lastUpdated).toLocaleTimeString('fa-IR')}
              </div>
            </div>
            </>
          ) : activeSection === 'gallery' ? (
            <GalleryManager />
          ) : activeSection === 'team' ? (
            <TeamManager />
          ) : activeSection === 'contact' ? (
            <ContactManager />
          ) : activeSection === 'messages' ? (
            <MessagesManager />
          ) : activeSection === 'chat' ? (
            <ChatManager />
          ) : (
            /* Dashboard */
            <div className="max-w-3xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">داشبورد</h2>
                <p className="text-slate-400 text-sm">نمای کلی وبسایت</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">به زودی...</h3>
                <p className="text-slate-500 text-sm">این بخش در حال توسعه است</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

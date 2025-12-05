'use client'

import { useState, useEffect } from 'react'
import { 
  getContactMessages, 
  markMessageAsRead, 
  deleteContactMessage,
  ContactMessage 
} from '@/lib/contact'

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadMessages()

    // Listen for updates
    const handleUpdate = () => loadMessages()
    window.addEventListener('messagesUpdated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('messagesUpdated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const loadMessages = () => {
    const msgs = getContactMessages()
    setMessages(msgs)
  }

  const handleOpenMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markMessageAsRead(message.id)
      loadMessages()
    }
  }

  const handleDelete = (id: string) => {
    deleteContactMessage(id)
    loadMessages()
    setShowDeleteConfirm(null)
    setSelectedMessage(null)
    showSuccessMessage('پیام با موفقیت حذف شد')
  }

  const showSuccessMessage = (msg: string) => {
    setShowSuccess(msg)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="max-w-5xl">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-sm">{showSuccess}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">پیام‌های دریافتی</h2>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
              {unreadCount} جدید
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm">پیام‌های ارسال شده از فرم تماس سریع</p>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-12 text-center">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">پیامی وجود ندارد</h3>
          <p className="text-slate-500 text-sm">هنوز پیامی از طریق فرم تماس دریافت نشده است</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Messages List */}
          <div className="space-y-3">
            <h3 className="text-white font-medium mb-4">{messages.length} پیام</h3>
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleOpenMessage(message)}
                className={`bg-slate-900/50 backdrop-blur-xl rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:border-slate-600 ${
                  !message.isRead 
                    ? 'border-blue-500/50 bg-blue-500/5' 
                    : 'border-slate-800'
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      !message.isRead ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{message.name}</h4>
                      <p className="text-slate-500 text-xs">{message.phone}</p>
                    </div>
                  </div>
                  {!message.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </div>
                <p className="text-slate-300 text-sm font-medium mb-1 truncate">{message.subject}</p>
                <p className="text-slate-500 text-xs truncate">{message.message}</p>
                <p className="text-slate-600 text-xs mt-2">{formatDate(message.createdAt)}</p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-8">
            {selectedMessage ? (
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-slate-800">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                        {selectedMessage.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{selectedMessage.name}</h3>
                        <p className="text-slate-400 text-sm">{selectedMessage.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(selectedMessage.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-4">
                    <label className="block text-slate-500 text-xs mb-1">موضوع</label>
                    <p className="text-white font-medium">{selectedMessage.subject}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-slate-500 text-xs mb-1">پیام</label>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="text-slate-500 text-xs">
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 border-t border-slate-800 flex gap-3">
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    تماس تلفنی
                  </a>
                  <a
                    href={`sms:${selectedMessage.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    ارسال پیامک
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">یک پیام را انتخاب کنید</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">حذف پیام</h3>
            <p className="text-slate-400 text-sm mb-6">آیا از حذف این پیام اطمینان دارید؟</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

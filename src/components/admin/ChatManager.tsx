'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  getChats, 
  getChatMessages, 
  sendMessage, 
  markChatAsRead,
  deleteChat,
  Chat,
  ChatMessage,
  getTotalUnreadChats
} from '@/lib/chat'

export default function ChatManager() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // بارگذاری چت‌ها
  useEffect(() => {
    loadChats()

    const handleUpdate = () => loadChats()
    window.addEventListener('chatsUpdated', handleUpdate)
    
    const interval = setInterval(loadChats, 1000)

    return () => {
      window.removeEventListener('chatsUpdated', handleUpdate)
      clearInterval(interval)
    }
  }, [])

  // بارگذاری پیام‌ها
  useEffect(() => {
    if (!selectedChat) return

    const loadMessages = () => {
      const msgs = getChatMessages(selectedChat.id)
      setMessages(msgs)
    }

    loadMessages()
    
    const interval = setInterval(loadMessages, 500)
    window.addEventListener('messagesUpdated', loadMessages)

    return () => {
      clearInterval(interval)
      window.removeEventListener('messagesUpdated', loadMessages)
    }
  }, [selectedChat])

  // اسکرول به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadChats = () => {
    const allChats = getChats()
    setChats(allChats)
  }

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setMessages(getChatMessages(chat.id))
    markChatAsRead(chat.id)
    loadChats()
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChat) return

    sendMessage(selectedChat.id, newMessage.trim(), 'admin')
    setNewMessage('')
  }

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId)
    if (selectedChat?.id === chatId) {
      setSelectedChat(null)
      setMessages([])
    }
    loadChats()
    setShowDeleteConfirm(null)
    showSuccessMessage('گفتگو با موفقیت حذف شد')
  }

  const showSuccessMessage = (msg: string) => {
    setShowSuccess(msg)
    setTimeout(() => setShowSuccess(null), 3000)
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
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'امروز'
    if (days === 1) return 'دیروز'
    if (days < 7) return `${days} روز پیش`
    
    return date.toLocaleDateString('fa-IR', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // گروه‌بندی پیام‌ها
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

  const totalUnread = getTotalUnreadChats()

  return (
    <div className="max-w-6xl">
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
          <h2 className="text-2xl font-bold text-white">گفتگوها</h2>
          {totalUnread > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
              {totalUnread} پیام جدید
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm">مدیریت گفتگو با مشتریان و مخاطبین</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden h-[70vh] flex">
        {/* Chat List */}
        <div className="w-80 border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-white font-medium">{chats.length} گفتگو</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">گفتگویی وجود ندارد</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-4 border-b border-slate-800/50 cursor-pointer transition-colors hover:bg-slate-800/50 ${
                    selectedChat?.id === chat.id ? 'bg-slate-800/70' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {chat.customerName.charAt(0)}
                      </div>
                      {chat.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium text-sm truncate">{chat.customerName}</h4>
                        <span className="text-slate-500 text-xs">{formatDate(chat.lastMessageTime)}</span>
                      </div>
                      <p className="text-slate-400 text-xs truncate">{chat.lastMessage || 'گفتگو شروع شد'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {selectedChat.customerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{selectedChat.customerName}</h3>
                    <p className="text-slate-400 text-xs">{selectedChat.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedChat.customerPhone}`}
                    className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                    title="تماس تلفنی"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setShowDeleteConfirm(selectedChat.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                    title="حذف گفتگو"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <p className="text-slate-500 text-sm">هنوز پیامی ارسال نشده</p>
                  </div>
                ) : (
                  Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="flex items-center justify-center my-4">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">
                          {formatFullDate(msgs[0].createdAt)}
                        </span>
                      </div>
                      
                      {/* Messages */}
                      {msgs.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex mb-3 ${msg.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                              msg.sender === 'admin'
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-sm'
                                : 'bg-slate-800 text-white rounded-tl-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-blue-100' : 'text-slate-500'}`}>
                              {formatTime(msg.createdAt)}
                            </p>
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
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="پاسخ خود را بنویسید..."
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-slate-800 flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">گفتگویی انتخاب نشده</h3>
              <p className="text-slate-500 text-sm">یک گفتگو از لیست سمت راست انتخاب کنید</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">حذف گفتگو</h3>
            <p className="text-slate-400 text-sm mb-6">آیا از حذف این گفتگو اطمینان دارید؟ تمام پیام‌ها حذف خواهند شد.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDeleteChat(showDeleteConfirm)}
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

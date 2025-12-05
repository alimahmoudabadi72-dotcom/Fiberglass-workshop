// سیستم چت پیامکی بین مخاطبین و مدیریت

export interface ChatMessage {
  id: string
  chatId: string
  sender: 'customer' | 'admin'
  message: string
  createdAt: string
  isRead: boolean
}

export interface Chat {
  id: string
  customerName: string
  customerPhone: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  createdAt: string
}

const CHATS_KEY = 'fiberglass_chats'
const MESSAGES_KEY = 'fiberglass_chat_messages'

// تولید ID یکتا
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// ========== مدیریت چت‌ها ==========

// دریافت همه چت‌ها
export function getChats(): Chat[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(CHATS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  } catch (error) {
    console.error('Error reading chats:', error)
    return []
  }
}

// دریافت یک چت با ID
export function getChatById(chatId: string): Chat | null {
  const chats = getChats()
  return chats.find(c => c.id === chatId) || null
}

// دریافت چت با شماره تلفن
export function getChatByPhone(phone: string): Chat | null {
  const chats = getChats()
  return chats.find(c => c.customerPhone === phone) || null
}

// ذخیره چت‌ها
function saveChats(chats: Chat[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  window.dispatchEvent(new CustomEvent('chatsUpdated'))
}

// ایجاد چت جدید
export function createChat(customerName: string, customerPhone: string): Chat {
  const chats = getChats()
  
  // بررسی وجود چت قبلی
  const existingChat = chats.find(c => c.customerPhone === customerPhone)
  if (existingChat) {
    return existingChat
  }
  
  const newChat: Chat = {
    id: generateId(),
    customerName,
    customerPhone,
    lastMessage: '',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    createdAt: new Date().toISOString(),
  }
  
  chats.unshift(newChat)
  saveChats(chats)
  
  return newChat
}

// به‌روزرسانی آخرین پیام چت
function updateChatLastMessage(chatId: string, message: string, isFromCustomer: boolean): void {
  const chats = getChats()
  const index = chats.findIndex(c => c.id === chatId)
  
  if (index !== -1) {
    chats[index].lastMessage = message
    chats[index].lastMessageTime = new Date().toISOString()
    if (isFromCustomer) {
      chats[index].unreadCount += 1
    }
    
    // انتقال به بالای لیست
    const chat = chats.splice(index, 1)[0]
    chats.unshift(chat)
    
    saveChats(chats)
  }
}

// صفر کردن تعداد پیام‌های خوانده نشده
export function markChatAsRead(chatId: string): void {
  const chats = getChats()
  const index = chats.findIndex(c => c.id === chatId)
  
  if (index !== -1) {
    chats[index].unreadCount = 0
    saveChats(chats)
  }
  
  // علامت‌گذاری همه پیام‌های مشتری به عنوان خوانده شده
  const messages = getChatMessages(chatId)
  const updatedMessages = messages.map(m => ({
    ...m,
    isRead: m.sender === 'customer' ? true : m.isRead
  }))
  saveChatMessages(chatId, updatedMessages)
}

// حذف چت
export function deleteChat(chatId: string): void {
  const chats = getChats().filter(c => c.id !== chatId)
  saveChats(chats)
  
  // حذف پیام‌های چت
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${MESSAGES_KEY}_${chatId}`)
  }
}

// ========== مدیریت پیام‌ها ==========

// دریافت پیام‌های یک چت
export function getChatMessages(chatId: string): ChatMessage[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`${MESSAGES_KEY}_${chatId}`)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  } catch (error) {
    console.error('Error reading messages:', error)
    return []
  }
}

// ذخیره پیام‌های یک چت
function saveChatMessages(chatId: string, messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${MESSAGES_KEY}_${chatId}`, JSON.stringify(messages))
  window.dispatchEvent(new CustomEvent('messagesUpdated'))
}

// ارسال پیام
export function sendMessage(chatId: string, message: string, sender: 'customer' | 'admin'): ChatMessage {
  const messages = getChatMessages(chatId)
  
  const newMessage: ChatMessage = {
    id: generateId(),
    chatId,
    sender,
    message,
    createdAt: new Date().toISOString(),
    isRead: false,
  }
  
  messages.push(newMessage)
  saveChatMessages(chatId, messages)
  
  // به‌روزرسانی آخرین پیام چت
  updateChatLastMessage(chatId, message, sender === 'customer')
  
  return newMessage
}

// تعداد کل پیام‌های خوانده نشده (برای مدیر)
export function getTotalUnreadChats(): number {
  const chats = getChats()
  return chats.reduce((total, chat) => total + chat.unreadCount, 0)
}

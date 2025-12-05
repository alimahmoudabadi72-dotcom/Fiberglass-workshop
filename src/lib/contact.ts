// Contact Information Management

export interface ContactInfo {
  phone1: string
  phone2: string
  email1: string
  email2: string
  address: string
  addressDetail: string
}

// پیام‌های تماس از فرم
export interface ContactMessage {
  id: string
  name: string
  phone: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

const STORAGE_KEY = 'fiberglass_contact'
const MESSAGES_KEY = 'fiberglass_messages'

const DEFAULT_CONTACT: ContactInfo = {
  phone1: '۰۲۱-۱۲۳۴۵۶۷۸',
  phone2: '۰۹۱۲-۱۲۳-۴۵۶۷',
  email1: 'info@fiberglass-workshop.ir',
  email2: 'sales@fiberglass-workshop.ir',
  address: 'تهران، منطقه صنعتی',
  addressDetail: 'خیابان صنعت، پلاک ۱۲۳'
}

export function getContactInfo(): ContactInfo {
  if (typeof window === 'undefined') {
    return DEFAULT_CONTACT
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // اطمینان از اینکه داده معتبر است
      if (parsed && typeof parsed === 'object' && parsed.phone1) {
        return parsed
      }
    }
    // اگر داده‌ای نبود، داده‌های پیش‌فرض را ذخیره و برگردان
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTACT))
    return DEFAULT_CONTACT
  } catch (error) {
    console.error('Error reading contact:', error)
    return DEFAULT_CONTACT
  }
}

export function saveContactInfo(contact: ContactInfo): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contact))
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('contactUpdated'))
    window.dispatchEvent(new Event('storage'))
  } catch (error) {
    console.error('Error saving contact:', error)
  }
}

// ========== مدیریت پیام‌های تماس ==========

// تولید ID یکتا
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// دریافت همه پیام‌ها
export function getContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(MESSAGES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  } catch (error) {
    console.error('Error reading messages:', error)
    return []
  }
}

// ذخیره پیام جدید
export function addContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
  const messages = getContactMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: generateId(),
    createdAt: new Date().toISOString(),
    isRead: false,
  }
  messages.unshift(newMessage) // اضافه کردن به ابتدای لیست
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
    window.dispatchEvent(new CustomEvent('messagesUpdated'))
  }
  
  return newMessage
}

// علامت‌گذاری پیام به عنوان خوانده شده
export function markMessageAsRead(id: string): void {
  const messages = getContactMessages()
  const index = messages.findIndex(m => m.id === id)
  
  if (index !== -1) {
    messages[index].isRead = true
    if (typeof window !== 'undefined') {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
      window.dispatchEvent(new CustomEvent('messagesUpdated'))
    }
  }
}

// حذف پیام
export function deleteContactMessage(id: string): boolean {
  const messages = getContactMessages()
  const filtered = messages.filter(m => m.id !== id)
  
  if (filtered.length === messages.length) return false
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(filtered))
    window.dispatchEvent(new CustomEvent('messagesUpdated'))
  }
  
  return true
}

// تعداد پیام‌های خوانده نشده
export function getUnreadMessagesCount(): number {
  const messages = getContactMessages()
  return messages.filter(m => !m.isRead).length
}

// سیستم مدیریت گالری

export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  title: string
  description: string
  createdAt: string
}

const GALLERY_KEY = 'fiberglass_gallery'

// تولید ID یکتا
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// دریافت همه آیتم‌های گالری
export function getGalleryItems(): GalleryItem[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    const stored = localStorage.getItem(GALLERY_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error reading gallery:', error)
  }
  
  return []
}

// ذخیره همه آیتم‌ها
export function saveGalleryItems(items: GalleryItem[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving gallery:', error)
  }
}

// اضافه کردن آیتم جدید
export function addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
  const items = getGalleryItems()
  const newItem: GalleryItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  items.unshift(newItem) // اضافه کردن به ابتدای لیست
  saveGalleryItems(items)
  return newItem
}

// ویرایش آیتم
export function updateGalleryItem(id: string, updates: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>): GalleryItem | null {
  const items = getGalleryItems()
  const index = items.findIndex(item => item.id === id)
  
  if (index === -1) return null
  
  items[index] = { ...items[index], ...updates }
  saveGalleryItems(items)
  return items[index]
}

// حذف آیتم
export function deleteGalleryItem(id: string): boolean {
  const items = getGalleryItems()
  const filteredItems = items.filter(item => item.id !== id)
  
  if (filteredItems.length === items.length) return false
  
  saveGalleryItems(filteredItems)
  return true
}

// دریافت یک آیتم با ID
export function getGalleryItem(id: string): GalleryItem | null {
  const items = getGalleryItems()
  return items.find(item => item.id === id) || null
}


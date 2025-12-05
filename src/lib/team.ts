// سیستم مدیریت تیم کارگاه

export interface TeamMember {
  id: string
  name: string
  role: string
  color: 'orange' | 'blue' | 'purple' | 'emerald' | 'pink' | 'cyan' | 'yellow' | 'red'
  createdAt: string
  // اطلاعات جدید
  bio?: string // بیوگرافی کوتاه
  experience?: string // سال‌های تجربه
  skills?: string[] // مهارت‌ها
  description?: string // توضیحات کامل درباره کار
  achievements?: string[] // دستاوردها
  phone?: string // شماره تماس (اختیاری)
  image?: string // تصویر پروفایل (base64)
}

const TEAM_KEY = 'fiberglass_team'

// تولید ID یکتا
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// انتخاب رنگ خودکار بر اساس تعداد اعضای فعلی
export function getAutoColor(memberCount: number): TeamMember['color'] {
  const colors: TeamMember['color'][] = ['orange', 'blue', 'purple', 'emerald', 'pink', 'cyan', 'yellow', 'red']
  return colors[memberCount % colors.length]
}

// داده‌های پیش‌فرض
const DEFAULT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'علی غارسی',
    role: 'جوشکار',
    color: 'orange',
    createdAt: new Date().toISOString(),
    bio: 'متخصص جوشکاری با بیش از ۱۰ سال تجربه در صنعت فایبرگلاس',
    experience: '۱۰',
    skills: ['جوشکاری آرگون', 'جوشکاری CO2', 'برشکاری', 'ساخت سازه‌های فلزی'],
    description: 'علی غارسی یکی از باتجربه‌ترین جوشکاران کارگاه است که در زمینه جوشکاری انواع فلزات و ساخت سازه‌های فلزی تخصص دارد. ایشان با دقت و ظرافت بالا، کیفیت کار را در اولویت قرار می‌دهد.',
    achievements: ['بیش از ۵۰۰ پروژه موفق', 'گواهینامه جوشکاری حرفه‌ای', 'برنده جایزه بهترین جوشکار سال ۱۴۰۰'],
  },
  {
    id: '2',
    name: 'میلاد غارسی',
    role: 'فایبر و جوشکاری',
    color: 'blue',
    createdAt: new Date().toISOString(),
    bio: 'متخصص کار با فایبرگلاس و جوشکاری صنعتی',
    experience: '۸',
    skills: ['کار با فایبرگلاس', 'ساخت قالب', 'جوشکاری', 'رزین‌کاری'],
    description: 'میلاد غارسی در زمینه کار با فایبرگلاس و ساخت قطعات کامپوزیتی تخصص دارد. ترکیب مهارت‌های فایبرکاری و جوشکاری او را به یک نیروی چندمنظوره و ارزشمند تبدیل کرده است.',
    achievements: ['تخصص در ساخت قطعات سفارشی', 'آموزش بیش از ۲۰ کارآموز', 'همکاری در پروژه‌های صنعتی بزرگ'],
  },
  {
    id: '3',
    name: 'علی محمدآبادی',
    role: 'بازاریاب و طراح',
    color: 'purple',
    createdAt: new Date().toISOString(),
    bio: 'متخصص بازاریابی و طراحی محصولات فایبرگلاس',
    experience: '۵',
    skills: ['بازاریابی دیجیتال', 'طراحی محصول', 'مذاکره فروش', 'طراحی گرافیک'],
    description: 'علی محمدآبادی مسئول بازاریابی و طراحی محصولات کارگاه است. ایشان با شناخت نیازهای بازار و مشتریان، در توسعه محصولات جدید و جذب مشتری نقش کلیدی دارد.',
    achievements: ['افزایش ۱۵۰٪ فروش در سال گذشته', 'طراحی بیش از ۳۰ محصول جدید', 'ایجاد شبکه گسترده مشتریان'],
  },
  {
    id: '4',
    name: 'غلامرضا موسی',
    role: 'نقاش',
    color: 'emerald',
    createdAt: new Date().toISOString(),
    bio: 'متخصص رنگ‌آمیزی و پوشش‌دهی قطعات فایبرگلاس',
    experience: '۱۲',
    skills: ['رنگ‌آمیزی صنعتی', 'پوشش ژل‌کوت', 'پولیش و براق‌کاری', 'ترمیم رنگ'],
    description: 'غلامرضا موسی با بیش از ۱۲ سال تجربه در رنگ‌آمیزی صنعتی، مسئول مرحله نهایی تولید یعنی رنگ‌آمیزی و پرداخت قطعات است. کار او تضمین‌کننده زیبایی و دوام محصولات نهایی است.',
    achievements: ['استاد رنگ‌آمیزی با کیفیت بالا', 'تخصص در رنگ‌های خاص و سفارشی', 'صفر درصد برگشتی به دلیل کیفیت رنگ'],
  },
]

// دریافت همه اعضای تیم
export function getTeamMembers(): TeamMember[] {
  if (typeof window === 'undefined') {
    return DEFAULT_TEAM
  }
  
  try {
    const stored = localStorage.getItem(TEAM_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // اگر آرایه معتبر بود برگردان
      if (Array.isArray(parsed) && parsed.length > 0) {
        // اطمینان از وجود فیلدهای جدید
        return parsed.map((member: TeamMember, index: number) => ({
          ...DEFAULT_TEAM[index] || {},
          ...member,
        }))
      }
    }
    // اگر داده‌ای نبود یا خالی بود، داده‌های پیش‌فرض را ذخیره و برگردان
    localStorage.setItem(TEAM_KEY, JSON.stringify(DEFAULT_TEAM))
    return DEFAULT_TEAM
  } catch (error) {
    console.error('Error reading team:', error)
    return DEFAULT_TEAM
  }
}

// دریافت یک عضو با ID
export function getTeamMemberById(id: string): TeamMember | null {
  const members = getTeamMembers()
  return members.find(m => m.id === id) || null
}

// ذخیره همه اعضا
export function saveTeamMembers(members: TeamMember[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(TEAM_KEY, JSON.stringify(members))
    // Dispatch event for real-time updates
    window.dispatchEvent(new CustomEvent('teamUpdated'))
    window.dispatchEvent(new Event('storage'))
  } catch (error) {
    console.error('Error saving team:', error)
  }
}

// اضافه کردن عضو جدید
export function addTeamMember(member: Omit<TeamMember, 'id' | 'createdAt'>): TeamMember {
  const members = getTeamMembers()
  const newMember: TeamMember = {
    ...member,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  members.push(newMember)
  saveTeamMembers(members)
  return newMember
}

// ویرایش عضو
export function updateTeamMember(id: string, updates: Partial<Omit<TeamMember, 'id' | 'createdAt'>>): TeamMember | null {
  const members = getTeamMembers()
  const index = members.findIndex(m => m.id === id)
  
  if (index === -1) return null
  
  members[index] = { ...members[index], ...updates }
  saveTeamMembers(members)
  return members[index]
}

// حذف عضو
export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers()
  const filteredMembers = members.filter(m => m.id !== id)
  
  if (filteredMembers.length === members.length) return false
  
  saveTeamMembers(filteredMembers)
  return true
}

// ریست کردن به داده‌های پیش‌فرض
export function resetTeamToDefault(): TeamMember[] {
  saveTeamMembers(DEFAULT_TEAM)
  return DEFAULT_TEAM
}

// لیست رنگ‌ها
export const TEAM_COLORS = [
  { value: 'orange', label: 'نارنجی', gradient: 'from-orange-400 to-red-500' },
  { value: 'blue', label: 'آبی', gradient: 'from-blue-400 to-cyan-500' },
  { value: 'purple', label: 'بنفش', gradient: 'from-purple-400 to-pink-500' },
  { value: 'emerald', label: 'سبز', gradient: 'from-emerald-400 to-teal-500' },
  { value: 'pink', label: 'صورتی', gradient: 'from-pink-400 to-rose-500' },
  { value: 'cyan', label: 'فیروزه‌ای', gradient: 'from-cyan-400 to-blue-500' },
  { value: 'yellow', label: 'زرد', gradient: 'from-yellow-400 to-orange-500' },
  { value: 'red', label: 'قرمز', gradient: 'from-red-400 to-rose-600' },
] as const

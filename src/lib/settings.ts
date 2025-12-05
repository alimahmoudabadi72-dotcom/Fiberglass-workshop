// تنظیمات وبسایت

export interface SiteSettings {
  isLocked: boolean
  lockMessage: string
  lastUpdated: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  isLocked: false,
  lockMessage: 'وبسایت در حال توسعه و بروزرسانی است. از صبر و شکیبایی شما سپاسگزاریم.',
  lastUpdated: new Date().toISOString(),
}

const SETTINGS_KEY = 'fiberglass_site_settings'

export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS
  }
  
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error reading settings:', error)
  }
  
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return
  
  try {
    settings.lastUpdated = new Date().toISOString()
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}

export function toggleSiteLock(isLocked: boolean): SiteSettings {
  const settings = getSettings()
  settings.isLocked = isLocked
  saveSettings(settings)
  return settings
}

export function updateLockMessage(message: string): SiteSettings {
  const settings = getSettings()
  settings.lockMessage = message
  saveSettings(settings)
  return settings
}


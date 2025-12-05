'use client'

import { useEffect, useState } from 'react'
import { getSettings, SiteSettings } from '@/lib/settings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FiberglassInfo from '@/components/FiberglassInfo'
import Gallery from '@/components/Gallery'
import TeamSection from '@/components/TeamSection'
import WorkingHours from '@/components/WorkingHours'
import ManagerInfo from '@/components/ManagerInfo'
import ContactSection from '@/components/ContactSection'
import MaintenanceMode from '@/components/MaintenanceMode'
import DateTimeClock from '@/components/DateTimeClock'
import ChatButton from '@/components/ChatButton'

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial settings
    const currentSettings = getSettings()
    setSettings(currentSettings)
    setIsLoading(false)

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSettings = getSettings()
      setSettings(newSettings)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Update settings check
  useEffect(() => {
    const interval = setInterval(() => {
      const newSettings = getSettings()
      setSettings(newSettings)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Maintenance mode
  if (settings?.isLocked) {
    return <MaintenanceMode message={settings.lockMessage} />
  }

  // Normal view
  return (
    <>
      <Navbar />
      <DateTimeClock />
      <main>
        <HeroSection />
        <AboutSection />
        <FiberglassInfo />
        <Gallery />
        <TeamSection />
        <WorkingHours />
        <ManagerInfo />
        <ContactSection />
      </main>
      <ChatButton />
      <Footer />
    </>
  )
}

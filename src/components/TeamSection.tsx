'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getTeamMembers, TeamMember, TEAM_COLORS } from '@/lib/team'

// داده‌های پیش‌فرض
const DEFAULT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'علی غارسی',
    role: 'جوشکار',
    color: 'orange',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'میلاد غارسی',
    role: 'فایبر و جوشکاری',
    color: 'blue',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'علی محمدآبادی',
    role: 'بازاریاب و طراح',
    color: 'purple',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'غلامرضا موسی',
    role: 'نقاش',
    color: 'emerald',
    createdAt: new Date().toISOString(),
  },
]

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [members, setMembers] = useState<TeamMember[]>(DEFAULT_TEAM)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Load initial data
    const loadData = () => {
      try {
        const teamMembers = getTeamMembers()
        if (teamMembers && teamMembers.length > 0) {
          setMembers(teamMembers)
        }
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading team:', error)
        setMembers(DEFAULT_TEAM)
        setIsLoaded(true)
      }
    }

    loadData()

    // Check for updates every 500ms
    const interval = setInterval(loadData, 500)

    // Listen for storage changes
    const handleStorage = () => {
      loadData()
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('teamUpdated', handleStorage)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('teamUpdated', handleStorage)
    }
  }, [])

  const getColorGradient = (color: string) => {
    return TEAM_COLORS.find(c => c.value === color)?.gradient || 'from-blue-400 to-cyan-500'
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; shadow: string; border: string }> = {
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', shadow: 'shadow-orange-500/30', border: 'border-orange-500/30' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', shadow: 'shadow-blue-500/30', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', shadow: 'shadow-purple-500/30', border: 'border-purple-500/30' },
      emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', shadow: 'shadow-emerald-500/30', border: 'border-emerald-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', shadow: 'shadow-pink-500/30', border: 'border-pink-500/30' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', shadow: 'shadow-cyan-500/30', border: 'border-cyan-500/30' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', shadow: 'shadow-yellow-500/30', border: 'border-yellow-500/30' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', shadow: 'shadow-red-500/30', border: 'border-red-500/30' },
    }
    return colors[color] || colors.blue
  }

  const getIcon = (role: string) => {
    const roleLower = role.toLowerCase()
    
    if (roleLower.includes('جوش')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      )
    }
    if (roleLower.includes('فایبر')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
    if (roleLower.includes('نقاش') || roleLower.includes('رنگ')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
    if (roleLower.includes('بازاریاب') || roleLower.includes('طراح') || roleLower.includes('فروش')) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
    // Default icon
    return (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  // تعیین تعداد ستون‌ها بر اساس تعداد اعضا
  const getGridCols = () => {
    if (members.length === 1) return 'grid-cols-1 max-w-sm mx-auto'
    if (members.length === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
    if (members.length === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto'
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section ref={sectionRef} id="team" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm text-gray-300">همکاران ما</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            تیم <span className="gradient-text">متخصص</span> کارگاه
          </h2>
          <p className="text-gray-400 leading-relaxed">
            افتخار ما همکاری با تیمی از متخصصین با تجربه و متعهد است که با عشق و دقت، بهترین محصولات را تولید می‌کنند
          </p>
        </div>

        {/* Team Grid */}
        <div className={`grid ${getGridCols()} gap-6`}>
          {members.map((member, index) => {
            const colorClasses = getColorClasses(member.color)
            const gradient = getColorGradient(member.color)
            return (
              <Link
                href={`/team/${member.id}`}
                key={member.id}
                className={`group relative transition-all duration-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative glass rounded-3xl p-6 h-full hover-card overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-gradient-to-r ${gradient} opacity-60`} />

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${gradient} p-[2px] shadow-lg ${colorClasses.shadow} group-hover:scale-110 transition-transform duration-500`}>
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                          <div className={colorClasses.text}>
                            {getIcon(member.role)}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Status Dot */}
                    <div className={`absolute bottom-0 right-1/2 translate-x-6 w-4 h-4 rounded-full bg-gradient-to-br ${gradient} border-2 border-slate-900`} />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {member.name}
                    </h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colorClasses.bg} ${colorClasses.border} border`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                      <span className={`text-sm font-medium ${colorClasses.text}`}>{member.role}</span>
                    </div>
                  </div>

                  {/* View More Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      مشاهده پروفایل
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-1">{members.length}</div>
                <div className="text-gray-400 text-sm">نفر متخصص</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-1">+۱۵</div>
                <div className="text-gray-400 text-sm">سال تجربه</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-1">+۵۰۰</div>
                <div className="text-gray-400 text-sm">پروژه موفق</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-1">۱۰۰٪</div>
                <div className="text-gray-400 text-sm">رضایت مشتری</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

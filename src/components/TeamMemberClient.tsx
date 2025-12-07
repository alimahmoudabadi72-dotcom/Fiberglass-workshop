'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTeamMemberById, TeamMember, TEAM_COLORS } from '@/lib/team'

interface TeamMemberClientProps {
  id: string
}

export default function TeamMemberClient({ id }: TeamMemberClientProps) {
  const [member, setMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundMember = getTeamMemberById(id)
      setMember(foundMember)
      setIsLoading(false)
    }
  }, [id])

  const getColorGradient = (color: string) => {
    return TEAM_COLORS.find(c => c.value === color)?.gradient || 'from-blue-400 to-cyan-500'
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; shadow: string; border: string; bgLight: string }> = {
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', shadow: 'shadow-orange-500/30', border: 'border-orange-500/30', bgLight: 'bg-orange-500/10' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', shadow: 'shadow-blue-500/30', border: 'border-blue-500/30', bgLight: 'bg-blue-500/10' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', shadow: 'shadow-purple-500/30', border: 'border-purple-500/30', bgLight: 'bg-purple-500/10' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', shadow: 'shadow-emerald-500/30', border: 'border-emerald-500/30', bgLight: 'bg-emerald-500/10' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-400', shadow: 'shadow-pink-500/30', border: 'border-pink-500/30', bgLight: 'bg-pink-500/10' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', shadow: 'shadow-cyan-500/30', border: 'border-cyan-500/30', bgLight: 'bg-cyan-500/10' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-400', shadow: 'shadow-yellow-500/30', border: 'border-yellow-500/30', bgLight: 'bg-yellow-500/10' },
      red: { bg: 'bg-red-500', text: 'text-red-400', shadow: 'shadow-red-500/30', border: 'border-red-500/30', bgLight: 'bg-red-500/10' },
    }
    return colors[color] || colors.blue
  }

  const getIcon = (role: string) => {
    const roleLower = role.toLowerCase()
    
    if (roleLower.includes('جوش')) {
      return (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      )
    }
    if (roleLower.includes('فایبر')) {
      return (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
    if (roleLower.includes('نقاش') || roleLower.includes('رنگ')) {
      return (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
    if (roleLower.includes('بازاریاب') || roleLower.includes('طراح') || roleLower.includes('فروش')) {
      return (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    }
    return (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">عضو مورد نظر یافت نشد</h1>
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به تیم
          </Link>
        </div>
      </div>
    )
  }

  const colorClasses = getColorClasses(member.color)
  const gradient = getColorGradient(member.color)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${colorClasses.bgLight} rounded-full blur-3xl opacity-30`} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            بازگشت به تیم
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="glass rounded-3xl p-8 lg:p-12 mb-8 overflow-hidden relative">
            {/* Gradient Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${gradient} p-1 shadow-2xl ${colorClasses.shadow}`}>
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                      <div className={colorClasses.text}>
                        {getIcon(member.role)}
                      </div>
                    </div>
                  )}
                </div>
                {/* Status */}
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-4 border-slate-900 flex items-center justify-center`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-right">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{member.name}</h1>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colorClasses.bgLight} ${colorClasses.border} border mb-6`}>
                  <span className={`w-2 h-2 rounded-full ${colorClasses.bg}`} />
                  <span className={`text-lg font-medium ${colorClasses.text}`}>{member.role}</span>
                </div>
                {member.bio && (
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{member.bio}</p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-row lg:flex-col gap-4">
                {member.experience && (
                  <div className="glass rounded-2xl p-4 text-center min-w-[100px]">
                    <div className={`text-3xl font-bold ${colorClasses.text}`}>{member.experience}</div>
                    <div className="text-gray-400 text-sm">سال تجربه</div>
                  </div>
                )}
                {member.skills && (
                  <div className="glass rounded-2xl p-4 text-center min-w-[100px]">
                    <div className={`text-3xl font-bold ${colorClasses.text}`}>{member.skills.length}</div>
                    <div className="text-gray-400 text-sm">مهارت</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description */}
            {member.description && (
              <div className="glass rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">درباره من</h2>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">{member.description}</p>
              </div>
            )}

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="glass rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">مهارت‌ها</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 rounded-xl ${colorClasses.bgLight} ${colorClasses.border} border ${colorClasses.text} font-medium`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="glass rounded-3xl p-8 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">دستاوردها</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {member.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg ${colorClasses.bgLight} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg className={`w-4 h-4 ${colorClasses.text}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <div className="glass rounded-3xl p-8 inline-block">
              <p className="text-gray-400 mb-4">برای همکاری یا سوال با ما تماس بگیرید</p>
              <Link
                href="/#contact"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold shadow-lg ${colorClasses.shadow} hover:scale-105 transition-transform`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">کارگاه فایبرگلاس - تمامی حقوق محفوظ است</p>
        </div>
      </footer>
    </div>
  )
}


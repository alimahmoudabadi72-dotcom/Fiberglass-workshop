'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DesignerPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'portfolio' | 'contact'>('about')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" dir="rtl">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            بازگشت به سایت
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 lg:p-12 overflow-hidden relative">
            {/* Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-1 shadow-2xl shadow-purple-500/30">
                  <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ع
                    </span>
                  </div>
                </div>
                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium shadow-lg">
                  آماده همکاری
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">علی محمودآبادی</h1>
                <p className="text-purple-400 font-medium mb-4">طراح و توسعه‌دهنده وب</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  طراح این وبسایت و علاقه‌مند به ساخت تجربه‌های کاربری زیبا و کاربردی
                </p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 17.176c-.198.47-.812.862-1.702.862H8.707c-.89 0-1.504-.392-1.702-.862-.066-.156-.1-.322-.1-.496V7.32c0-.174.034-.34.1-.496.198-.47.812-.862 1.702-.862h6.586c.89 0 1.504.392 1.702.862.066.156.1.322.1.496v9.36c0 .174-.034.34-.1.496z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-500/20 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-green-500/20 flex items-center justify-center text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-500/20 flex items-center justify-center text-gray-400 hover:text-sky-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800">
            {[
              { id: 'about', label: 'درباره من', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { id: 'skills', label: 'مهارت‌ها', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { id: 'portfolio', label: 'نمونه‌کارها', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'contact', label: 'تماس', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'about' && (
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">درباره من</h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  سلام! من علی محمودآبادی هستم، طراح و توسعه‌دهنده وب با <span className="text-purple-400 font-semibold">۳ سال سابقه کاری</span> در زمینه طراحی و برنامه‌نویسی وبسایت.
                </p>
                <p>
                  علاقه‌مند به ساخت تجربه‌های کاربری زیبا، مدرن و کاربردی هستم. تخصص من در طراحی رابط کاربری (UI) و تجربه کاربری (UX) همراه با پیاده‌سازی فنی پروژه‌هاست.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">۳+</div>
                    <div className="text-gray-500 text-sm">سال تجربه</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-1">۱۰+</div>
                    <div className="text-gray-500 text-sm">پروژه موفق</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">۱۰۰٪</div>
                    <div className="text-gray-500 text-sm">رضایت مشتری</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">مهارت‌ها</h2>
              
              {/* Programming Languages */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">زبان‌های برنامه‌نویسی</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600' },
                    { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
                    { name: 'Python', color: 'from-green-400 to-blue-500' },
                    { name: 'PHP', color: 'from-indigo-400 to-purple-600' },
                    { name: 'HTML5', color: 'from-orange-400 to-red-500' },
                    { name: 'CSS3', color: 'from-blue-400 to-cyan-500' },
                    { name: 'SQL', color: 'from-cyan-400 to-blue-600' },
                    { name: 'C#', color: 'from-purple-400 to-violet-600' },
                  ].map((lang) => (
                    <div key={lang.name} className="bg-slate-800/50 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lang.color} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{lang.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-300 text-sm">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">فریمورک‌ها و کتابخانه‌ها</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'React', color: 'from-cyan-400 to-blue-500' },
                    { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
                    { name: 'Vue.js', color: 'from-green-400 to-emerald-600' },
                    { name: 'Node.js', color: 'from-green-500 to-green-700' },
                    { name: 'Laravel', color: 'from-red-400 to-red-600' },
                    { name: 'Django', color: 'from-green-600 to-green-800' },
                    { name: 'TailwindCSS', color: 'from-cyan-400 to-cyan-600' },
                    { name: 'Bootstrap', color: 'from-purple-500 to-purple-700' },
                  ].map((fw) => (
                    <div key={fw.name} className="bg-slate-800/50 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${fw.color} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{fw.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-300 text-sm">{fw.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-4">ابزارها</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'VS Code', 'Figma', 'Photoshop', 'Linux', 'Docker', 'MongoDB', 'MySQL', 'PostgreSQL'].map((tool) => (
                    <span key={tool} className="px-4 py-2 rounded-full bg-slate-800/50 text-gray-300 text-sm border border-slate-700 hover:border-purple-500/50 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">نمونه‌کارها</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Project 1 */}
                <div className="bg-slate-800/50 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className="h-40 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold mb-2">کارگاه فایبرگلاس</h3>
                    <p className="text-gray-400 text-sm mb-3">طراحی و توسعه وبسایت کامل با Next.js و TailwindCSS</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs">Next.js</span>
                      <span className="px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-400 text-xs">TailwindCSS</span>
                    </div>
                  </div>
                </div>

                {/* More Projects Placeholder */}
                <div className="bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center h-64">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-slate-500 text-sm">پروژه‌های بیشتر به زودی...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">تماس با من</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  {/* Phone */}
                  <a href="tel:09170427767" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">شماره تماس</p>
                      <p className="text-white font-medium group-hover:text-green-400 transition-colors" dir="ltr">09170427767</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:alimahmoudabadi77@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">ایمیل</p>
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors text-sm" dir="ltr">alimahmoudabadi77@gmail.com</p>
                    </div>
                  </a>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-3">آماده همکاری هستم!</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    اگر پروژه‌ای دارید یا به طراحی وبسایت نیاز دارید، خوشحال می‌شم باهم صحبت کنیم.
                  </p>
                  <a 
                    href="tel:09170427767"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    تماس بگیرید
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-12 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">طراحی شده با ❤️</p>
        </div>
      </footer>
    </div>
  )
}

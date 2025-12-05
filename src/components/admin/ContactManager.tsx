'use client'

import { useState, useEffect } from 'react'
import { getContactInfo, saveContactInfo, ContactInfo } from '@/lib/contact'

export default function ContactManager() {
  const [contact, setContact] = useState<ContactInfo>({
    phone1: '',
    phone2: '',
    email1: '',
    email2: '',
    address: '',
    addressDetail: ''
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setContact(getContactInfo())
  }, [])

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    saveContactInfo(contact)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">مدیریت اطلاعات تماس</h2>
          <p className="text-slate-500 text-sm">ویرایش اطلاعات بخش ارتباط با ما</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Phone Numbers */}
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-700">شماره تلفن‌ها</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">تلفن ثابت</label>
              <input
                type="text"
                value={contact.phone1}
                onChange={(e) => handleChange('phone1', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700"
                placeholder="مثال: ۰۲۱-۱۲۳۴۵۶۷۸"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">تلفن همراه</label>
              <input
                type="text"
                value={contact.phone2}
                onChange={(e) => handleChange('phone2', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700"
                placeholder="مثال: ۰۹۱۲-۱۲۳-۴۵۶۷"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Emails */}
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-700">ایمیل‌ها</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">ایمیل اصلی</label>
              <input
                type="email"
                value={contact.email1}
                onChange={(e) => handleChange('email1', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-700"
                placeholder="info@example.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">ایمیل فروش</label>
              <input
                type="email"
                value={contact.email2}
                onChange={(e) => handleChange('email2', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-700"
                placeholder="sales@example.com"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-700">آدرس</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">شهر و منطقه</label>
              <input
                type="text"
                value={contact.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-700"
                placeholder="مثال: تهران، منطقه صنعتی"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">آدرس کامل</label>
              <input
                type="text"
                value={contact.addressDetail}
                onChange={(e) => handleChange('addressDetail', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-700"
                placeholder="مثال: خیابان صنعت، پلاک ۱۲۳"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            ذخیره تغییرات
          </button>
          
          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">تغییرات با موفقیت ذخیره شد!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { 
  getTeamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember,
  TeamMember,
  TEAM_COLORS,
  getAutoColor
} from '@/lib/team'

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'basic' | 'details'>('basic')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    experience: '',
    skills: [] as string[],
    description: '',
    achievements: [] as string[],
    phone: '',
    image: '',
  })

  const [newSkill, setNewSkill] = useState('')
  const [newAchievement, setNewAchievement] = useState('')

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = () => {
    const teamMembers = getTeamMembers()
    setMembers(teamMembers)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      experience: '',
      skills: [],
      description: '',
      achievements: [],
      phone: '',
      image: '',
    })
    setNewSkill('')
    setNewAchievement('')
    setActiveTab('basic')
  }

  const handleAdd = () => {
    if (!formData.name || !formData.role) return

    // انتخاب رنگ خودکار بر اساس تعداد اعضای فعلی
    const autoColor = getAutoColor(members.length)
    addTeamMember({ ...formData, color: autoColor })
    loadMembers()
    setShowAddModal(false)
    resetForm()
    showSuccessMessage('عضو جدید با موفقیت اضافه شد')
  }

  const handleEdit = () => {
    if (!editingMember || !formData.name || !formData.role) return

    updateTeamMember(editingMember.id, formData)
    loadMembers()
    setEditingMember(null)
    resetForm()
    showSuccessMessage('اطلاعات با موفقیت ویرایش شد')
  }

  const handleDelete = (id: string) => {
    deleteTeamMember(id)
    loadMembers()
    setShowDeleteConfirm(null)
    showSuccessMessage('عضو با موفقیت حذف شد')
  }

  const openEditModal = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      experience: member.experience || '',
      skills: member.skills || [],
      description: member.description || '',
      achievements: member.achievements || [],
      phone: member.phone || '',
      image: member.image || '',
    })
    setEditingMember(member)
  }

  const showSuccessMessage = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] })
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })
  }

  const addAchievement = () => {
    if (newAchievement.trim() && !formData.achievements.includes(newAchievement.trim())) {
      setFormData({ ...formData, achievements: [...formData.achievements, newAchievement.trim()] })
      setNewAchievement('')
    }
  }

  const removeAchievement = (achievement: string) => {
    setFormData({ ...formData, achievements: formData.achievements.filter(a => a !== achievement) })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // بررسی سایز فایل (حداکثر 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد')
      return
    }

    // بررسی نوع فایل
    if (!file.type.startsWith('image/')) {
      alert('لطفاً فقط فایل تصویری انتخاب کنید')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setFormData({ ...formData, image: '' })
  }

  const getColorGradient = (color: string) => {
    return TEAM_COLORS.find(c => c.value === color)?.gradient || 'from-blue-400 to-cyan-500'
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="max-w-5xl">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-sm">{showSuccess}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">مدیریت تیم</h2>
          <p className="text-slate-400 text-sm">افزودن، ویرایش و حذف اعضای تیم کارگاه</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowAddModal(true)
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          افزودن عضو جدید
        </button>
      </div>

      {/* Team Grid */}
      {members.length === 0 ? (
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-12 text-center">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">تیمی وجود ندارد</h3>
          <p className="text-slate-500 text-sm mb-6">اولین عضو تیم را اضافه کنید</p>
          <button
            onClick={() => {
              resetForm()
              setShowAddModal(true)
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن عضو
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">{members.length} عضو</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => {
              const colorClasses = getColorClasses(member.color)
              const gradient = getColorGradient(member.color)
              return (
                <div
                  key={member.id}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 group hover:border-slate-700 transition-colors"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} p-[2px]`}>
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                          <svg className={`w-6 h-6 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{member.name}</h3>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${colorClasses.bg} ${colorClasses.border} border mt-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                        <span className={`text-xs font-medium ${colorClasses.text}`}>{member.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.experience && (
                      <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400">
                        {member.experience} سال تجربه
                      </span>
                    )}
                    {member.skills && member.skills.length > 0 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400">
                        {member.skills.length} مهارت
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      ویرایش
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(member.id)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">
                {editingMember ? 'ویرایش عضو' : 'افزودن عضو جدید'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingMember(null)
                  resetForm()
                }}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveTab('basic')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'basic'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                اطلاعات پایه
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                جزئیات و سوابق
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {activeTab === 'basic' ? (
                <>
                  {/* Name */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="مثال: علی غارسی"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">سمت / تخصص *</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="مثال: جوشکار"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">بیوگرافی کوتاه</label>
                    <input
                      type="text"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="مثال: متخصص جوشکاری با ۱۰ سال تجربه"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">سال‌های تجربه</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="مثال: ۱۰"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">تصویر پروفایل</label>
                    <div className="flex items-start gap-4">
                      {/* Image Preview */}
                      <div className="relative">
                        {formData.image ? (
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-slate-700">
                            <img 
                              src={formData.image} 
                              alt="پیش‌نمایش" 
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={removeImage}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-800/50">
                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Button */}
                      <div className="flex-1">
                        <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-800/50 cursor-pointer transition-colors">
                          <svg className="w-6 h-6 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-slate-400">انتخاب تصویر</span>
                          <span className="text-xs text-slate-500 mt-1">حداکثر ۲ مگابایت</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">اگر تصویر آپلود نشود، آیکون رنگی نمایش داده می‌شود</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Description */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">توضیحات کامل</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="توضیحات کامل درباره سوابق کاری و تخصص..."
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">مهارت‌ها</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="مهارت جدید..."
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors"
                      >
                        افزودن
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">دستاوردها</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="دستاورد جدید..."
                      />
                      <button
                        onClick={addAchievement}
                        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors"
                      >
                        افزودن
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm"
                        >
                          <span>{achievement}</span>
                          <button
                            onClick={() => removeAchievement(achievement)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">شماره تماس (اختیاری)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                      dir="ltr"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-5 border-t border-slate-800">
              <div className="text-slate-500 text-sm">
                {activeTab === 'basic' ? 'مرحله ۱ از ۲' : 'مرحله ۲ از ۲'}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingMember(null)
                    resetForm()
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                >
                  انصراف
                </button>
                {activeTab === 'basic' ? (
                  <button
                    onClick={() => setActiveTab('details')}
                    className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
                  >
                    مرحله بعد
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('basic')}
                    className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
                  >
                    مرحله قبل
                  </button>
                )}
                <button
                  onClick={editingMember ? handleEdit : handleAdd}
                  disabled={!formData.name || !formData.role}
                  className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium transition-colors"
                >
                  {editingMember ? 'ذخیره تغییرات' : 'افزودن'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">حذف عضو</h3>
            <p className="text-slate-400 text-sm mb-6">آیا از حذف این عضو اطمینان دارید؟</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'پنل مدیریت | کارگاه فایبرگلاس',
  description: 'پنل مدیریت وبسایت کارگاه فایبرگلاس',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  )
}


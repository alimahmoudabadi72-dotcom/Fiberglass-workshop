import TeamMemberClient from '@/components/TeamMemberClient'

// برای static export - همه ID های پیش‌فرض
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ]
}

// اجازه صفحات داینامیک که در build time تعریف نشده‌اند
export const dynamicParams = true

interface PageProps {
  params: { id: string }
}

export default function TeamMemberPage({ params }: PageProps) {
  return <TeamMemberClient id={params.id} />
}

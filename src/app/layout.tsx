import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'کارگاه فایبرگلاس | تولید محصولات فایبرگلاس با کیفیت',
  description: 'کارگاه تخصصی تولید و ساخت محصولات فایبرگلاس با بیش از سال‌ها تجربه. ارائه خدمات حرفه‌ای در زمینه ساخت قطعات فایبرگلاس صنعتی و تزئینی.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased">
        {children}
      </body>
    </html>
  )
}

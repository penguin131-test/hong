import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TetNavbar } from "@/components/tet-navbar"
import "./globals.css"
import { ActiveEffects } from "@/components/seasonal-effects"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hóng Tết - Đếm ngược Tết & Tiện ích Tết Việt",
  description:
    "Hóng Tết - Đếm ngược Tết Nguyên Đán, xem lịch âm dương chính xác, lịch nghỉ Tết, câu chúc, món ăn, văn khấn và tiện ích Tết Việt. Gọn nhẹ, miễn phí, không cần cài app.",
  openGraph: {
    title: "Hóng Tết - Đếm ngược Tết & Tiện ích Tết Việt",
    description: "Còn bao nhiêu ngày nữa đến Tết? Xem lịch, câu chúc, món ăn, và tiện ích Tết Việt.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "https://files.catbox.moe/kntzs7.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://files.catbox.moe/kntzs7.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "https://files.catbox.moe/kntzs7.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D32F2F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(reg => console.log('[PWA] Service Worker registered'))
                    .catch(err => console.log('[PWA] Service Worker registration failed:', err))
                })
              }
            `,
          }}
        />
      </head>

      <body className="font-sans antialiased">
        {/* Navbar cố định đầu trang */}
        <TetNavbar />

        {/* Nội dung trang */}
        {children}

        {/* Analytics */}
        <Analytics />

        {/* Hiệu ứng Tết được mở khóa bằng Xu */}
        <ActiveEffects />
      </body>
    </html>
  )
}

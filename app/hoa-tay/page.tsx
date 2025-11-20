"use client"

import { useEffect, useState } from "react"

interface Firework {
  id: number
  left: number
  top: number
  delay: number
}

export default function FireworksPage() {
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [wishes, setWishes] = useState<string[]>([])
  const [showFireworks, setShowFireworks] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  const newYearWishes = [
    "Chúc năm mới an khang thịnh vượng!",
    "Chúc mọi điều tốt lành đến với gia đình!",
    "Năm mới sức khỏe dồi dào, công việc may mắn!",
    "Chúc bạn tình yêu và hạnh phúc!",
    "Thành công và tài lộc đến với bạn!",
    "Năm mới vạn sự như ý!",
  ]

  useEffect(() => {
    const newFireworks = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: Math.random() * 5,
    }))
    setFireworks(newFireworks)
    setShowFireworks(true)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowFireworks(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const wishInterval = setInterval(() => {
      setWishes((prev) => [...prev, newYearWishes[Math.floor(Math.random() * newYearWishes.length)]])
    }, 2000)

    return () => clearInterval(wishInterval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!showFireworks) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-primary">Chúc Mừng Năm Mới!</h1>
          <p className="text-xl text-muted-foreground">Lễ pháo hoa đã kết thúc. Hẹn gặp bạn vào năm sau!</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Quay lại trang chủ
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Fireworks */}
      <div className="absolute inset-0">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${fw.left}%`,
              top: `${fw.top}%`,
              animation: `burst ${Math.random() * 2 + 1}s ease-out infinite`,
              animationDelay: `${fw.delay}s`,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(255, 223, 0, 0.8)`,
            }}
          />
        ))}
      </div>

      {/* Floating Wishes */}
      {wishes.map((wish, idx) => (
        <div
          key={idx}
          className="absolute text-xl font-bold text-yellow-300 pointer-events-none"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animation: `float-up ${Math.random() * 3 + 4}s ease-out forwards`,
            animationDelay: `0.5s`,
            textShadow: "0 0 10px rgba(255, 223, 0, 0.8)",
          }}
        >
          {wish}
        </div>
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-7xl font-bold text-yellow-300 drop-shadow-lg animate-pulse">Hóng Tết 2025!</h1>
        <p className="text-3xl text-white drop-shadow-lg">Chúc mừng năm mới Ất Tỵ</p>
        <div className="text-2xl text-yellow-300 font-semibold drop-shadow-lg">{formatTime(timeLeft)}</div>
      </div>

      <style>{`
        @keyframes burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              ${(Math.random() - 0.5) * 200}px,
              ${Math.random() * 200 - 100}px
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes float-up {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfessionalFireworks } from "./professional-fireworks"

// Bảng ngày Tết dương lịch (có thể mở rộng thêm sau)
const TET_SOLAR_DATES: Record<number, { month: number; day: number }> = {
  2025: { month: 1, day: 29 },
  2026: { month: 2, day: 17 },
  2027: { month: 2, day: 6 },
  2028: { month: 1, day: 26 },
  2029: { month: 2, day: 13 },
  2030: { month: 2, day: 2 },
  2031: { month: 1, day: 23 },
}

type CountdownState = {
  days: number
  hours: number
  minutes: number
  seconds: number
  targetYear: number
  targetDate: Date
}

function getUpcomingTet(from: Date): CountdownState {
  const now = from
  const year = now.getFullYear()

  const getTetDateForYear = (y: number): Date => {
    const info = TET_SOLAR_DATES[y]
    if (!info) {
      // fallback: 1/2 dương lịch nếu chưa cấu hình
      return new Date(y, 1, 1)
    }
    return new Date(y, info.month - 1, info.day)
  }

  let targetYear = year
  let targetDate = getTetDateForYear(year)

  if (now.getTime() >= targetDate.getTime()) {
    targetYear = year + 1
    targetDate = getTetDateForYear(targetYear)
  }

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime())
  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, targetYear, targetDate }
}

function useTetCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(() => getUpcomingTet(new Date()))

  useEffect(() => {
    const timer = setInterval(() => {
      setState(getUpcomingTet(new Date()))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return state
}

export function CountdownHero() {
  const { days, hours, minutes, seconds, targetYear, targetDate } = useTetCountdown()
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      setShowFireworks(true)
      // Auto-close fireworks after 10 minutes
      const timer = setTimeout(() => {
        setShowFireworks(false)
      }, 600000)
      return () => clearTimeout(timer)
    }
  }, [days, hours, minutes, seconds])

  const formattedDate = useMemo(() => {
    const d = String(targetDate.getDate()).padStart(2, "0")
    const m = String(targetDate.getMonth() + 1).padStart(2, "0")
    const y = targetDate.getFullYear()
    return `${d}/${m}/${y}`
  }, [targetDate])

  return (
    <>
      <section className="border-b border-amber-300/70 bg-gradient-to-b from-[#fffaf0] via-[#ffeede] to-[#ffe0cc]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-8 pt-10 md:flex-row md:items-center md:justify-between md:pb-10 md:pt-12">
          {/* Text */}
          <div className="max-w-xl space-y-3">
            <p className="inline-block rounded-full border border-amber-300 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-red-700">
              Đếm ngược Tết Nguyên Đán
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-red-900 sm:text-4xl md:text-5xl">
              Còn bao nhiêu ngày nữa đến Tết {targetYear}?
            </h1>
            <p className="text-sm md:text-base text-red-800/80">
              Trang web đếm ngược tới Tết Nguyên Đán. Ngày Tết Nguyên Đán vào ngày:{" "}
              <span className="font-semibold text-red-900">{formattedDate}</span>.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="sm"
                className="rounded-full bg-red-700 text-xs font-semibold text-amber-50 hover:bg-red-800"
              >
                Xem lịch & sự kiện Tết
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-amber-300 bg-white/70 text-xs font-medium text-red-800 hover:bg-amber-50"
              >
                Khám phá tiện ích Tết
              </Button>
            </div>
          </div>

          {/* Countdown blocks */}
          <div className="mt-2 w-full max-w-md md:mt-0">
            <div className="rounded-3xl border border-amber-300 bg-white/90 p-4 shadow-[0_10px_30px_rgba(148,63,37,0.16)]">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-red-700">Thời gian còn lại</p>
              <div className="grid grid-cols-4 gap-2">
                <CountdownItem label="Ngày" value={days} />
                <CountdownItem label="Giờ" value={hours} />
                <CountdownItem label="Phút" value={minutes} />
                <CountdownItem label="Giây" value={seconds} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProfessionalFireworks isOpen={showFireworks} onClose={() => setShowFireworks(false)} />
    </>
  )
}

function CountdownItem({ label, value }: { label: string; value: number }) {
  const v = value.toString().padStart(2, "0")
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-[#fffaf0] px-2 py-2">
      <div className="text-lg font-bold tracking-widest text-red-900">{v}</div>
      <div className="text-[11px] font-medium text-red-700/80">{label}</div>
    </div>
  )
}

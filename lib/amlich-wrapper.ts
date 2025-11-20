// src/lib/amlich-wrapper.ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi"

export interface BasicLunarDate {
  day: number
  month: number
  year: number
  // Can Chi
  yearName: string
  monthName: string
  dayName: string
  hourName: string
  // Tiết khí
  solarTerm: string
  // Giờ hoàng đạo dạng text "Tý (23–1h)"
  luckyHours: string[]
}

/**
 * Hàm lõi: từ Date -> đầy đủ thông tin Âm lịch, Can Chi, Tiết khí, giờ hoàng đạo
 */
function buildLunarFromDate(date: Date): BasicLunarDate {
  const solar = new SolarDate(date)
  // Chuyển sang âm lịch
  const lunar = SolarDate.toLunarDate
    ? (SolarDate as any).toLunarDate(solar)
    : solar.toLunarDate()

  // Khởi tạo giá trị phụ (jd, leap_year, leap_month, ...)
  if (typeof (lunar as any).init === "function") {
    ;(lunar as any).init()
  }

  const raw = (lunar as any).get?.() ?? {}

  // Can Chi
  const yearName =
    (lunar as any).getYearName?.() ?? (raw.year_name as string) ?? ""
  const monthName = (lunar as any).getMonthName?.() ?? ""
  const dayName = (lunar as any).getDayName?.() ?? ""
  const hourName = (lunar as any).getHourName?.() ?? ""

  // Tiết khí
  const solarTerm =
    (lunar as any).getSolarTerm?.() ??
    (lunar as any).getTietKhi?.() ??
    ""

  // Giờ hoàng đạo
  const luckyList =
    (lunar as any).getLuckyHours?.() ??
    (lunar as any).getZodiacHour?.() ??
    []

  const luckyHours: string[] = Array.isArray(luckyList)
    ? luckyList.map((h: any) => {
        const [start, end] = h.time ?? []
        if (typeof start === "number" && typeof end === "number") {
          return `${h.name} (${start}–${end}h)`
        }
        return h.name ?? ""
      })
    : []

  return {
    day: raw.day as number,
    month: raw.month as number,
    year: raw.year as number,
    yearName,
    monthName,
    dayName,
    hourName,
    solarTerm,
    luckyHours,
  }
}

/**
 * Hàm chính dùng trong UI:
 * - Trước đây chỉ trả day/month/year
 * - Giờ trả thêm Can Chi + Tiết khí + giờ hoàng đạo
 */
export function getLunarDate(date: Date): BasicLunarDate {
  return buildLunarFromDate(date)
}

/**
 * Năm con giáp (Can Chi năm) – dùng trong Lịch vạn niên
 */
export function getZodiacYear(year: number): string {
  const solar = new SolarDate({ day: 1, month: 1, year })
  const lunar = LunarDate.fromSolarDate(solar)
  if (typeof (lunar as any).init === "function") {
    ;(lunar as any).init()
  }
  return (
    (lunar as any).getYearName?.() ??
    ((lunar as any).get?.().year_name as string) ??
    ""
  )
}

/**
 * Con giáp / Can Chi năm hiện tại – dùng cho TodayOverview
 * (bạn có thể coi là "năm Quý Mão", "Giáp Thìn"…)
 */
export function getChineseZodiacSign(date: Date): string {
  const info = getLunarDate(date)
  return info.yearName
}

/**
 * Giờ hoàng đạo cho một ngày (dựa theo Âm lịch đúng)
 */
export function getLuckyHours(date: Date): string[] {
  const info = getLunarDate(date)
  return info.luckyHours
}

/**
 * Tiết khí cho một ngày
 */
export function getSolarTerm(date: Date): string {
  const info = getLunarDate(date)
  return info.solarTerm
}

/**
 * Helper: kiểm tra có phải hôm nay không
 */
export function isToday(day: number, month: number, year: number): boolean {
  const now = new Date()
  return (
    now.getFullYear() === year &&
    now.getMonth() + 1 === month &&
    now.getDate() === day
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  getLunarDate,
  getZodiacYear as getZodiacYearFromLib,
  isToday,
} from "@/lib/amlich-wrapper"

// ================== TYPES & HÀM PHỤ ==================

type HolidayType = "duong" | "am"

interface HolidayDefinition {
  day: number
  month: number
  name: string
  isOff: boolean
  note?: string
}

interface HolidayInfo extends HolidayDefinition {
  type: HolidayType
}

interface CalendarDay {
  solar: number
  lunar: { day: number; month: number; year: number }
  isToday: boolean
  canChi: string
  date: Date
  holidays: HolidayInfo[]
}

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)

// Dải nghỉ Tết Nguyên Đán: 28/12 → 05/01 âm lịch
const isTetHolidayRange = (lunar: { day: number; month: number }) => {
  if (lunar.month === 12 && lunar.day >= 28) return true
  if (lunar.month === 1 && lunar.day <= 5) return true
  return false
}

// Tính độ dài tháng âm cho một ngày bất kỳ trong tháng đó (29 hoặc 30)
const getLunarMonthLengthForDate = (date: Date): number => {
  let d = new Date(date)
  let lunar = getLunarDate(d)
  let safety = 60

  // Lùi về mùng 1 âm
  while (lunar.day > 1 && safety > 0) {
    d.setDate(d.getDate() - 1)
    lunar = getLunarDate(d)
    safety--
  }

  const baseMonth = lunar.month
  const baseYear = lunar.year
  let maxDay = lunar.day
  safety = 60

  // Tiến dần tới hết tháng
  while (safety > 0) {
    d.setDate(d.getDate() + 1)
    const l = getLunarDate(d)
    if (l.month !== baseMonth || l.year !== baseYear) break
    maxDay = l.day
    safety--
  }

  return maxDay
}

const weekdayShortHeader = ["HAI", "BA", "TƯ", "NĂM", "SÁU", "BẢY", "CN"]
const weekdayFull = [
  "CHỦ NHẬT",
  "THỨ HAI",
  "THỨ BA",
  "THỨ TƯ",
  "THỨ NĂM",
  "THỨ SÁU",
  "THỨ BẢY",
]

// Tuần ISO
const getISOWeek = (d: Date) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7)
}

// Ngày thứ bao nhiêu trong năm
const getDayOfYear = (d: Date) => {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// ================== LIST CA DAO / TỤC NGỮ ==================

const PROVERBS: string[] = [
  "Có công mài sắt, có ngày nên kim.",
  "Uống nước nhớ nguồn.",
  "Ăn quả nhớ kẻ trồng cây.",
  "Tiên học lễ, hậu học văn.",
  "Tích tiểu thành đại.",
  "Gần mực thì đen, gần đèn thì sáng.",
  "Đi một ngày đàng, học một sàng khôn.",
  "Học ăn, học nói, học gói, học mở.",
  "Không thầy đố mày làm nên.",
  "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.",
  "Có chí thì nên.",
  "Chậm mà chắc.",
  "Lửa thử vàng, gian nan thử sức.",
  "Thất bại là mẹ thành công.",
  "Đời phải trải qua giông tố nhưng đừng cúi đầu trước giông tố.",
  "Đói cho sạch, rách cho thơm.",
  "Tốt gỗ hơn tốt nước sơn.",
  "Hữu xạ tự nhiên hương.",
  "Khó khăn thử thách lòng người.",
  "Đoàn kết là sức mạnh.",
  "Một nụ cười bằng mười thang thuốc bổ.",
  "Vạn sự khởi đầu nan.",
  "Trèo cao ngã đau.",
  "Biết người biết ta, trăm trận trăm thắng.",
  "Học, học nữa, học mãi.",
  "Điều gì không giết được bạn sẽ làm bạn mạnh mẽ hơn.",
  "An cư lạc nghiệp.",
  "Có làm thì mới có ăn.",
  "Ăn chắc mặc bền.",
  "Ăn no nghĩ dại, làm nhiều nghĩ khôn.",
  "Ở hiền gặp lành.",
  "Ở bầu thì tròn, ở ống thì dài.",
  "Thời gian là vàng bạc.",
  "Nhàn cư vi bất thiện.",
  "Trọng nghĩa khinh tài.",
  "Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau.",
  "Đừng thấy đỏ tưởng là chín.",
  "Không ai giàu ba họ, không ai khó ba đời.",
  "Giàu vì bạn, sang vì vợ.",
  "Một miếng khi đói bằng một gói khi no.",
  "Tương thân tương ái.",
  "Lá lành đùm lá rách.",
  "Nhập gia tùy tục.",
  "Được voi đòi tiên.",
  "Tham thì thâm.",
  "Cần cù bù thông minh.",
  "Có sức khỏe là có tất cả.",
  "Không vào hang cọp sao bắt được cọp con.",
  "Biết thì thưa thốt, không biết thì dựa cột mà nghe.",
  "Trăm hay không bằng tay quen.",
  "Khéo ăn thì no, khéo co thì ấm.",
  "Học thầy không tày học bạn.",
  "Hữu duyên thiên lý năng tương ngộ.",
  "Nhân nào quả nấy.",
  "Gieo gió gặt bão.",
  "Đường dài mới biết ngựa hay, ở lâu mới biết người ngay kẻ tà.",
  "Một lần bất tín, vạn lần bất tin.",
  "Dục tốc bất đạt.",
  "Nước chảy đá mòn.",
]

// ================== DANH SÁCH NGÀY LỄ ==================

// DƯƠNG LỊCH
const SOLAR_HOLIDAYS: HolidayDefinition[] = [
  { day: 1, month: 1, name: "Tết Dương lịch", isOff: true },
  { day: 9, month: 1, name: "Ngày Học sinh - Sinh viên Việt Nam", isOff: false },
  { day: 3, month: 2, name: "Ngày thành lập Đảng CSVN", isOff: false },
  { day: 14, month: 2, name: "Lễ Tình nhân (Valentine)", isOff: false },
  { day: 27, month: 2, name: "Ngày Thầy thuốc Việt Nam", isOff: false },
  { day: 8, month: 3, name: "Ngày Quốc tế Phụ nữ", isOff: false },
  { day: 26, month: 3, name: "Ngày thành lập Đoàn TNCS Hồ Chí Minh", isOff: false },
  { day: 30, month: 4, name: "Ngày Giải phóng miền Nam", isOff: true },
  { day: 1, month: 5, name: "Ngày Quốc tế Lao động", isOff: true },
  { day: 7, month: 5, name: "Ngày Chiến thắng Điện Biên Phủ", isOff: false },
  { day: 19, month: 5, name: "Ngày sinh Chủ tịch Hồ Chí Minh", isOff: false },
  { day: 1, month: 6, name: "Ngày Quốc tế Thiếu nhi", isOff: false },
  { day: 21, month: 6, name: "Ngày Báo chí Cách mạng Việt Nam", isOff: false },
  { day: 28, month: 6, name: "Ngày Gia đình Việt Nam", isOff: false },
  { day: 27, month: 7, name: "Ngày Thương binh - Liệt sĩ", isOff: false },
  { day: 19, month: 8, name: "Ngày Cách mạng Tháng Tám", isOff: false },
  {
    day: 2,
    month: 9,
    name: "Quốc khánh nước CHXHCN Việt Nam",
    isOff: true,
    note: "Nghỉ 2 ngày theo quy định",
  },
  {
    day: 5,
    month: 9,
    name: "Ngày khai giảng năm học mới",
    isOff: false,
    note: "Thường chỉ học sinh / giáo viên nghỉ dạy",
  },
  { day: 10, month: 10, name: "Ngày Giải phóng Thủ đô", isOff: false },
  { day: 13, month: 10, name: "Ngày Doanh nhân Việt Nam", isOff: false },
  { day: 20, month: 10, name: "Ngày Phụ nữ Việt Nam", isOff: false },
  { day: 31, month: 10, name: "Lễ hội Halloween", isOff: false },
  { day: 9, month: 11, name: "Ngày Pháp luật Việt Nam", isOff: false },
  { day: 19, month: 11, name: "Ngày Quốc tế Nam giới", isOff: false },
  {
    day: 20,
    month: 11,
    name: "Ngày Nhà giáo Việt Nam",
    isOff: false,
    note: "Giáo viên thường được nghỉ dạy hoặc giảm tiết",
  },
  { day: 22, month: 12, name: "Ngày thành lập Quân đội Nhân dân Việt Nam", isOff: false },
  {
    day: 24,
    month: 12,
    name: "Lễ Giáng sinh (Noel)",
    isOff: false,
    note: "Một số DN nước ngoài / Công giáo có thể được nghỉ",
  },
  {
    day: 25,
    month: 12,
    name: "Lễ Giáng sinh (Noel)",
    isOff: false,
    note: "Một số DN nước ngoài / Công giáo có thể được nghỉ",
  },
]

// ÂM LỊCH
const LUNAR_HOLIDAYS: HolidayDefinition[] = [
  {
    day: 1,
    month: 1,
    name: "Tết Nguyên Đán",
    isOff: true,
    note: "Nghỉ 5 ngày chính thức (theo nhà nước)",
  },
  {
    day: 2,
    month: 1,
    name: "Tết Nguyên Đán",
    isOff: true,
    note: "Nghỉ 5 ngày chính thức (theo nhà nước)",
  },
  {
    day: 3,
    month: 1,
    name: "Tết Nguyên Đán",
    isOff: true,
    note: "Nghỉ 5 ngày chính thức (theo nhà nước)",
  },
  {
    day: 4,
    month: 1,
    name: "Tết Nguyên Đán",
    isOff: true,
    note: "Nghỉ 5 ngày chính thức (theo nhà nước)",
  },
  {
    day: 5,
    month: 1,
    name: "Tết Nguyên Đán",
    isOff: true,
    note: "Nghỉ 5 ngày chính thức (theo nhà nước)",
  },

  { day: 15, month: 1, name: "Tết Nguyên Tiêu (Rằm tháng Giêng)", isOff: false },
  { day: 3, month: 3, name: "Tết Hàn Thực", isOff: false, note: "Ngày ăn bánh trôi, bánh chay" },
  { day: 10, month: 3, name: "Giỗ Tổ Hùng Vương", isOff: true },
  { day: 15, month: 4, name: "Lễ Phật Đản", isOff: false },
  { day: 5, month: 5, name: "Tết Đoan Ngọ", isOff: false },
  { day: 7, month: 7, name: "Lễ Thất Tịch", isOff: false },
  { day: 15, month: 7, name: "Lễ Vu Lan (Rằm tháng Bảy)", isOff: false },
  { day: 15, month: 8, name: "Tết Trung Thu", isOff: false },
  { day: 23, month: 12, name: "Tết Ông Công, Ông Táo", isOff: false },
]

// ================== COMPONENT ==================

export default function PerpetualCalendar() {
  const now = new Date()
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState<Date>(now)
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([])
  const [libraryReady] = useState(true)

  // Build calendar data
  useEffect(() => {
    const days: CalendarDay[] = []
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const solarDate = new Date(selectedYear, selectedMonth - 1, day)

      const lunarInfo = getLunarDate(solarDate)
      const today = isToday(day, selectedMonth, selectedYear)
      const canChi = lunarInfo.dayName // Can Chi NGÀY chuẩn từ thư viện mới
      const holidays: HolidayInfo[] = []

      SOLAR_HOLIDAYS.forEach((h) => {
        if (h.day === day && h.month === selectedMonth) {
          holidays.push({ ...h, type: "duong" })
        }
      })

      LUNAR_HOLIDAYS.forEach((h) => {
        if (h.day === lunarInfo.day && h.month === lunarInfo.month) {
          holidays.push({ ...h, type: "am" })
        }
      })

      days.push({
        solar: day,
        lunar: {
          day: lunarInfo.day,
          month: lunarInfo.month,
          year: lunarInfo.year,
        },
        isToday: today,
        canChi,
        date: solarDate,
        holidays,
      })
    }

    setCalendarData(days)
  }, [selectedYear, selectedMonth])

  // Info ngày chọn
  const selectedDayData: CalendarDay | null = (() => {
    if (!calendarData.length) return null
    if (
      selectedDate.getFullYear() === selectedYear &&
      selectedDate.getMonth() + 1 === selectedMonth
    ) {
      return calendarData.find((d) => d.solar === selectedDate.getDate()) ?? null
    }
    return null
  })()

  // Lấy thông tin âm lịch + tiết khí cho ngày đang chọn
  const selectedLunarInfo = selectedDayData
    ? getLunarDate(selectedDayData.date)
    : null

  // Tháng âm đủ / thiếu
  const lunarMonthLength: number | null = selectedDayData
    ? getLunarMonthLengthForDate(selectedDate)
    : null
  const lunarMonthType: "Đ" | "T" | null =
    lunarMonthLength === 30 ? "Đ" : lunarMonthLength === 29 ? "T" : null

  const monthNames = [
    "THÁNG 01",
    "THÁNG 02",
    "THÁNG 03",
    "THÁNG 04",
    "THÁNG 05",
    "THÁNG 06",
    "THÁNG 07",
    "THÁNG 08",
    "THÁNG 09",
    "THÁNG 10",
    "THÁNG 11",
    "THÁNG 12",
  ]

  const jsFirstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay()
  const startDay = (jsFirstDay + 6) % 7
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const zodiacYear = libraryReady ? getZodiacYearFromLib(selectedYear) : "..."
  const weekNumber = getISOWeek(selectedDate)
  const dayOfYear = getDayOfYear(selectedDate)
  const dow = selectedDate.getDay()

  // Ca dao / tục ngữ theo ngày (deterministic)
  const proverb =
    PROVERBS.length > 0
      ? PROVERBS[getDayOfYear(selectedDate) % PROVERBS.length]
      : ""

  // Điều khiển
  const goToday = () => {
    const t = new Date()
    setSelectedYear(t.getFullYear())
    setSelectedMonth(t.getMonth() + 1)
    setSelectedDate(t)
  }

  const goPrevDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() - 1)
    setSelectedDate(d)
    setSelectedYear(d.getFullYear())
    setSelectedMonth(d.getMonth() + 1)
  }

  const goNextDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + 1)
    setSelectedDate(d)
    setSelectedYear(d.getFullYear())
    setSelectedMonth(d.getMonth() + 1)
  }

  const handleDayClick = (day: number | null) => {
    if (!day) return
    const d = new Date(selectedYear, selectedMonth - 1, day)
    setSelectedDate(d)
  }

  const shiftMonth = (delta: number) => {
    let y = selectedYear
    let m = selectedMonth + delta
    if (m < 1) {
      m = 12
      y -= 1
    } else if (m > 12) {
      m = 1
      y += 1
    }
    setSelectedYear(y)
    setSelectedMonth(m)
    const newDate = new Date(y, m - 1, 1)
    setSelectedDate(newDate)
  }

  const shiftYear = (delta: number) => {
    const y = selectedYear + delta
    setSelectedYear(y)
    const newDate = new Date(y, selectedMonth - 1, 1)
    setSelectedDate(newDate)
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="overflow-hidden shadow-xl border-0">
          <div className="grid md:grid-cols-[1.1fr,1.3fr] min-h-[520px]">
            {/* LEFT PANEL */}
            <div className="relative bg-gradient-to-b from-sky-50 to-white border-r">
              <div className="px-8 pt-6 pb-6 flex flex-col h-full">
                {/* Header THÁNG / NĂM / THỨ */}
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-sky-700">
                      {monthNames[selectedDate.getMonth()]}
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      {selectedDate.getFullYear()}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-sky-800">
                    {weekdayFull[dow]}
                  </div>
                </div>

                {/* Nút HÔM NAY + Tuần / Ngày trong năm */}
                <div className="flex items-center justify-between mb-4">
                  <Button
                    size="sm"
                    variant={
                      isToday(
                        selectedDate.getDate(),
                        selectedDate.getMonth() + 1,
                        selectedDate.getFullYear()
                      )
                        ? "default"
                        : "outline"
                    }
                    className="rounded-full px-4 text-xs font-semibold"
                    onClick={goToday}
                  >
                    HÔM NAY
                  </Button>
                  <div className="text-right text-xs text-slate-500 space-y-0.5">
                    <div>Tuần {weekNumber}</div>
                    <div>Ngày thứ {dayOfYear} trong năm</div>
                  </div>
                </div>

                {/* Số ngày to + mũi tên */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={goPrevDay}
                    className="text-slate-400 hover:text-slate-700 transition"
                  >
                    ‹
                  </button>
                  <div className="text-7xl font-bold text-slate-900 leading-none">
                    {pad2(selectedDate.getDate())}
                  </div>
                  <button
                    onClick={goNextDay}
                    className="text-slate-400 hover:text-slate-700 transition"
                  >
                    ›
                  </button>
                </div>

                {/* Ca dao / tục ngữ random */}
                <div className="mt-2 mb-4 border-l-4 border-slate-300 pl-3 text-xs text-slate-600 italic">
                  “{proverb}”
                  <div className="mt-1 text-[10px] not-italic text-slate-400">
                    Ca dao, tục ngữ Việt Nam
                  </div>
                </div>

                {/* Tiết khí */}
                <div className="mb-5 text-xs text-slate-600">
                  <span className="font-semibold">Tiết khí:</span>{" "}
                  <span className="text-sky-700">
                    {selectedLunarInfo?.solarTerm || "Không có dữ liệu tiết khí"}
                  </span>
                </div>

                {/* Info âm lịch + ngày lễ */}
                <div className="mt-auto pt-4 border-t flex gap-6 items-end">
                  {/* Cột trái: Can chi + info */}
                  <div className="text-xs text-slate-700 space-y-1">
                    {selectedDayData ? (
                      <>
                        <div>
                          Ngày{" "}
                          <span className="font-semibold">
                            {selectedDayData.canChi}
                          </span>
                        </div>
                        <div>
                          Âm lịch:{" "}
                          <span className="font-semibold">
                            {pad2(selectedDayData.lunar.day)}/
                            {pad2(selectedDayData.lunar.month)}
                            {lunarMonthType && `(${lunarMonthType})`}/
                            {selectedDayData.lunar.year}
                          </span>
                        </div>
                        {lunarMonthType && lunarMonthLength && (
                          <div className="text-[11px] text-slate-500">
                            Tháng {pad2(selectedDayData.lunar.month)} có{" "}
                            {lunarMonthLength} ngày –{" "}
                            {lunarMonthType === "Đ" ? "tháng đủ" : "tháng thiếu"}
                          </div>
                        )}
                        {selectedDayData.holidays.length > 0 ? (
                          <div className="pt-1">
                            {selectedDayData.holidays.map((h, idx) => (
                              <div key={idx} className="text-[11px]">
                                <span className="font-semibold text-emerald-700">
                                  {h.name}
                                </span>{" "}
                                –{" "}
                                <span>
                                  {h.isOff
                                    ? "Có nghỉ làm/học"
                                    : "Không nghỉ chính thức"}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400">
                            Không trùng ngày lễ trong danh sách.
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-[11px] text-slate-400">
                        Đang tải thông tin ngày...
                      </div>
                    )}
                  </div>

                  {/* Cột phải: Số âm lịch to */}
                  <div className="ml-auto text-right">
                    <div className="text-[11px] text-slate-500 mb-1">
                      Ngày âm
                    </div>
                    <div className="text-4xl font-bold text-sky-700 leading-none">
                      {selectedDayData ? pad2(selectedDayData.lunar.day) : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL – LỊCH THÁNG */}
            <div className="bg-white">
              <div className="px-6 pt-4 pb-6 flex flex-col h-full">
                {/* Lịch tháng */}
                <div className="mb-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-slate-400 mb-2">
                    {weekdayShortHeader.map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {cells.map((day, idx) => {
                      if (!day) {
                        return (
                          <div
                            key={idx}
                            className="h-[60px] rounded-xl bg-slate-50"
                          />
                        )
                      }

                      const data = calendarData.find((d) => d.solar === day)
                      if (!data) {
                        return (
                          <div
                            key={idx}
                            className="h-[60px] rounded-xl border bg-white flex items-center justify-center text-sm text-slate-400"
                          >
                            {day}
                          </div>
                        )
                      }

                      const isSelected =
                        data.date.toDateString() ===
                        selectedDate.toDateString()
                      const inTetRange = isTetHolidayRange(data.lunar)
                      const hasHoliday = data.holidays.length > 0
                      const isTodayCell = data.isToday

                      // Đ/T cho mùng 1 âm
                      let cellLunarMonthType: "Đ" | "T" | null = null
                      if (data.lunar.day === 1) {
                        const len = getLunarMonthLengthForDate(data.date)
                        cellLunarMonthType =
                          len === 30 ? "Đ" : len === 29 ? "T" : null
                      }

                      // Base style
                      let cellClass =
                        "h-[60px] rounded-xl border text-sm flex flex-col items-center justify-center cursor-pointer transition bg-white text-slate-800 hover:bg-slate-50"

                      // Ưu tiên 1: dải Tết
                      if (inTetRange) {
                        cellClass =
                          "h-[60px] rounded-xl border-2 border-red-500 bg-gradient-to-br from-red-500 to-amber-400 text-white shadow-md flex flex-col items-center justify-center cursor-pointer"
                      }

                      // Ưu tiên 2: ngày lễ
                      if (!inTetRange && hasHoliday) {
                        const anyOff = data.holidays.some((h) => h.isOff)
                        const hasAm = data.holidays.some(
                          (h) => h.type === "am"
                        )
                        if (anyOff && hasAm) {
                          cellClass =
                            "h-[60px] rounded-xl border-2 border-amber-500 bg-gradient-to-br from-amber-100 to-emerald-100 text-emerald-900 shadow-sm flex flex-col items-center justify-center cursor-pointer"
                        } else if (anyOff) {
                          cellClass =
                            "h-[60px] rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 flex flex-col items-center justify-center cursor-pointer"
                        } else if (hasAm) {
                          cellClass =
                            "h-[60px] rounded-xl border border-amber-400 bg-amber-50 text-amber-900 flex flex-col items-center justify-center cursor-pointer"
                        } else {
                          cellClass =
                            "h-[60px] rounded-xl border border-sky-400 bg-sky-50 text-sky-900 flex flex-col items-center justify-center cursor-pointer"
                        }
                      }

                      // Ưu tiên 3: ngày đang chọn
                      if (isSelected) {
                        cellClass =
                          "h-[60px] rounded-xl border-2 border-emerald-600 bg-emerald-600 text-white flex flex-col items-center justify-center cursor-pointer shadow-md"
                      }

                      // Ưu tiên 4: Hôm nay
                      if (
                        isTodayCell &&
                        !isSelected &&
                        !inTetRange &&
                        !hasHoliday
                      ) {
                        cellClass =
                          "h-[60px] rounded-xl border-2 border-sky-500 bg-sky-50 text-sky-900 flex flex-col items-center justify-center cursor-pointer"
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleDayClick(day)}
                          className={cellClass}
                        >
                          <div className="text-sm font-semibold leading-none">
                            {day}
                          </div>
                          <div className="text-[10px] mt-1 opacity-80 flex items-center gap-0.5 justify-center">
                            <span>
                              {pad2(data.lunar.day)}/{pad2(data.lunar.month)}
                            </span>
                            {cellLunarMonthType && (
                              <span className="text-[9px] font-semibold">
                                {cellLunarMonthType}
                              </span>
                            )}
                          </div>
                          <div className="text-[9px] mt-0.5 opacity-80">
                            {data.canChi}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* CHỌN THÁNG / NĂM – chỉ nút, không input */}
                <div className="mt-auto pt-3 border-t flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Tháng */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">THÁNG</span>
                      <div className="inline-flex items-center rounded-full border bg-slate-50 px-1">
                        <button
                          onClick={() => shiftMonth(-1)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full text-sm"
                        >
                          ‹
                        </button>
                        <span className="px-3 text-sm font-semibold">
                          {pad2(selectedMonth)}
                        </span>
                        <button
                          onClick={() => shiftMonth(1)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full text-sm"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Năm */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">NĂM</span>
                      <div className="inline-flex items-center rounded-full border bg-slate-50 px-1">
                        <button
                          onClick={() => shiftYear(-1)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full text-sm"
                        >
                          ‹
                        </button>
                        <span className="px-3 text-sm font-semibold">
                          {selectedYear}
                        </span>
                        <button
                          onClick={() => shiftYear(1)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full text-sm"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    Năm con giáp:{" "}
                    <span className="font-semibold text-sky-700">
                      {zodiacYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

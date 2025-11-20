"use client"

import { useEffect, useState } from "react"
import { getLunarDate } from "@/lib/amlich-wrapper"

interface TodayData {
  lunarMonth: number
  lunarDay: number
  lunarYear: number
  zodiacSign: string          // Can Chi năm (vd: Giáp Thìn)
  luckyHours: string[]        // Giờ hoàng đạo
  solarTerm: string | null    // Tiết khí
}

// Ngày lễ dương lịch
interface SolarHoliday {
  month: number
  day: number
  name: string
  suggestions: string[]
}

// Ngày lễ âm lịch
interface LunarHoliday {
  lunarMonth: number
  lunarDay: number
  name: string
  suggestions: string[]
}

// Danh sách ngày lễ dương lịch (có thể bổ sung thêm)
const SOLAR_HOLIDAYS: SolarHoliday[] = [
  {
    month: 1,
    day: 1,
    name: "Tết Dương lịch",
    suggestions: [
      "Dành thời gian nghỉ ngơi, tổng kết năm cũ dương lịch",
      "Lên kế hoạch, đặt mục tiêu cho năm mới",
      "Ra ngoài hít thở không khí đầu năm, gặp gỡ người thân/bạn bè",
    ],
  },
  {
    month: 4,
    day: 30,
    name: "Ngày Giải phóng miền Nam 30/4",
    suggestions: [
      "Tìm hiểu thêm về lịch sử, xem phim hoặc đọc bài viết về 30/4",
      "Sắp xếp một buổi sum họp gia đình, nấu bữa cơm đơn giản mà ấm cúng",
      "Kết hợp nghỉ ngơi, chuẩn bị tinh thần cho công việc sắp tới",
    ],
  },
  {
    month: 5,
    day: 1,
    name: "Ngày Quốc tế Lao động 1/5",
    suggestions: [
      "Tạm gác lại công việc, ưu tiên nghỉ ngơi, nạp lại năng lượng",
      "Dành thời gian cho sở thích cá nhân: đọc sách, xem phim, café",
      "Lên kế hoạch cân bằng giữa công việc và cuộc sống trong thời gian tới",
    ],
  },
  {
    month: 9,
    day: 2,
    name: "Quốc khánh 2/9",
    suggestions: [
      "Cùng gia đình xem các chương trình kỷ niệm Quốc khánh",
      "Dành thời gian dọn dẹp góc học tập/làm việc cho gọn gàng",
      "Chuẩn bị nhẹ nhàng cho những dự định trong thời gian cuối năm",
    ],
  },
]

// Danh sách ngày lễ âm lịch (tập trung Tết & 23 tháng Chạp)
const LUNAR_HOLIDAYS: LunarHoliday[] = [
  {
    lunarMonth: 12,
    lunarDay: 23,
    name: "23 tháng Chạp – Ông Công Ông Táo",
    suggestions: [
      "Chuẩn bị mâm cúng Ông Công Ông Táo gọn gàng, vừa sức",
      "Dọn dẹp bếp, khu vực nấu ăn để tiễn Táo quân trong sạch, tươm tất",
      "Ghi chú những việc cần làm cho những ngày cận Tết: dọn nhà, giặt giũ, trang trí",
    ],
  },
  {
    lunarMonth: 1,
    lunarDay: 1,
    name: "Mùng 1 Tết Nguyên Đán",
    suggestions: [
      "Dậy sớm, ăn mặc chỉnh tề, nói lời dễ nghe để khởi đầu năm mới nhẹ nhàng",
      "Ưu tiên chúc Tết ông bà, bố mẹ, người thân trong gia đình",
      "Hạn chế tranh cãi, không nói lời xui xẻo, tránh làm việc nặng trong ngày đầu năm",
    ],
  },
  {
    lunarMonth: 1,
    lunarDay: 2,
    name: "Mùng 2 Tết – Thăm họ hàng, bạn bè",
    suggestions: [
      "Sắp xếp lịch thăm họ hàng bên nội/bên ngoại còn lại nếu chưa đi ngày mùng 1",
      "Dành thêm thời gian cho gia đình nhỏ: cùng ăn cơm, trò chuyện, chơi game nhẹ",
      "Lên kế hoạch gặp gỡ bạn bè đầu năm nếu sức khỏe và thời gian cho phép",
    ],
  },
  {
    lunarMonth: 1,
    lunarDay: 3,
    name: "Mùng 3 Tết – Kết thúc những ngày Tết chính",
    suggestions: [
      "Hoàn thiện nốt các chuyến chúc Tết, thăm họ hàng/bạn bè quan trọng",
      "Bắt đầu thư giãn, điều chỉnh lại nhịp sinh hoạt để quay lại công việc/học tập",
      "Nhìn lại ba ngày Tết, ghi lại một vài điều vui và dự định nhỏ cho năm mới",
    ],
  },
  {
    lunarMonth: 1,
    lunarDay: 15,
    name: "Rằm tháng Giêng (Tết Nguyên Tiêu)",
    suggestions: [
      "Nếu có thể, đi lễ chùa hoặc thắp hương tại gia để cầu bình an",
      "Dành thời gian tĩnh tâm, sắp xếp lại kế hoạch năm nếu còn dang dở",
      "Ăn uống nhẹ nhàng, ưu tiên các món thanh đạm cho cơ thể thoải mái",
    ],
  },
]

export function TodayOverview() {
  const [todayData, setTodayData] = useState<TodayData | null>(null)

  useEffect(() => {
    const today = new Date()
    const lunar = getLunarDate(today)

    setTodayData({
      lunarMonth: lunar.month,
      lunarDay: lunar.day,
      lunarYear: lunar.year,
      // Con giáp / Can Chi năm chuẩn, ví dụ: "Giáp Thìn"
      zodiacSign: lunar.yearName ?? "",
      // Giờ hoàng đạo từ thư viện mới
      luckyHours: lunar.luckyHours ?? [],
      // Tiết khí (Lập Xuân, Hạ Chí, ...)
      solarTerm: lunar.solarTerm ?? null,
    })
  }, [])

  if (!todayData) return null

  const today = new Date()
  const solarMonth = today.getMonth() + 1
  const solarDay = today.getDate()

  const solarHoliday = SOLAR_HOLIDAYS.find(
    (h) => h.month === solarMonth && h.day === solarDay,
  )
  const lunarHoliday = LUNAR_HOLIDAYS.find(
    (h) =>
      h.lunarMonth === todayData.lunarMonth && h.lunarDay === todayData.lunarDay,
  )

  const holidayName = lunarHoliday?.name ?? solarHoliday?.name ?? null

  const getSuggestions = (): string[] => {
    // Ưu tiên gợi ý cho ngày lễ âm (Tết & 23 tháng Chạp)
    if (lunarHoliday) {
      return lunarHoliday.suggestions
    }

    // Sau đó tới ngày lễ dương lịch
    if (solarHoliday) {
      return solarHoliday.suggestions
    }

    // Ngày thường (không phải lễ): gợi ý chung theo chu kỳ trong tháng âm
    const d = todayData.lunarDay

    if (d <= 10) {
      // Đầu tháng âm lịch
      return [
        "Đầu tháng âm lịch – phù hợp để bắt đầu kế hoạch, thói quen tốt mới",
        "Dành thời gian dọn dẹp gọn gàng góc học tập/làm việc",
        "Lập to-do list nhỏ cho 7–10 ngày tới để không bị trễ việc",
      ]
    } else if (d <= 20) {
      // Giữa tháng âm lịch
      return [
        "Giữa tháng âm – thời điểm hợp lý để rà soát lại tiến độ học tập/công việc",
        "Ưu tiên hoàn thành những việc còn dang dở thay vì mở thêm việc mới",
        "Dành một ít thời gian chăm sóc sức khoẻ: ngủ đủ, uống nước, vận động nhẹ",
      ]
    } else {
      // Cuối tháng âm lịch
      return [
        "Cuối tháng âm – thích hợp để tổng kết và rút kinh nghiệm những việc vừa qua",
        "Sắp xếp lại tài liệu, file, ghi chú để sang tháng mới đỡ rối",
        "Viết ngắn gọn vài mục tiêu nhỏ cho tháng âm lịch tiếp theo",
      ]
    }
  }

  const suggestions = getSuggestions()

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Hôm nay là ngày...
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Khối thông tin ngày hôm nay */}
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ngày dương lịch:</span>
            <span className="font-semibold text-foreground">
              {today.toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ngày âm lịch:</span>
            <span className="font-semibold text-foreground">
              {todayData.lunarDay}/{todayData.lunarMonth}/{todayData.lunarYear}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Con giáp:</span>
            <span className="font-semibold text-foreground">
              {todayData.zodiacSign}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tiết khí:</span>
            <span className="font-semibold text-foreground">
              {todayData.solarTerm || "Không có dữ liệu tiết khí"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-muted-foreground">Giờ vàng:</span>
            <span className="text-right text-sm font-semibold text-foreground">
              {todayData.luckyHours.length > 0
                ? todayData.luckyHours.join(", ")
                : "Không có dữ liệu giờ đẹp hôm nay"}
            </span>
          </div>

          {holidayName && (
            <div className="mt-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Ngày đặc biệt
              </p>
              <p className="text-sm font-semibold text-foreground">
                {holidayName}
              </p>
            </div>
          )}
        </div>

        {/* Khối gợi ý */}
        <div className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-1 font-semibold text-foreground">
            {holidayName ? "Gợi ý cho hôm nay" : "Gợi ý cho một ngày bình thường"}
          </h3>
          {holidayName && (
            <p className="text-xs text-muted-foreground">
              Gợi ý được tuỳ chỉnh riêng cho{" "}
              <span className="font-semibold">{holidayName}</span>.
            </p>
          )}
          <ul className="mt-2 space-y-2">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-bold text-primary">•</span>
                <span className="text-sm text-foreground/80">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

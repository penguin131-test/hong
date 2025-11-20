import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const holidaySchedules = [
  {
    year: 2025,
    tetStart: "2025-02-28",
    tetEnd: "2025-03-02",
    days: 4,
    note: "Tết Nguyên Đán năm Ất Tỵ",
  },
  {
    year: 2026,
    tetStart: "2026-02-17",
    tetEnd: "2026-02-21",
    days: 5,
    note: "Tết Nguyên Đán năm Bính Thân",
  },
  {
    year: 2024,
    tetStart: "2024-02-10",
    tetEnd: "2024-02-13",
    days: 4,
    note: "Tết Nguyên Đán năm Giáp Thìn",
  },
]

export default function HolidayCalendar() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 bg-transparent">
              ← Quay lại
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-primary mb-2">Lịch Nghỉ Tết</h1>
          <p className="text-muted-foreground">Xem nhanh số ngày nghỉ Tết chính thức từng năm</p>
        </div>

        {/* Holiday Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/5 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Năm</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Thời gian nghỉ</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Số ngày</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {holidaySchedules.map((schedule) => (
                  <tr key={schedule.year} className="border-b border-border hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-4 font-semibold text-foreground">{schedule.year}</td>
                    <td className="px-4 py-4 text-foreground">
                      {new Date(schedule.tetStart).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(schedule.tetEnd).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-4 font-semibold text-primary">{schedule.days} ngày</td>
                    <td className="px-4 py-4 text-muted-foreground">{schedule.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-2">Lưu ý</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Lịch nghỉ có thể thay đổi theo quyết định của Chính phủ</li>
            <li>• Bao gồm cả ngày được bù làm việc thêm</li>
            <li>• Thường nghỉ từ ngày 30 tháng Chạp đến ngày 5 tháng Giêng âm lịch</li>
          </ul>
        </Card>
      </div>
    </main>
  )
}

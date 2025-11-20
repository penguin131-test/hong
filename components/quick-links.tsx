import Link from "next/link"
import { Card } from "@/components/ui/card"

const quickLinks = [
  {
    title: "Lịch nghỉ Tết",
    description: "Xem nhanh số ngày nghỉ Tết chính thức từng năm.",
    href: "/lich-nghi-tet",
  },
  {
    title: "Máy tính lì xì",
    description: "Gợi ý số tiền lì xì hợp lý theo đối tượng và ngân sách.",
    href: "/may-tinh-li-xi",
  },
  {
    title: "Câu chúc Tết hay",
    description: "Câu chúc cho gia đình, người yêu, bạn bè, đồng nghiệp.",
    href: "/cau-chuc-tet",
  },
  {
    title: "Món ăn & mâm cỗ",
    description: "Gợi ý món Tết, cách bày mâm cỗ gọn, đẹp.",
    href: "/mon-an-tet",
  },
]

export function QuickLinks() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Tiện ích Tết nổi bật</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
              <h3 className="font-semibold text-foreground mb-2">{link.title}</h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

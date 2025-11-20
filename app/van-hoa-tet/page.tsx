import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const cultureTopics = [
  {
    title: "Nguồn gốc Tết Nguyên Đán",
    content:
      "Tết Nguyên Đán hay Tết Âm Lịch có nguồn gốc từ Trung Quốc cổ đại, được coi là ngày đầu tiên của năm âm lịch. Ở Việt Nam, Tết là dịp lễ lớn nhất trong năm, mang ý nghĩa sum vầy gia đình, đón chào những điều tốt lành và may mắn.",
  },
  {
    title: "Ý nghĩa 12 con giáp",
    content:
      "12 con giáp Việt Nam gồm: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngựa, Mùi, Thân, Dậu, Tuất, Hợi. Mỗi con giáp tương ứng với một năm của chu kỳ 12 năm, mang các đặc tính và tính cách riêng biệt.",
  },
  {
    title: "Phong tục Xông đất",
    content:
      "Xông đất là phong tục truyền thống, người ta chọn người tốt để vào nhà trước tiên trong ngày Tết, với niềm tin rằng điều này sẽ mang lại may mắn, tài lộc cho gia đình cả năm.",
  },
  {
    title: "Lì xì - Phong tục truyền thống",
    content:
      "Lì xì là tiền được đóng trong bao đỏ, người lớn tuổi tặng cho trẻ nhỏ hoặc những người trẻ để mang lại may mắn, tài lộc. Lì xì biểu tượng cho tình thương, chúc phúc của người bề trên.",
  },
  {
    title: "Hoa Tết - Hoa Đào và Hoa Mai",
    content:
      "Hoa đào tượng trưng cho sự thanh tịnh, sảng khoái - được ưa chuộng ở miền Bắc. Hoa mai tượng trưng cho sự chồi lộc, vàng tươi - phổ biến ở miền Nam. Cả hai loại hoa đều là biểu tượng của Tết Việt.",
  },
  {
    title: "Câu đối Tết - Nghệ thuật chữ",
    content:
      'Câu đối đỏ với chữ vàng được dán trên cửa nhà, mang lời chúc tốt lành. Những câu đối nổi tiếng như "An khang thịnh vượng" hay "Hạnh phúc an lành" thể hiện những mong muốn tốt đẹp của người dân.',
  },
]

export default function TetCulture() {
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
          <h1 className="text-4xl font-bold text-primary mb-2">Hiểu thêm về Tết</h1>
          <p className="text-muted-foreground">Tìm hiểu về văn hóa, phong tục truyền thống Tết Việt</p>
        </div>

        {/* Culture Topics */}
        <div className="grid md:grid-cols-2 gap-6">
          {cultureTopics.map((topic) => (
            <Card key={topic.title} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-3">{topic.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
            </Card>
          ))}
        </div>

        {/* Quick Facts */}
        <Card className="mt-8 p-6 bg-secondary/10 border border-secondary/20">
          <h3 className="font-semibold text-foreground mb-4">Những sự thật thú vị về Tết</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Tết Việt được UNESCO công nhận là di sản văn hóa phi vật thể của nhân loại</li>
            <li>✓ Người Việt thường chuẩn bị cho Tết từ 1-2 tuần trước ngày Tết</li>
            <li>✓ Tiết kiệp là ngày cuối cùng của năm âm lịch, rất quan trọng trong phong tục</li>
            <li>✓ Lịch Tết Việt không cố định, được tính theo âm lịch nên thay đổi từ năm này đến năm khác</li>
          </ul>
        </Card>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type WishCategoryId =
  | "family"
  | "lover"
  | "friends"
  | "boss"
  | "customers"
  | "humorous"

interface WishCategory {
  id: WishCategoryId
  name: string
  wishes: string[]
}

const wishCategories: WishCategory[] = [
  {
    id: "family",
    name: "Gia đình",
    wishes: [
      "Chúc gia đình mình một năm mới mạnh khỏe, bình an, lúc nào cũng cười thật tươi bên nhau.",
      "Năm mới sang, chúc cả nhà sum vầy đầm ấm, hạnh phúc trọn vẹn, vạn sự như ý.",
      "Chúc ba mẹ luôn khỏe mạnh, sống lâu trăm tuổi để con cháu được phụng dưỡng, quây quần mỗi dịp Tết.",
      "Mong cho gia đình mình năm mới không lo toan, không muộn phiền, chỉ toàn điều tốt đẹp ghé thăm.",
      "Chúc ông bà sống lâu, sống khỏe, luôn là bóng cây che chở cho con cháu dưới mái nhà thân thương.",
      "Năm mới, chúc anh chị em trong nhà hiểu nhau hơn, yêu thương nhau hơn, cùng nhau cố gắng vì tương lai.",
      "Chúc gia đình ta túi luôn đầy, tim luôn ấm, bếp luôn đỏ lửa, nhà luôn đầy tiếng cười.",
      "Tết đến xuân về, chúc nhà mình phúc nhiều như mai nở, lộc nhiều như đào khoe sắc.",
      "Chúc cả nhà ăn Tết no say, tiền tiêu rủng rỉnh, đi đâu cũng bình an, về đâu cũng có nhau.",
      "Gia đình là điều tuyệt vời nhất, chúc nhà mình năm mới vững vàng, gắn kết và hạnh phúc dài lâu.",
    ],
  },
  {
    id: "lover",
    name: "Người yêu",
    wishes: [
      "Năm mới chỉ mong chúng ta luôn nắm tay nhau thật chặt, đi qua mọi buồn vui mà vẫn còn trọn vẹn bên nhau.",
      "Chúc người em/anh thương một năm mới bình an, nhiều niềm vui, và lúc nào cũng được yêu chiều như bây giờ.",
      "Tết này có anh/em là đủ, chúc chúng ta thêm nhiều kỷ niệm đẹp, bớt giận dỗi, thêm hiểu nhau.",
      "Năm mới, chúc tình yêu của chúng ta luôn ngọt ngào như mứt Tết, bền chặt như bánh chưng vuông vắn.",
      "Chúc em/anh luôn xinh đẹp, rạng rỡ và tự tin, vì trong mắt anh/em, em/anh lúc nào cũng là duy nhất.",
      "Mong rằng năm nay và nhiều năm nữa, người lì xì cho em/anh nhiều nhất luôn là… anh/em.",
      "Chúc mình yêu có một năm làm điều mình thích, gặp người mình thương và thành công với điều mình đam mê.",
      "Năm mới, anh/em không hứa điều gì to tát, chỉ hứa vẫn ở đây, yêu em/anh nhiều hơn mỗi ngày.",
      "Chúc cho chuyến hành trình mang tên ‘chúng ta’ bước sang năm mới thêm bình yên, thêm tin tưởng.",
      "Tết này chưa cần pháo hoa, chỉ cần tin nhắn của em/anh là lòng anh/em đã rực sáng rồi.",
    ],
  },
  {
    id: "friends",
    name: "Bạn bè",
    wishes: [
      "Chúc bạn năm mới: công việc ổn định, tiền lương tăng mạnh, tình duyên nở rộ, cuộc sống nhẹ nhàng.",
      "Tết đến rồi, chúc hội bạn thân của chúng ta mãi vui, mãi bền, đứa nào cũng giàu, không ai bị bỏ lại.",
      "Năm mới, chúc bạn luôn đủ ‘lì’ để vượt khó, đủ ‘lì xì’ để không lo nghĩ chuyện tiền bạc.",
      "Chúc bạn bước sang năm mới với trái tim đầy nhiệt huyết, cái đầu tỉnh táo và chiếc ví đầy tiền.",
      "Chúc cho tình bạn của chúng ta dù bận rộn thế nào vẫn luôn có những cuộc hẹn cà phê, tám chuyện đầu năm.",
      "Năm mới, chúc bạn ít deadline, ít tăng ca, nhưng nhiều kỳ nghỉ, nhiều chuyến đi chơi cùng nhau.",
      "Chúc bạn sang năm mới vẫn giữ được chất riêng, sự vui tính và chút ‘điên’ dễ thương vốn có.",
      "Tết này chúc bạn ăn thật ngon, ngủ thật sâu, tiền vào như nước, phiền não trôi đi như mây.",
      "Mong cho năm mới, những điều bạn mong đều thành hiện thực, những điều bạn sợ đều ở lại phía sau.",
      "Chúc bạn một năm mới đủ nắng để rực rỡ, đủ mưa để trưởng thành, đủ bạn bè để không thấy cô đơn.",
    ],
  },
  {
    id: "boss",
    name: "Sếp & Đồng nghiệp",
    wishes: [
      "Nhân dịp năm mới, kính chúc sếp luôn mạnh khỏe, sáng suốt, dẫn dắt công ty ngày càng phát triển thịnh vượng.",
      "Chúc sếp một năm mới nhiều thành công mới, dự án nào cũng thắng lớn, đội ngũ ngày càng gắn kết.",
      "Kính chúc Anh/Chị và gia đình một năm mới an khang – thịnh vượng, vạn sự hanh thông.",
      "Chúc toàn thể đồng nghiệp một năm mới làm việc hiệu quả, lương thưởng dồi dào, môi trường vui vẻ, đoàn kết.",
      "Năm mới, chúc cho công ty ta ngày càng vươn xa, doanh thu tăng trưởng, ai cũng có thưởng Tết thật to.",
      "Chúc đội chúng ta năm mới ít họp gấp, ít tăng ca, nhưng nhiều niềm vui và nhiều cơ hội phát triển.",
      "Chúc sếp và các anh chị đồng nghiệp luôn giữ vững tinh thần máu lửa, cháy hết mình với từng dự án.",
      "Năm mới, chúc cho mọi khó khăn trong công việc được thay thế bằng những cơ hội mới, những hợp đồng mới.",
      "Chúc công ty bước sang năm mới với tinh thần mới, mục tiêu mới và những cột mốc rực rỡ hơn.",
      "Kính chúc quý lãnh đạo và toàn thể anh chị em đồng nghiệp: sức khỏe dồi dào, sự nghiệp bền vững, gia đình hạnh phúc.",
    ],
  },
  {
    id: "customers",
    name: "Khách hàng & Đối tác",
    wishes: [
      "Xin kính chúc Quý khách một năm mới an khang – thịnh vượng, vạn sự như ý.",
      "Cảm ơn Quý khách đã đồng hành trong suốt thời gian qua. Kính chúc Quý khách năm mới sức khỏe, thành công và hạnh phúc.",
      "Nhân dịp Xuân mới, xin gửi đến Quý đối tác lời chúc: hợp tác bền lâu, cùng nhau phát triển, cùng nhau thịnh vượng.",
      "Chúc Quý khách hàng và gia đình một năm mới bình an, tài lộc dồi dào, mọi việc suôn sẻ.",
      "Xin kính chúc Quý đối tác năm mới gặt hái thêm nhiều thành công, mở rộng thêm nhiều cơ hội, hợp tác lâu dài cùng chúng tôi.",
      "Năm mới, cảm ơn Quý khách đã tin tưởng lựa chọn dịch vụ/sản phẩm của chúng tôi. Kính chúc Quý khách trăm điều như ý.",
      "Xin gửi lời chúc tốt đẹp nhất đến Quý khách: sức khỏe vững vàng, gia đình hạnh phúc, kinh doanh hưng thịnh.",
      "Chúng tôi trân trọng mối quan hệ hợp tác với Quý đối tác. Kính chúc năm mới an khang, công việc thuận buồm xuôi gió.",
      "Chúc Quý khách bước sang năm mới với nhiều cơ hội, nhiều thành tựu và nhiều niềm vui mới.",
      "Xuân mới, kính chúc Quý khách – Quý đối tác một năm rực rỡ, đồng hành cùng phát triển và thành công bền vững.",
    ],
  },
  {
    id: "humorous",
    name: "Hài hước",
    wishes: [
      "Chúc bạn năm mới: tiền vô như nước sông Hồng, tiền ra nhỏ giọt như cà phê phin.",
      "Năm mới chúc bạn: ăn không lo béo, ngủ không lo muộn, chơi không lo mệt, tiêu tiền không lo thiếu.",
      "Chúc bạn Tết này chỉ tăng mỗi… tiền, không tăng ký, không tăng deadline.",
      "Năm mới mong bạn: ít việc, nhiều lương, sếp dễ thương, đồng nghiệp dễ tính.",
      "Chúc bạn: đầu năm vui vẻ, giữa năm sung sướng, cuối năm vẫn còn tiền xài Tết.",
      "Chúc bạn năm mới: đi làm như đi chơi, lương về như trúng số, ăn Tết khỏi lo cháy túi.",
      "Tết này chúc bạn chỉ bị ‘khủng bố’ bởi lì xì, không bị hỏi bao giờ lấy chồng/vợ.",
      "Chúc bạn: ra đường được trai xinh gái đẹp chúc Tết, về nhà được lì xì ngập ví.",
      "Năm mới, chúc bạn mạnh khỏe như trâu, dẻo dai như kẹo kéo, dính may mắn như keo 502.",
      "Chúc bạn suốt năm chỉ biết mệt… vì cười, đau… vì nhận quà, bối rối… vì nhiều người chúc.",
    ],
  },
]

export default function TetWishes() {
  const [selectedCategory, setSelectedCategory] = useState<WishCategoryId>("family")
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const currentCategory = wishCategories.find((cat) => cat.id === selectedCategory)
  const currentWishes = currentCategory?.wishes ?? []

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 1800)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7e6] via-[#ffe9d6] to-[#ffe0cc] py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Nút quay lại nhỏ ở góc */}
        <div className="flex items-center justify-between mb-2">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/70 border-amber-300 text-red-700 hover:bg-amber-50"
            >
              ← Về trang chính
            </Button>
          </Link>
          <span className="hidden md:inline text-[11px] text-red-700/70">
            Tip: Nhấn vào câu chúc để sao chép nhanh
          </span>
        </div>

        {/* HEADER TẾT SÁNG – giống style van-khan */}
        <div className="text-center relative">
          <div className="absolute inset-x-10 -top-2 h-8 border-t border-amber-300/70 rounded-t-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-amber-300/80 mb-3 shadow-sm">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-amber-400 text-xs font-bold text-white shadow">
              ✦
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-red-700/80">
              Xuân – Tết – Câu chúc
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 drop-shadow-[0_0_10px_rgba(248,250,252,0.4)]">
            Câu Chúc Tết Hay
          </h1>
          <p className="mt-3 text-sm md:text-base text-red-700/90 max-w-2xl mx-auto">
            Tổng hợp những câu chúc Tết{" "}
            <span className="font-semibold text-red-700">
              lịch sự, ấm áp, hài hước
            </span>{" "}
            cho mọi đối tượng: gia đình, người yêu, bạn bè, sếp & khách hàng.
          </p>
        </div>

        {/* BỘ LỌC DANH MỤC */}
        <div className="flex flex-wrap gap-3 justify-center">
          {wishCategories.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={[
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all border",
                  "flex items-center gap-2",
                  isActive
                    ? "bg-gradient-to-r from-red-500 via-red-400 to-amber-300 text-white border-amber-400 shadow-[0_0_14px_rgba(248,181,0,0.6)]"
                    : "bg-white/80 border-amber-300 text-red-700 hover:bg-amber-50",
                ].join(" ")}
              >
                {cat.name}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-100" />
                )}
              </button>
            )
          })}
        </div>

        {/* DANH SÁCH CÂU CHÚC */}
        <div className="space-y-4">
          {currentWishes.map((wish, idx) => (
            <Card
              key={idx}
              className="relative overflow-hidden border border-amber-300 bg-white/95 backdrop-blur-sm shadow-[0_8px_20px_rgba(148,63,37,0.16)] rounded-3xl cursor-pointer group"
              onClick={() => copyToClipboard(wish)}
            >
              {/* Hoa văn góc tương tự van-khan.tsx */}
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                aria-hidden
              >
                <div className="absolute top-3 left-6 h-8 w-8 border-t border-l border-amber-300/80 rounded-tl-2xl" />
                <div className="absolute top-3 right-6 h-8 w-8 border-t border-r border-amber-300/80 rounded-tr-2xl" />
                <div className="absolute bottom-3 left-6 h-8 w-8 border-b border-l border-amber-300/80 rounded-bl-2xl" />
                <div className="absolute bottom-3 right-6 h-8 w-8 border-b border-r border-amber-300/80 rounded-br-2xl" />
              </div>

              <div className="relative p-5 md:p-6 flex flex-col gap-2">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    <div className="h-7 w-7 rounded-full bg-red-50 border border-red-200 text-xs flex items-center justify-center text-red-700 font-semibold">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-[15px] leading-relaxed text-[#5b2b20]">
                      {wish}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 border-red-300 bg-red-50 text-red-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-400 hover:text-white hover:border-amber-400 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(wish)
                    }}
                  >
                    {copiedText === wish ? "✓ Đã sao chép" : "Sao chép"}
                  </Button>
                </div>

                <div className="text-[11px] text-red-600/75 mt-1">
                  Nhấn vào thẻ câu chúc để{" "}
                  <span className="font-semibold">sao chép nhanh</span>. Phù hợp
                  gửi qua Zalo, Messenger, email…
                </div>
              </div>
            </Card>
          ))}

          {currentWishes.length === 0 && (
            <div className="text-center text-sm text-red-700/70 py-8">
              Chưa có câu chúc cho mục này.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

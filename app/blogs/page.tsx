"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  image?: string
}

// Placeholder nếu chưa có ảnh riêng
const DEFAULT_IMAGE = "/placeholder-blog.png"

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Lịch sử và ý nghĩa Tết Nguyên Đán",
    excerpt:
      "Tìm hiểu nguồn gốc, ý nghĩa thiêng liêng của Tết Nguyên Đán trong đời sống tinh thần của người Việt.",
    content:
      "Tết Nguyên Đán là lễ hội quan trọng nhất trong năm của người Việt, đánh dấu sự chuyển giao giữa năm cũ và năm mới theo lịch âm. Tết là dịp đoàn tụ gia đình, tưởng nhớ tổ tiên, gửi gắm ước vọng cho một năm mới an khang, thịnh vượng.\n\nNgoài ý nghĩa là một mốc thời gian, Tết còn là dịp để mỗi người tạm dừng lại, nhìn lại chặng đường đã qua và đặt ra những dự định mới. Không khí chuẩn bị Tết, từ dọn dẹp nhà cửa, mua sắm, trang trí, cho đến những cuộc gặp gỡ cuối năm, tất cả tạo nên một dòng chảy cảm xúc rất riêng trong tâm thức người Việt.\n\nGia đình là trung tâm của Tết. Dù đi làm, đi học xa quê, mọi người đều cố gắng thu xếp về nhà sum họp. Chính vì vậy, Tết Nguyên Đán không chỉ là một ngày lễ, mà còn là biểu tượng của sự sum vầy và gắn kết.",
    category: "Văn hóa",
    date: "2025-01-05",
    readTime: "5 phút",
    image: "https://files.catbox.moe/jzn9u4.jpg",
  },
  {
    id: "2",
    title: "Các phong tục chuẩn bị Tết truyền thống",
    excerpt:
      "Từ dọn dẹp nhà cửa, sắm sửa đồ Tết đến cúng ông Công ông Táo – tất cả đều mang ý nghĩa riêng.",
    content:
      "Chuẩn bị Tết thường bắt đầu từ những ngày cuối tháng Chạp: dọn dẹp nhà cửa, giặt giũ chăn màn, sơn sửa lại không gian sống, sắm sửa quần áo mới, mua hoa đào, hoa mai, mâm ngũ quả.\n\nNgoài ra, nhiều gia đình còn chuẩn bị mâm cơm tất niên, mời người thân, bạn bè đến cùng ôn chuyện cũ, chia sẻ về một năm đã qua. Tập quán này giúp thắt chặt thêm tình thân và mở ra một khởi đầu mới đầy hy vọng.\n\nViệc cúng ông Công ông Táo ngày 23 tháng Chạp cũng là một phong tục quan trọng, thể hiện tâm niệm tiễn Táo quân về chầu Trời, báo cáo những việc lớn nhỏ trong gia đình suốt một năm.",
    category: "Phong tục",
    date: "2025-01-06",
    readTime: "7 phút",
    image: "https://files.catbox.moe/codl09.jpg",
  },
  {
    id: "3",
    title: "Ý nghĩa của các món ăn ngày Tết",
    excerpt:
      "Bánh chưng, dưa hành, giò chả, thịt kho tàu… mỗi món đều gửi gắm một lời chúc cho năm mới.",
    content:
      "Mâm cơm ngày Tết không chỉ để ăn ngon mà còn là lời cầu chúc cho năm mới. Bánh chưng, bánh tét tượng trưng cho đất trời, thể hiện ước vọng no đủ, vẹn tròn. Dưa hành, củ kiệu giúp bữa ăn bớt ngấy, đồng thời mang ý nghĩa giải trừ điều không may.\n\nGiò chả, thịt kho tàu, canh măng, xôi gấc... mỗi vùng miền sẽ có các món khác nhau nhưng đều hướng đến sự đủ đầy. Nhiều gia đình còn giữ thói quen chuẩn bị mâm cơm cúng gia tiên với đầy đủ món truyền thống, như một cách tri ân và mời ông bà về ăn Tết cùng con cháu.\n\nNhờ những món ăn này, không khí Tết trở nên đậm đà, ấm cúng và giàu bản sắc hơn.",
    category: "Ẩm thực",
    date: "2025-01-07",
    readTime: "6 phút",
    image: "https://files.catbox.moe/uipmf7.jpg",
  },
  {
    id: "4",
    title: "Mâm ngũ quả ngày Tết: Cách bày và ý nghĩa",
    excerpt:
      "Tại sao trên bàn thờ ngày Tết luôn có mâm ngũ quả và từng loại quả tượng trưng cho điều gì?",
    content:
      "Mâm ngũ quả là lễ vật không thể thiếu trên bàn thờ gia tiên ngày Tết. Tùy vùng miền mà cách chọn và bày trí khác nhau: miền Bắc thường có chuối, bưởi, cam, quýt, táo; miền Nam chuộng mãng cầu, dừa, đu đủ, xoài, dứa.\n\nSố \"5\" trong ngũ quả tượng trưng cho ngũ hành, ngũ phúc (phú, quý, thọ, khang, ninh). Việc lựa chọn và bày mâm ngũ quả thể hiện mong ước về một năm mới đủ đầy, hài hòa và bình an.\n\nNgày nay, nhiều gia đình bày mâm ngũ quả theo gu thẩm mỹ hiện đại hơn nhưng ý nghĩa cốt lõi vẫn là lòng thành kính với tổ tiên và khát vọng cho một năm mới tốt lành.",
    category: "Tín ngưỡng",
    date: "2025-01-08",
    readTime: "5 phút",
    image: "https://files.catbox.moe/ywyfgf.jpg",
  },
  {
    id: "5",
    title: "Những điều nên làm và nên kiêng trong ngày Tết",
    excerpt:
      "Một số quan niệm dân gian về điều nên tránh, nên làm để năm mới được hanh thông, may mắn.",
    content:
      "Theo quan niệm dân gian, ngày Tết nên nói lời hay ý đẹp, tránh cãi vã, xung đột hay dùng những từ ngữ xui xẻo. Người ta kiêng làm vỡ bát đĩa, kiêng quét nhà quá sớm vì sợ quét mất lộc.\n\nMặt khác, đây cũng là dịp nên đi chúc Tết, hỏi thăm họ hàng, bạn bè, dành thời gian cho gia đình, làm việc thiện và gieo những hạt giống tốt cho năm mới. Tinh thần chung là hướng đến sự vui vẻ, nhẹ nhàng, lành mạnh.\n\nDù không nhất thiết phải tin 100% vào mọi điều kiêng kỵ, nhưng thái độ trân trọng văn hóa và giữ bầu không khí tích cực ngày đầu năm vẫn là điều đáng quý.",
    category: "Phong tục",
    date: "2025-01-09",
    readTime: "8 phút",
    image: "https://files.catbox.moe/lpi15t.jpeg",
  },
  {
    id: "6",
    title: "Lì xì Tết: Nguồn gốc và cách lì xì tinh tế",
    excerpt:
      "Lì xì không chỉ là tiền trong phong bao đỏ mà còn là cách gửi gắm lời chúc đầu xuân.",
    content:
      "Tục lì xì xuất phát từ quan niệm dùng tiền may mắn để xua đuổi điều xấu và mang lại bình an cho trẻ nhỏ. Phong bao đỏ tượng trưng cho điềm lành, sự vui tươi, rực rỡ của năm mới.\n\nNgày nay, lì xì không chỉ dành cho trẻ em mà còn giữa bạn bè, đồng nghiệp, người thân. Cách lì xì tinh tế không phải ở số tiền lớn hay nhỏ, mà ở lời chúc đi kèm, thái độ chân thành và sự khéo léo trong từng hoàn cảnh.\n\nNhiều người còn sáng tạo thêm những cách lì xì vui như kèm theo thiệp viết tay, câu chúc hài hước hoặc thử thách nho nhỏ để tạo không khí sôi nổi đầu năm.",
    category: "Văn hóa",
    date: "2025-01-10",
    readTime: "4 phút",
    image: "https://files.catbox.moe/7jew41.jpg",
  },
  {
    id: "7",
    title: "Trang trí nhà cửa đón Tết: Gợi ý đơn giản mà ấm cúng",
    excerpt:
      "Không cần quá cầu kỳ, chỉ vài chi tiết nhỏ cũng đủ mang không khí Tết vào nhà.",
    content:
      "Trang trí nhà cửa đón Tết không nhất thiết phải tốn kém. Một vài điểm nhấn như khăn trải bàn màu đỏ, lọ hoa tươi, câu đối treo tường, một góc nhỏ để bày mâm ngũ quả cũng đủ mang lại cảm giác ấm cúng.\n\nQuan trọng nhất là không gian gọn gàng, sáng sủa. Dọn dẹp nhà cửa trước Tết không chỉ để sạch đẹp mà còn mang ý nghĩa gột rửa điều cũ, chuẩn bị đón điều mới.\n\nNếu muốn thêm chút hiện đại, bạn có thể kết hợp đèn led, khung ảnh gia đình, góc đọc sách nhỏ... để tạo nên một không gian Tết vừa truyền thống vừa gần gũi.",
    category: "Trang trí",
    date: "2025-01-11",
    readTime: "6 phút",
    image: "https://files.catbox.moe/d7m3ws.jpg",
  },
  {
    id: "8",
    title: "Tết ba miền: Bắc – Trung – Nam có gì khác nhau?",
    excerpt:
      "Cùng là Tết Việt nhưng mỗi vùng miền lại có những phong tục, món ăn và cách đón Tết riêng.",
    content:
      "Ở miền Bắc, Tết thường gắn với hoa đào, bánh chưng, dưa hành, thịt đông, thời tiết se lạnh. Miền Trung chịu nhiều thiên tai nên Tết vừa giản dị vừa đậm đà với bánh tét, dưa món, nem chua. Miền Nam rộn ràng với mai vàng, bánh tét lá cẩm, thịt kho trứng, khổ qua dồn thịt.\n\nMặc dù khác nhau về cách bày biện, món ăn và thói quen sinh hoạt, nhưng điểm chung lớn nhất của Tết ba miền vẫn là sum họp, hiếu kính tổ tiên và mong cầu một năm mới bình an, sung túc.\n\nChính sự phong phú này đã làm nên một bức tranh Tết Việt đa màu sắc, vừa thống nhất vừa đa dạng.",
    category: "Văn hóa",
    date: "2025-01-12",
    readTime: "7 phút",
    image: "https://files.catbox.moe/zul5tt.jpg",
  },
  {
    id: "9",
    title: "Tết thời hiện đại: Giữ gìn và làm mới truyền thống",
    excerpt:
      "Giữa nhịp sống bận rộn, làm sao để Tết vẫn ý nghĩa mà không quá mệt mỏi?",
    content:
      "Ngày nay, nhiều gia đình chọn giản lược bớt việc nấu nướng cầu kỳ, thay bằng đặt món hoặc đi ăn ngoài, đi du lịch ngắn ngày. Điều đó không có nghĩa là Tết mất đi giá trị, mà là cách thích nghi với nhịp sống mới.\n\nĐiều quan trọng là vẫn giữ được những hạt nhân truyền thống như thăm viếng người thân, cúng gia tiên, chúc Tết, lì xì, dành thời gian cho gia đình.\n\nTết hiện đại có thể gọn nhẹ hơn nhưng không nên biến thành một kỳ nghỉ chỉ để ngủ bù hoặc dán mắt vào màn hình. Một chút chủ động sắp xếp sẽ giúp Tết vừa đỡ mệt vừa vẫn đậm chất sum vầy.",
    category: "Góc nhìn",
    date: "2025-01-13",
    readTime: "5 phút",
    image: "https://files.catbox.moe/2ktzf5.jpg",
  },
  {
    id: "10",
    title: "Gợi ý hoạt động ý nghĩa cho ngày mùng 1 Tết",
    excerpt:
      "Ngoài chúc Tết, đi chơi, bạn có thể làm gì để ngày mùng 1 trở nên thật đáng nhớ?",
    content:
      "Ngày mùng 1 là thời điểm nhiều người chọn để đi chùa, xin lộc đầu năm, chúc Tết họ hàng, bạn bè thân thiết. Bên cạnh đó, bạn có thể dành thời gian cho những hoạt động nhẹ nhàng như đọc sách, đi dạo, chơi board game cùng gia đình.\n\nĐây cũng là dịp phù hợp để cả nhà cùng nhau đặt mục tiêu cho năm mới, viết vài điều mong ước, cùng chia sẻ dự định cá nhân để hiểu nhau hơn.\n\nQuan trọng nhất là giữ tâm thế thư thái, không quá vội vàng hay áp lực, để ngày đầu năm trôi qua một cách nhẹ nhàng nhưng đầy ý nghĩa.",
    category: "Gợi ý",
    date: "2025-01-14",
    readTime: "4 phút",
    image: "https://files.catbox.moe/5oo48v.jpg",
  },
]

export default function BlogsPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handleOpen = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const handleClose = () => {
    setSelectedPost(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7e6] via-[#ffe9d6] to-[#ffe0cc] py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center relative">
          <div className="absolute inset-x-10 -top-2 h-8 border-t border-amber-300/70 rounded-t-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-amber-300/80 mb-3 shadow-sm">
            <span className="text-xs tracking-[0.2em] uppercase text-red-700/80">
              Góc Blog Tết
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-red-900">
            Blog Tết Việt
          </h1>
          <p className="mt-3 text-sm md:text-base text-red-800/90 max-w-2xl mx-auto">
            Các bài viết ngắn gọn, dễ đọc về văn hóa, phong tục, ẩm thực và góc
            nhìn Tết Việt, giúp bạn hiểu Tết sâu hơn, trọn vẹn hơn.
          </p>
        </div>

        {/* Danh sách bài viết */}
        <div className="space-y-4">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border border-amber-300 bg-white/95 rounded-3xl shadow-[0_8px_18px_rgba(148,63,37,0.14)] hover:shadow-[0_10px_26px_rgba(148,63,37,0.2)] transition-shadow cursor-pointer"
              onClick={() => handleOpen(post)}
            >
              {/* Ảnh bìa */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={post.image || DEFAULT_IMAGE}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Nội dung card */}
              <div className="relative p-5 md:p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-red-700/80">
                  <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-[11px] font-medium text-red-700"
                  >
                    {post.category}
                  </Badge>
                  <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
                  <span>• {post.readTime}</span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-red-900 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-[#5b2b20] leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-1 text-xs font-medium text-red-700/85">
                  Đọc tiếp →
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating modal đọc blog */}
      {selectedPost && (
        <>
          {/* style cho animation */}
          <style>{`
            @keyframes blog-backdrop-fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes blog-modal-in {
              from {
                opacity: 0;
                transform: translateY(16px) scale(0.97);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .blog-backdrop-animate {
              animation: blog-backdrop-fade 0.2s ease-out;
            }
            .blog-modal-animate {
              animation: blog-modal-in 0.25s ease-out;
            }
          `}</style>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Nền mờ */}
            <div
              className="absolute inset-0 bg-black/40 blog-backdrop-animate"
              onClick={handleClose}
            />

            {/* Hộp nội dung */}
            <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-amber-300 bg-[#fffaf0] shadow-[0_18px_40px_rgba(0,0,0,0.35)] flex flex-col blog-modal-animate">
              {/* Ảnh lớn */}
              <div className="relative h-56 w-full overflow-hidden border-b border-amber-200">
                <img
                  src={selectedPost.image || DEFAULT_IMAGE}
                  alt={selectedPost.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Header bài viết */}
              <div className="flex items-start justify-between gap-3 border-b border-amber-200 px-5 py-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-red-700/80">
                    <Badge
                      variant="outline"
                      className="border-red-200 bg-red-50 text-[11px] font-medium text-red-700"
                    >
                      {selectedPost.category}
                    </Badge>
                    <span>
                      {new Date(selectedPost.date).toLocaleDateString("vi-VN")}
                    </span>
                    <span>• {selectedPost.readTime} đọc</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-red-900 leading-snug">
                    {selectedPost.title}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-2 rounded-full border border-amber-300 bg-white/80 px-3 py-1 text-xs font-medium text-red-800 hover:bg-amber-50"
                >
                  Đóng
                </button>
              </div>

              {/* Nội dung bài viết */}
              <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4">
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#5b2b20]">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

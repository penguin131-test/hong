"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type DishCategory =
  | "Bánh - Giò - Xôi"
  | "Món mặn"
  | "Canh & Dưa"
  | "Mứt & Bánh kẹo"
  | "Tráng miệng"

interface TetDish {
  id: string
  name: string
  category: DishCategory
  shortDescription: string
  significance: string
  image?: string
  ingredients: string[]
  steps: string[]
  tips?: string
}

// Placeholder nếu chưa có ảnh riêng
const DEFAULT_IMAGE = "/placeholder-dish.png"

const TET_DISHES: TetDish[] = [
  // === BÁNH - GIÒ - XÔI ===
  {
    id: "banh-chung",
    name: "Bánh chưng",
    category: "Bánh - Giò - Xôi",
    shortDescription:
      "Bánh chưng hình vuông làm từ gạo nếp, đậu xanh, thịt ba chỉ, gói lá dong – món không thể thiếu trên mâm cỗ Tết.",
    significance:
      "Tượng trưng cho đất, thể hiện ước mong no đủ, vẹn tròn và nhớ ơn nguồn cội.",
    image: "https://files.catbox.moe/av3pgt.jpg",
    ingredients: [
      "Gạo nếp ngon: 1 kg",
      "Đậu xanh đã cà vỏ: 500 g",
      "Thịt ba chỉ: 500–700 g",
      "Lá dong, lạt giang để gói",
      "Muối, hạt tiêu, nước mắm",
    ],
    steps: [
      "Vo sạch gạo nếp, ngâm với nước có pha chút muối 4–6 giờ, vớt ra để ráo.",
      "Đậu xanh ngâm mềm, hấp chín rồi giã/đánh tơi, trộn ít muối cho đậm đà.",
      "Thịt ba chỉ thái miếng dày, ướp với muối, tiêu, nước mắm khoảng 30 phút.",
      "Chuẩn bị lá dong: rửa sạch, lau khô, cắt sống lá nếu cần để dễ gói.",
      "Lót lá, cho một lớp gạo nếp, tiếp đến là đậu xanh, thịt, đậu xanh và phủ gạo lên trên, nén vừa tay.",
      "Gói chặt tay, buộc lạt vuông vức. Xếp bánh vào nồi, đổ ngập nước, luộc 8–10 giờ, châm thêm nước sôi nếu cạn.",
      "Vớt bánh ra, ép bánh cho ráo nước, để nguội rồi cắt thưởng thức.",
    ],
    tips: "Gạo nếp ngon và thịt ba chỉ có đủ nạc – mỡ sẽ giúp bánh chưng mềm dẻo, béo nhưng không bị khô.",
  },
  {
    id: "banh-tet",
    name: "Bánh tét",
    category: "Bánh - Giò - Xôi",
    shortDescription:
      "Bánh tét hình trụ tròn, phổ biến ở miền Trung và miền Nam, có nhân đậu xanh, thịt hoặc chuối.",
    significance:
      "Tượng trưng cho sự đủ đầy, gắn kết gia đình, thường dùng để dâng cúng và làm quà Tết.",
    image: "https://files.catbox.moe/ibg7gx.jpg",
    ingredients: [
      "Gạo nếp: 1–1.2 kg",
      "Đậu xanh cà vỏ: 400–500 g",
      "Thịt ba chỉ: 400–600 g (hoặc chuối chín nếu làm bánh ngọt)",
      "Lá chuối để gói, dây lạt/nylon chịu nhiệt",
      "Muối, hạt tiêu, nước cốt dừa (tuỳ thích)",
    ],
    steps: [
      "Ngâm gạo nếp với nước khoảng 4–6 giờ, để ráo, trộn với một ít muối và nước cốt dừa cho thơm.",
      "Đậu xanh ngâm mềm, hấp chín rồi giã nhuyễn, nêm nhẹ muối.",
      "Thịt ba chỉ ướp muối, tiêu, nước mắm 20–30 phút.",
      "Lót lá chuối, cho lớp nếp, tiếp đến là đậu xanh, thịt (hoặc chuối), rồi phủ nếp, cuộn chặt và buộc dây đều tay.",
      "Xếp bánh vào nồi, đổ ngập nước, luộc khoảng 6–8 giờ, chú ý thêm nước sôi khi cạn.",
      "Vớt bánh ra, để ráo, nguội bớt là có thể cắt khoanh và dùng.",
    ],
    tips: "Buộc bánh đều tay để phần nếp phân bố cân xứng, bánh chín sẽ đẹp và dễ cắt hơn.",
  },
  {
    id: "xoi-gac",
    name: "Xôi gấc",
    category: "Bánh - Giò - Xôi",
    shortDescription:
      "Xôi gấc đỏ tươi, dẻo thơm, thường xuất hiện trong mâm cỗ cúng giao thừa, mùng 1 Tết.",
    significance:
      "Màu đỏ tượng trưng cho may mắn, hạnh phúc và khởi đầu thuận lợi cho năm mới.",
    image: "https://files.catbox.moe/e1mggj.jpg",
    ingredients: [
      "Gạo nếp: 800 g",
      "Quả gấc chín: 1 quả vừa",
      "Rượu trắng: 1–2 thìa để ướp gấc",
      "Đường, muối, chút dầu ăn hoặc nước cốt dừa",
    ],
    steps: [
      "Vo sạch gạo nếp, ngâm 4–6 giờ rồi để ráo.",
      "Bổ gấc, lấy phần thịt đỏ và hạt, trộn với chút rượu trắng và bóp nhẹ cho ra màu đỏ đẹp.",
      "Trộn gạo nếp với phần gấc đã ướp, thêm ít muối cho đậm đà.",
      "Cho xôi vào xửng, đồ chín khoảng 25–35 phút, thỉnh thoảng xới nhẹ để chín đều.",
      "Khi xôi gần chín, có thể trộn thêm chút đường hoặc nước cốt dừa cho béo ngậy.",
    ],
    tips: "Không nên cho quá nhiều nước cốt dừa sẽ làm xôi dễ bị nhão, khó tơi.",
  },
  {
    id: "gio-lua",
    name: "Giò lụa",
    category: "Bánh - Giò - Xôi",
    shortDescription:
      "Giò lụa trắng, dai giòn vừa phải, là món cắt khoanh ăn kèm bánh chưng, xôi, cơm.",
    significance:
      "Biểu trưng cho sự đầy đặn, sung túc; thường xuất hiện trên mâm cỗ cúng và mâm ăn gia đình.",
    image: "https://files.catbox.moe/uipmf7.jpg",
    ingredients: [
      "Thịt heo nạc xay (nạc đùi): 1 kg",
      "Mỡ heo: 100–150 g (nếu thích béo)",
      "Nước mắm ngon, muối, đường",
      "Bột năng hoặc bột bắp (một ít để tạo độ dai)",
      "Lá chuối để gói, dây buộc",
    ],
    steps: [
      "Thịt xay ướp muối, nước mắm, đường nhạt và một ít bột năng, trộn đều, xay hoặc quết lại cho thật dẻo.",
      "Thêm mỡ thái hạt lựu (nếu dùng), trộn đều.",
      "Lót lá chuối, cho giò vào, gói thành hình trụ, buộc chặt.",
      "Hấp hoặc luộc giò khoảng 1–1.5 giờ tuỳ kích thước.",
      "Để nguội hoàn toàn rồi cắt khoanh dùng.",
    ],
    tips: "Quết thịt càng kỹ, giò càng dẻo ngon; không nên nêm quá mặn vì khi nguội sẽ đậm hơn.",
  },

  // === MÓN MẶN ===
  {
    id: "thit-kho-tau",
    name: "Thịt kho tàu (thịt kho trứng)",
    category: "Món mặn",
    shortDescription:
      "Thịt ba chỉ kho cùng trứng với nước dừa, nước mắm, đường tạo nên món thịt mềm, béo, đậm đà.",
    significance:
      "Tượng trưng cho sự đủ đầy, ấm cúng; là món quen thuộc trên mâm cơm ngày Tết miền Nam.",
    image: "https://files.catbox.moe/r04pj6.jpg",
    ingredients: [
      "Thịt ba chỉ: 800 g",
      "Trứng vịt hoặc trứng cút: 6–10 quả",
      "Nước dừa tươi: 1–2 trái",
      "Nước mắm ngon, đường (nên dùng đường vàng), muối, tiêu, hành tỏi",
    ],
    steps: [
      "Rửa sạch thịt ba chỉ, cắt khúc vừa ăn, chần qua nước sôi để sạch bọt bẩn.",
      "Ướp thịt với nước mắm, đường, tiêu, hành tỏi băm khoảng 20–30 phút.",
      "Luộc trứng, bóc vỏ, có thể chiên sơ cho săn.",
      "Cho thịt vào nồi, đảo cho săn rồi đổ nước dừa vào, nêm lại gia vị cho vừa.",
      "Kho nhỏ lửa 1–1.5 giờ cho đến khi thịt mềm, nước kho sánh lại, cho trứng vào kho cùng.",
    ],
    tips: "Lửa nhỏ, thời gian kho đủ lâu sẽ giúp thịt thấm vị, thớ mềm nhưng không bị nát.",
  },
  {
    id: "ga-luoc",
    name: "Gà luộc",
    category: "Món mặn",
    shortDescription:
      "Gà ta luộc nguyên con, da vàng óng, thịt ngọt – thường dùng để cúng giao thừa, mùng 1.",
    significance:
      "Tượng trưng cho sự đủ đầy, cát tường; con gà trống còn biểu trưng cho sự tỉnh thức, chăm chỉ.",
    image: "https://files.catbox.moe/jduc0x.jpg",
    ingredients: [
      "Gà ta từ 1.2–1.5 kg",
      "Gừng, hành lá hoặc hành tím",
      "Muối, nước lạnh đủ ngập gà",
      "Chút nghệ (nếu muốn da vàng hơn)",
    ],
    steps: [
      "Làm sạch gà, xát muối, gừng để khử mùi, rửa lại cho sạch.",
      "Cho gà vào nồi, đổ nước lạnh ngập gà, thêm vài lát gừng, hành, chút muối.",
      "Đun lửa vừa đến khi nước sôi lăn tăn, hớt bọt, sau đó hạ nhỏ lửa, luộc thêm khoảng 20–30 phút (tuỳ trọng lượng).",
      "Tắt bếp, để gà trong nồi thêm 5–10 phút rồi vớt ra, có thể nhúng qua nước lạnh cho da săn, vàng đẹp.",
      "Chặt miếng và bày lên đĩa, trang trí thêm lá chanh nếu thích.",
    ],
    tips: "Không nên để nước sôi bùng quá lâu, dễ làm da gà nứt và thịt bị khô.",
  },
  {
    id: "nem-ran",
    name: "Nem rán / Chả giò",
    category: "Món mặn",
    shortDescription:
      "Nem cuộn với nhân thịt, mộc nhĩ, miến, rau củ, chiên vàng giòn, chấm nước mắm chua ngọt.",
    significance:
      "Món ăn quen thuộc trong mâm cỗ, tượng trưng cho sự phong phú, đủ đầy.",
    image: "https://files.catbox.moe/2jdvdh.jpg",
    ingredients: [
      "Bánh đa nem hoặc bánh tráng",
      "Thịt heo xay, tôm băm (tuỳ ý)",
      "Mộc nhĩ, nấm hương, miến dong",
      "Cà rốt, hành tây, giá, trứng gà",
      "Gia vị: nước mắm, hạt nêm, tiêu",
    ],
    steps: [
      "Ngâm mộc nhĩ, nấm hương, miến; sau đó thái nhỏ.",
      "Trộn thịt, tôm, mộc nhĩ, miến, rau củ băm nhỏ, thêm trứng, nêm gia vị vừa ăn.",
      "Cuốn nhân vào bánh đa nem/bánh tráng thành cuốn chặt vừa phải.",
      "Chiên nem trong dầu nóng vừa, lật đều cho vàng giòn, có thể chiên 2 lần để nem giòn lâu.",
      "Pha nước mắm chua ngọt và ăn kèm với rau sống.",
    ],
    tips: "Chiên lửa vừa, không quá to để nem chín đều từ trong ra ngoài, không bị cháy vỏ.",
  },
  {
    id: "ca-kho",
    name: "Cá kho",
    category: "Món mặn",
    shortDescription:
      "Cá kho tiêu hoặc kho riềng, kho tộ, đậm đà, ăn kèm cơm trắng rất đưa cơm.",
    significance:
      "Cá mang ý nghĩa “dư dả”, “có ăn có để”, mong năm mới phát tài phát lộc.",
    image: "https://files.catbox.moe/yvnt79.jpg",
    ingredients: [
      "Cá (cá trắm, cá lóc, cá basa...): 1–1.2 kg",
      "Nước mắm, đường, tiêu, hành tỏi, ớt",
      "Riềng, gừng (tuỳ món kho miền Bắc/miền Trung)",
      "Nước màu hoặc đường thắng",
    ],
    steps: [
      "Làm sạch cá, cắt khúc, ướp với muối, tiêu, hành tỏi băm.",
      "Xếp cá vào nồi đất hoặc nồi dày, thêm riềng/gừng nếu muốn, rưới nước mắm, nước màu hoặc đường thắng lên.",
      "Đổ một ít nước (hoặc nước dừa) rồi kho lửa nhỏ.",
      "Kho đến khi nước sánh lại, cá chín, thấm vị, có thể thêm tiêu, ớt ở cuối cho thơm.",
    ],
    tips: "Không đảo cá quá nhiều khi kho để tránh nát; dùng nồi đất sẽ giúp món ăn thơm hơn.",
  },
  {
    id: "thit-dong",
    name: "Thịt đông",
    category: "Món mặn",
    shortDescription:
      "Món thịt nấu đông đặc trưng miền Bắc, ăn kèm dưa hành trong những ngày lạnh sau Tết.",
    significance:
      "Gắn với thời tiết se lạnh miền Bắc, thể hiện sự khéo léo trong cách tận dụng nguyên liệu.",
    image: "https://files.catbox.moe/56x4pl.jpg",
    ingredients: [
      "Chân giò hoặc thịt ba chỉ: 700–800 g",
      "Tai heo, bì heo (tuỳ thích)",
      "Mộc nhĩ, nấm hương",
      "Hành tím, hạt tiêu, nước mắm",
    ],
    steps: [
      "Rửa sạch thịt, chần qua nước sôi cho hết bọt bẩn.",
      "Thái miếng vừa ăn, ướp với nước mắm, tiêu, hành tím băm.",
      "Phi thơm hành, cho thịt vào đảo, đổ nước ngập, hầm đến khi thịt mềm.",
      "Thêm mộc nhĩ, nấm hương đã ngâm, nêm lại cho vừa.",
      "Múc vào bát, để nguội rồi cho vào ngăn mát tủ lạnh cho đông.",
    ],
    tips: "Lượng bì heo phù hợp sẽ giúp thịt đông trong, dẻo mà không bị cứng.",
  },

  // === CANH & DƯA ===
  {
    id: "canh-mang-kho",
    name: "Canh măng khô",
    category: "Canh & Dưa",
    shortDescription:
      "Măng khô ninh cùng xương hoặc móng giò tạo vị ngọt thanh, là món canh quen thuộc ngày Tết miền Bắc.",
    significance:
      "Bổ sung vị thanh, giúp mâm cỗ bớt ngấy và hoàn thiện mâm cơm truyền thống.",
    image: "https://files.catbox.moe/dums6u.jpg",
    ingredients: [
      "Măng khô: 200–300 g",
      "Xương heo, móng giò hoặc gà: 500–700 g",
      "Hành lá, mùi tàu, hành tím",
      "Gia vị: muối, nước mắm, hạt nêm",
    ],
    steps: [
      "Rửa sạch măng khô, ngâm qua đêm cho nở, luộc xả vài lần để bớt hăng, sau đó xé hoặc cắt miếng vừa ăn.",
      "Ninh xương hoặc móng giò cho ra nước ngọt, hớt bọt.",
      "Cho măng vào nồi nước xương, ninh thêm đến khi măng mềm.",
      "Nêm nếm cho vừa, thêm hành lá, mùi tàu khi tắt bếp.",
    ],
    tips: "Măng khô cần ngâm và luộc kỹ để loại bỏ độc tố và mùi hăng.",
  },
  {
    id: "canh-kho-qua",
    name: "Canh khổ qua nhồi thịt",
    category: "Canh & Dưa",
    shortDescription:
      "Khổ qua nhồi thịt băm, nấu canh thanh mát, thường xuất hiện trong mâm cỗ Tết miền Nam.",
    significance:
      "Mang ý nghĩa “khổ cực đã qua”, cầu chúc một năm mới bớt lo toan, thêm an lành.",
    image: "https://files.catbox.moe/pmclr5.jpg",
    ingredients: [
      "Khổ qua (mướp đắng): 4–6 quả",
      "Thịt heo băm, mọc (giò sống)",
      "Nấm mèo, hành tây (băm nhỏ)",
      "Hành lá, ngò rí, gia vị cơ bản",
    ],
    steps: [
      "Khổ qua rửa sạch, bỏ ruột, giữ nguyên hình quả.",
      "Trộn thịt băm, mọc, nấm mèo, hành băm, nêm gia vị vừa ăn.",
      "Nhồi nhân vào từng quả khổ qua, không nhồi quá chặt.",
      "Đun nước sôi, cho khổ qua vào nấu nhỏ lửa đến khi chín mềm.",
      "Nêm lại gia vị, rắc hành lá, ngò rí.",
    ],
    tips: "Không nấu lửa quá lớn vì dễ làm khổ qua nứt; có thể chần sơ khổ qua để bớt đắng.",
  },
  {
    id: "dua-hanh",
    name: "Dưa hành",
    category: "Canh & Dưa",
    shortDescription:
      "Hành muối chua nhẹ, giòn, thường ăn kèm thịt đông, bánh chưng để đỡ ngấy.",
    significance:
      "Giúp cân bằng vị béo của các món mặn và tạo sự hài hoà cho bữa Tết.",
    image: "https://files.catbox.moe/yfmoky.jpg",
    ingredients: [
      "Củ hành ta: 500 g",
      "Nước muối, đường, giấm (tuỳ khẩu vị)",
      "Ớt, tỏi (nếu thích)",
    ],
    steps: [
      "Cắt rễ, bóc bớt vỏ ngoài, rửa sạch hành.",
      "Pha nước muối loãng, ngâm hành cho bớt hăng rồi vớt ra để ráo.",
      "Pha nước ngâm: nước đun sôi để nguội, muối, đường, giấm theo vị chua mặn ngọt vừa ăn.",
      "Cho hành vào hũ sạch, đổ nước ngâm ngập mặt, để nơi thoáng mát.",
      "Sau 3–5 ngày dưa hành sẽ chua giòn, có thể dùng.",
    ],
    tips: "Hũ ngâm và dụng cụ cần sạch, khô để dưa không bị nổi váng.",
  },
  {
    id: "cu-kieu",
    name: "Củ kiệu",
    category: "Canh & Dưa",
    shortDescription:
      "Củ kiệu muối giòn giòn, chua nhẹ, thường ăn kèm tôm khô, thịt nguội ngày Tết miền Nam.",
    significance:
      "Tạo điểm nhấn cho mâm Tết, giúp bữa ăn thăng bằng vị, bớt ngấy.",
    image: "https://files.catbox.moe/snkc8c.jpg",
    ingredients: [
      "Củ kiệu: 500–800 g",
      "Muối, đường, giấm hoặc nước mắm tuỳ kiểu muối",
      "Ớt, tỏi (nếu thích)",
    ],
    steps: [
      "Cắt gốc, tách lớp vỏ già, rửa sạch củ kiệu.",
      "Ngâm kiệu với nước muối pha loãng để bớt hăng, sau đó vớt ra phơi/để thật ráo.",
      "Pha nước ngâm: đường, giấm (hoặc nước mắm + đường) tuỳ khẩu vị.",
      "Cho kiệu vào lọ, đổ nước ngâm, đậy kín, để chỗ mát.",
      "Sau khoảng 5–7 ngày là có thể dùng.",
    ],
    tips: "Củ kiệu càng ráo nước trước khi ngâm thì càng giòn, ít bị hư.",
  },

  // === MỨT & BÁNH KẸO ===
  {
    id: "mut-dua",
    name: "Mứt dừa",
    category: "Mứt & Bánh kẹo",
    shortDescription:
      "Mứt dừa sợi trắng hoặc pha màu nhẹ, ngọt bùi, dẻo nhưng không dính răng.",
    significance:
      "Tượng trưng cho sự ngọt ngào, ấm áp, thường dùng để mời khách đầu năm.",
    image: "https://files.catbox.moe/o1q2y6.jpg",
    ingredients: [
      "Cùi dừa non: 1 kg",
      "Đường: 500–700 g (tuỳ muốn ngọt nhiều hay ít)",
      "Vani hoặc lá dứa để tạo mùi (tuỳ thích)",
      "Màu tự nhiên từ lá dứa, gấc, lá cẩm (nếu muốn)",
    ],
    steps: [
      "Gọt cùi dừa, rửa sạch, thái sợi vừa ăn.",
      "Ngâm cùi dừa với nước ấm để bớt dầu, sau đó trần qua nước sôi, để ráo.",
      "Ướp dừa với đường đến khi đường tan, ngấm đều.",
      "Sên dừa trên chảo rộng, lửa nhỏ, đảo đều tay đến khi đường kết tinh, mứt khô tơi.",
      "Để nguội hoàn toàn rồi bảo quản trong lọ kín.",
    ],
    tips: "Không sên lửa quá lớn, dễ làm đường cháy; đảo đều tay đến khi đường kết tinh trắng đẹp.",
  },
  {
    id: "mut-gung",
    name: "Mứt gừng",
    category: "Mứt & Bánh kẹo",
    shortDescription:
      "Mứt gừng cay nhẹ, ngọt vừa, giúp ấm bụng trong những ngày se lạnh.",
    significance:
      "Mang lại cảm giác ấm áp, giúp tiêu hoá tốt khi ăn nhiều món Tết.",
    image: "https://files.catbox.moe/1qqn0d.jpg",
    ingredients: [
      "Gừng tươi già vừa: 500 g",
      "Đường: 400–500 g",
      "Chanh, muối để ngâm bớt cay",
    ],
    steps: [
      "Gọt vỏ gừng, thái lát mỏng hoặc miếng tuỳ thích.",
      "Ngâm gừng trong nước pha muối, chanh để bớt cay và trắng đẹp.",
      "Luộc gừng với nước, đổ bỏ nước luộc; có thể lặp lại 1–2 lần tuỳ độ cay.",
      "Ướp gừng với đường đến khi đường tan, sau đó sên trên chảo lửa nhỏ.",
      "Khi đường sệt lại, tiếp tục đảo đến khi kết tinh trắng, mứt khô.",
    ],
    tips: "Điều chỉnh số lần luộc gừng để độ cay phù hợp khẩu vị gia đình.",
  },
  {
    id: "hat-dua",
    name: "Hạt dưa / Hạt bí",
    category: "Mứt & Bánh kẹo",
    shortDescription:
      "Các loại hạt rang thơm bùi, để trên bàn tiếp khách, nhâm nhi cùng tách trà.",
    significance:
      "Biểu tượng cho sự sum vầy, chuyện trò đầu năm; vừa nhâm nhi vừa trò chuyện.",
    image: "https://files.catbox.moe/torg6c.jpg",
    ingredients: [
      "Hạt dưa, hạt bí (mua sẵn hoặc tự rang)",
      "Muối (nếu tự rang)",
    ],
    steps: [
      "Nếu tự rang: ngâm hạt với nước muối loãng, để ráo.",
      "Rang hạt trên chảo lửa nhỏ, đảo đều tay đến khi thơm, nứt vỏ.",
      "Để nguội, bảo quản trong hũ kín.",
    ],
    tips: "Rang lửa nhỏ để hạt chín đều, không bị cháy vỏ.",
  },
  {
    id: "banh-keo",
    name: "Bánh kẹo Tết",
    category: "Mứt & Bánh kẹo",
    shortDescription:
      "Các loại bánh quy, kẹo lạc, kẹo mè xửng, chocolate... tuỳ khẩu vị mỗi gia đình.",
    significance:
      "Mang lại sự phong phú cho khay mứt, giúp trẻ em thích thú hơn với ngày Tết.",
    image: "https://files.catbox.moe/va1nqg.jpg",
    ingredients: [
      "Bánh quy, kẹo lạc, kẹo mè xửng, kẹo dẻo... (tuỳ chọn)",
      "Hộp hoặc khay mứt để bày biện",
    ],
    steps: [
      "Chuẩn bị các loại bánh kẹo theo sở thích.",
      "Sắp xếp vào khay mứt/bánh nhiều ngăn, cân đối màu sắc.",
      "Bảo quản nơi khô ráo, đậy kín khi không sử dụng.",
    ],
    tips: "Chọn nhiều loại có độ cứng, mềm, vị ngọt khác nhau để khách dễ lựa chọn.",
  },

  // === TRÁNG MIỆNG / NGỌT ===
  {
    id: "trai-cay-ngu-qua",
    name: "Trái cây & mâm ngũ quả",
    category: "Tráng miệng",
    shortDescription:
      "Các loại trái cây tươi như bưởi, cam, quýt, táo, nho, mãng cầu, dừa, đu đủ, xoài...",
    significance:
      "Không chỉ để ăn tráng miệng mà còn để bày mâm ngũ quả dâng lên bàn thờ tổ tiên.",
    image: "https://files.catbox.moe/ywyfgf.jpg",
    ingredients: [
      "Trái cây theo vùng miền và sở thích",
      "Đĩa hoặc mâm để bày biện",
    ],
    steps: [
      "Rửa sạch trái cây, để ráo nước.",
      "Chọn trái chín tới, không dập nát để bày mâm ngũ quả.",
      "Sắp xếp hài hoà về màu sắc, hình dáng.",
    ],
    tips: "Tuỳ vùng miền có thể chọn loại quả mang nghĩa tốt lành theo tiếng địa phương.",
  },
  {
    id: "che-kho",
    name: "Chè kho / Chè đậu",
    category: "Tráng miệng",
    shortDescription:
      "Chè đậu xanh hoặc chè kho đặc sệt, cắt miếng, thường dùng làm món tráng miệng dịp Tết.",
    significance:
      "Ngọt ngào, ấm bụng, tượng trưng cho sự viên mãn, đủ đầy.",
    image: "https://files.catbox.moe/tegsqj.jpg",
    ingredients: [
      "Đậu xanh cà vỏ: 300–400 g",
      "Đường: 200–300 g",
      "Vani hoặc tinh dầu bưởi (tuỳ thích)",
      "Mè rang, dừa nạo để rắc lên",
    ],
    steps: [
      "Ngâm đậu xanh cho nở, nấu chín mềm.",
      "Đánh nhuyễn đậu, cho đường vào sên nhỏ lửa đến khi đặc sệt.",
      "Đổ ra khuôn, dàn phẳng, để nguội rồi cắt miếng.",
      "Rắc mè rang, dừa nạo khi ăn.",
    ],
    tips: "Sên lửa nhỏ và đảo đều tay để đậu không bị khét đáy nồi.",
  },
]

export default function TetDishes() {
  const [selectedDish, setSelectedDish] = useState<TetDish | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7e6] via-[#ffe9d6] to-[#ffe0cc] py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="relative text-center">
          <div className="absolute inset-x-10 -top-2 h-8 border-t border-amber-300/70 rounded-t-3xl pointer-events-none" />
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full border-amber-300 bg-white/80 text-xs font-medium text-red-800 hover:bg-amber-50"
              >
                ← Quay lại trang chủ
              </Button>
            </Link>
            <div className="hidden text-[11px] text-red-700/80 md:inline">
              Món ăn, mứt, bánh kẹo & mâm cỗ Tết Việt
            </div>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/80 bg-white/85 px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700/85">
              Mâm cỗ & món ăn Tết
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold text-red-900 md:text-4xl">
            Món Ăn & Mâm Cỗ Tết Việt
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-red-800/90 md:text-base">
            Danh sách các món ăn thường gặp trong ngày Tết: từ bánh, giò, xôi,
            món mặn, canh, dưa, đến mứt, bánh kẹo và trái cây – kèm giới thiệu
            ý nghĩa, nguyên liệu và cách chế biến cơ bản.
          </p>
        </div>

        {/* GRID MÓN ĂN */}
        <div className="grid gap-4 md:grid-cols-2">
          {TET_DISHES.map((dish) => (
            <Card
              key={dish.id}
              className="cursor-pointer overflow-hidden rounded-3xl border border-amber-300 bg-white/95 shadow-[0_8px_18px_rgba(148,63,37,0.14)] transition-shadow hover:shadow-[0_10px_26px_rgba(148,63,37,0.2)]"
              onClick={() => setSelectedDish(dish)}
            >
              {/* Ảnh món ăn */}
              <div className="relative h-40 w-full overflow-hidden border-b border-amber-200">
                <img
                  src={dish.image || DEFAULT_IMAGE}
                  alt={dish.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Nội dung */}
              <div className="space-y-2 p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-red-700/80">
                  <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-[11px] font-medium text-red-700"
                  >
                    {dish.category}
                  </Badge>
                  <span className="text-[11px] text-red-700/75">
                    Món Tết truyền thống
                  </span>
                </div>
                <h2 className="text-base font-bold text-red-900 md:text-lg">
                  {dish.name}
                </h2>
                <p className="text-xs text-[#5b2b20] md:text-sm">
                  {dish.shortDescription}
                </p>
                <p className="text-[11px] italic text-red-700/85">
                  {dish.significance}
                </p>
                <div className="pt-1 text-xs font-semibold text-red-700/90">
                  Đọc tiếp →
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Gợi ý chung về mâm cỗ */}
        <Card className="mt-4 rounded-3xl border border-amber-300 bg-white/90 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-red-900 md:text-base">
            Gợi ý sắp xếp mâm cỗ Tết
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs text-red-800/90 md:text-sm">
            <li>
              <span className="font-semibold">Nhóm món chính:</span> bánh chưng,
              bánh tét, giò, thịt kho, gà luộc.
            </li>
            <li>
              <span className="font-semibold">Nhóm món canh & rau:</span> canh
              măng, canh khổ qua, rau luộc, dưa hành, củ kiệu.
            </li>
            <li>
              <span className="font-semibold">Nhóm ngọt & tráng miệng:</span>{" "}
              mứt dừa, mứt gừng, bánh kẹo, trái cây, chè.
            </li>
            <li>
              <span className="font-semibold">Bố cục mâm cỗ:</span> sắp xếp cân
              đối, màu sắc hài hoà, ưu tiên số món lẻ (3, 5, 7, 9) tuỳ quy mô
              gia đình.
            </li>
          </ul>
        </Card>
      </div>

      {/* MODAL XEM CHI TIẾT MÓN ĂN */}
      {selectedDish && (
        <>
          <style>{`
            @keyframes dish-backdrop-fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes dish-modal-in {
              from {
                opacity: 0;
                transform: translateY(18px) scale(0.97);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .dish-backdrop-animate {
              animation: dish-backdrop-fade 0.22s ease-out;
            }
            .dish-modal-animate {
              animation: dish-modal-in 0.25s ease-out;
            }
          `}</style>

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Nền mờ */}
            <div
              className="dish-backdrop-animate absolute inset-0 bg-black/40"
              onClick={() => setSelectedDish(null)}
            />

            {/* Hộp chi tiết món ăn */}
            <div className="dish-modal-animate relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-amber-300 bg-[#fffaf0] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              {/* Ảnh */}
              <div className="relative h-52 w-full overflow-hidden border-b border-amber-200">
                <img
                  src={selectedDish.image || DEFAULT_IMAGE}
                  alt={selectedDish.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-amber-200 px-5 py-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-red-700/80">
                    <Badge
                      variant="outline"
                      className="border-red-200 bg-red-50 text-[11px] font-medium text-red-700"
                    >
                      {selectedDish.category}
                    </Badge>
                    <span className="text-[11px] text-red-700/80">
                      Món ăn ngày Tết
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-red-900 md:text-xl">
                    {selectedDish.name}
                  </h2>
                  <p className="text-xs italic text-red-700/85">
                    {selectedDish.significance}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="ml-2 rounded-full border border-amber-300 bg-white/80 px-3 py-1 text-xs font-medium text-red-800 hover:bg-amber-50"
                >
                  Đóng
                </button>
              </div>

              {/* Nội dung chi tiết */}
              <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4">
                <div className="space-y-4 text-sm leading-relaxed text-[#5b2b20]">
                  <div>
                    <h3 className="text-sm font-semibold text-red-900">
                      Giới thiệu
                    </h3>
                    <p className="mt-1 text-sm text-[#5b2b20]">
                      {selectedDish.shortDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-red-900">
                      Nguyên liệu gợi ý
                    </h3>
                    <ul className="mt-1 list-disc pl-5 text-sm">
                      {selectedDish.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-red-900">
                      Cách chế biến (tóm tắt)
                    </h3>
                    <ol className="mt-1 list-decimal pl-5 text-sm space-y-1">
                      {selectedDish.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {selectedDish.tips && (
                    <div className="rounded-2xl border border-amber-200 bg-[#fff7e6] px-3 py-2 text-xs text-red-800/95">
                      <span className="font-semibold">Gợi ý nhỏ: </span>
                      {selectedDish.tips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

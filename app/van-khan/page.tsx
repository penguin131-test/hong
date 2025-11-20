"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Prayer {
  id: string
  title: string
  content: string
  occasion: string
  category: "family" | "prosperity" | "health" | "general"
}

const PRAYERS: Prayer[] = [
  {
    id: "1",
    title: "Văn khấn ông Táo lên chầu Trời (ngày 23 tháng Chạp)",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần).\n\nKính lạy ngài Đông Trù Tư mệnh Táo Phủ Thần Quân.\n\nChúng con là: ...........................  \nNgụ tại: ...................................  \n\nNgày 23 tháng Chạp, chúng con thành tâm sửa biện hương hoa, vật phẩm, xiêm hài, áo mũ, nghi lễ cúng trần, dâng lên trước án, dâng hiến Tông Thần, đốt nén tâm hương, dốc lòng bái thỉnh.\nChúng con kính mời: Ngài Đông Trù Tư mệnh Táo Phủ Thần Quân giáng lâm trước án, thụ hưởng lễ vật.\nTheo truyền thống cũ, Ngài là Chủ, Ngũ tự gia Thần, soi xét lòng trần, Táo Quân chứng giám. Trong năm, nếu có sai phạm hay tội lỗi, chúng con cúi xin Tôn Thần gia ân châm chước, ban lộc và phước, phù hộ toàn gia, từ trẻ đến già, gái trai, an ninh khang thái. Giãi tấm lòng thành, cúi xin chứng giám.\nBái thỉnh Cửu thiên Đông Trù, Tư Mệnh Táo Quân, Nhất gia chi chủ, ngũ tự chi thần, Từ hậu thiệt ư bắc đẩu chi trung, sát thiện ác ư đông trù chi nội.\nTứ phúc xá tội, di hung hóa cát, an trấn âm dương, bảo hữu gia đình, họa tai bất diệt, hà phúc tất tăng, hữu cầu tất ứng, vô cảm bất thông, đại bi đại nguyện.\nĐại thánh đại từ, Cửu thiên Đông Trù. Tư mệnh Lô Vương, Nguyên Hoàng định quốc. Hộ trạch Thiên Tôn, cấp cấp như luật lệnh.",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "2",
    title: "Văn khấn Cầu Tài Lộc",
    content:
      "Kính cầu xin Trời Đất, Tổ Tiên ban phước, ban tài cho công việc may mắn, kinh doanh phát đạt, tài lộc dư dả, tiền bạc đầy túi suốt năm mới.",
    occasion: "Tết Nguyên Đán",
    category: "prosperity",
  },
  {
    id: "3",
    title: "Văn khấn Cầu Sức Khỏe",
    content:
      "Kính cầu xin bình an sức khỏe cho toàn gia đình. Mong mỗi thành viên luôn khỏe mạnh, minh mẫn, trí tuệ sáng suốt, luôn tránh được tai nạn, bệnh tật.",
    occasion: "Tết Nguyên Đán",
    category: "health",
  },
  {
    id: "4",
    title: "Văn khấn Cầu Hôn Nhân",
    content:
      "Kính cầu xin Trời Đất, Tổ Tiên phù hộ cho hôn nhân hạnh phúc, vợ chồng thuận hòa, yêu thương nhau, nuôi dạy con cái thành đạt, gia đình luôn ấm êm.",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "5",
    title: "Văn khấn lễ bao sái (xin tỉa chân hương trước Tết)",
    content:
      "Nam Mô A Di Đà Phật (3 lần)\n\nCon xin tấu lạy Chín phương Trời, Mười phương chư Phật, chư Phật mười phương.\nCon xin tấu lạy Vua cha Ngọc Hoàng Thượng Đế, Hoàng Thiên Hậu Thổ, Ngũ phương Ngũ thổ, Long Mạch Thổ, thần Đông Trù Tư mệnh Táo Phủ Thần Quân.\n\nTín chủ tên là:..............  \nCư ngụ tại địa chỉ:...............  \n\nHôm nay ngày... tháng... năm..., xét thấy bản thân mình chưa chu toàn nên để hương án bị bụi, xin thành tâm sám hối.\nTín chủ xin kính cáo với các chư vị (tùy theo bàn thờ đó thờ thần linh, hộ pháp hay gia tiên…), chọn được ngày lành tháng tốt hôm nay, xin cho phép tín chủ được sái tịnh để bàn thờ được trang nghiêm thanh tịnh, kính mong các chư vị chứng minh giám hộ.\nMong các vị độ cho con lau dọn được khang trang mỹ hảo, cho hương án được an chính vị, cho âm phần được an yên, cho gia cư được lạc thổ.\nChúng con người trần mắt thịt, tội lỗi đầy thân, chỉ biết kính cẩn tâm thành, nếu có điều chi lầm lỡ kính xin được tha thứ, bỏ quá đại xá cho.\n(Xong vái 3 vái).",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "6",
    title: "Văn khấn tảo mộ cuối năm",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy:\n\nNgài Kim niên Đương cai Thái Tuế chí đức Tôn Thần, Kim niên Hành Binh, Công Tào Phán Quan.  \nNgài Bản cảnh Thành Hoàng chư vị Đại Vương.  \nNgài Bản xứ Thần linh Thổ Địa Tôn Thần.  \nCác Ngài Ngũ phương, Ngũ thổ Long Mạch Tôn Thần, Tiền chu tước, Hậu Huyền vũ, Tả Thanh Long, Hữu Bạch Hổ cùng liệt vị tôn thần cai quản ở trong xứ này.\n\nKính lạy hương linh cụ: .................................  \nHôm nay là ngày 30 tháng Chạp, nhằm tiết cuối Đông sắp sang năm mới.\n\nTín chủ tên là:..............  \nCư ngụ tại địa chỉ:...............  \n\nSắm sanh vật phẩm, hương hoa phụ tửu lễ nghi, trình cáo Tôn Thần kính rước vong linh bản gia tiên tổ, chúng con là: \n................................................................................\nCó phần mộ tại đây về với gia đình đón mừng năm mới, để con cháu phụng sự trong tiết xuân thiên, báo đáp ân thâm, tỏ lòng hiếu kính. Cúi xin Tôn Thần phủ thùy doãn hứa, âm dương cách trở bát nước nén hương, biếu dâng lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "7",
    title: "Văn khấn lễ Chạp (rước vong linh ngày 30 Tết)",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nHôm nay là ngày 30 tháng Chạp năm ...............  \n\nNăm cũ sắp hết, ngày Tết đến gần, chuẩn bị đón Xuân, gia đình chủ con là................ sinh quán............... trú quán.................... Tỉnh....................... đồng gia quyến đẳng.\n\nKính lạy Thành Hoàng Bản Thổ Đại Vương  \nKính lạy Đệ nhất Gia Thần, Cặp Thổ Chư Vị Thần Tài, đồng lai giám cách  \nTâm thành kính thỉnh: Lịch đại Tổ tiên, Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Cô Di Tỷ Muội, Thúc Bá Đệ Huynh.  \nKính lạy hương linh cụ  \n\nTín chủ tên là:..............  \nCư ngụ tại địa chỉ:...............  \n\nTheo hầu tiên tổ, bấy lâu cách trở, đôi ngả âm dương, hôm nay chúng con sắm sanh phẩm vật hương đăng kim ngân hoa quả, phụ tửu lễ nghi, trình cáo Tôn Thần, cung thỉnh tiên linh có phần mộ tại ........ về với gia đình, con cháu phụng sự, bát nước nén hương, âm thầm báo đáp, tỏ lòng hiếu kính.\nCúi xin Tôn Thần phủ thùy doãn hứa, biểu tấm lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "8",
    title: "Văn khấn Lễ Tất Niên (30 Tết)",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy: Hoàng Thiên Hậu Thổ chư vị Tôn Thần  \nNgài Kim niên đương cai Thái Tuế chí đức Tôn Thần  \nNgài Bản cảnh Thành Hoàng chư vị Đại Vương  \nNgài Bản xứ Thần linh Thổ Địa, Ngài Định Phúc Táo Quân  \nCác Ngài Địa Chúa Long Mạch Tôn Thần và tất cả các Thần linh cai quản trong khu vực này.\n\nHôm nay là ngày 30 tháng Chạp năm .........................................\n\nChúng con là: .................................\n\nNgụ tại: ...........................................\n\nTrước án tọa kính cẩn thưa trình: Đông tàn sắp hết, năm kiệt tháng cùng, xuân tiết gần kề, minh niên sắp tới. Nay là ngày 30 Tết, chúng con cùng toàn thể gia quyến sắm sanh phẩm vật hương hoa, cơm canh thịnh soạn, sửa lễ Tất Niên, dâng cúng Thiên Địa Tôn Thần, phụng hiến Tổ tiên, truy niệm chư linh.\nTheo như thường lệ tuế trừ cáo tế, cúi xin chư vị Tôn Thần, liệt vị gia tiên, bản xứ tiền hậu chư hương linh, giáng lâm án tọa, phù thủy chứng giám, thụ hưởng lễ vật, phù hộ toàn gia, lớn bé trẻ già, bình an thịnh vượng. Độ cho chúng con mọi duyên thuận lợi, công việc hanh thông. Mọi người đều được bình an, tháng ngày như ý, sở cầu tòng tâm.\nBốn mùa không hạn ách nào xâm, tám tiết có điềm lành tiếp ứng. Giãi tấm lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "9",
    title: "Văn khấn Giao Thừa tại bàn thờ Phật",
    content:
      "Nam mô A Di Đà Phật!  \nNam mô A Di Đà Phật!  \nNam mô A Di Đà Phật!\n\nChúng con kính lạy Đức Phật ................. (tên của vị Phật được thờ).\nHôm nay, ngày 30 tháng Chạp, là ngày Tất Niên của năm ...................... (tên năm âm lịch), tín chủ của chúng con là ................. (họ tên chồng), cùng với phu thê ...................... (họ tên vợ) và các con cháu trong nhà, xin thành tâm kính dâng Đức Phật.\n\nThay mặt gia đình, con xin bày tỏ lòng biết ơn và kính chúc mừng năm mới đến Đức Phật nhân dịp đón Xuân về.\nCon xin bày tỏ lòng biết ơn đối với Đức Phật trong năm qua đã phù hộ, đội ơn và dìu dắt chúng con gặp được nhiều may mắn. Cúi xin Đức Phật giáng lâm trước án để thụ hưởng lễ vật và tiếp tục phù hộ cho gia đình chúng con.\nXin kính lạy (3 lần 3 vái).",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "10",
    title: "Văn khấn Giao Thừa ngoài trời",
    content:
      "Nam mô A-Di-Đà Phật (3 lần)\n\nKính lạy:\n\nCon kính lạy chín phương trời, mười phương chư Phật, chư Phật mười phương.\nCon kính lạy Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật.\nCon kính lạy Đức Bồ Tát Quán Thế Âm cứu nạn cứu khổ chúng sinh.\nCon kính lạy Hoàng Thiên, Hậu Thổ, chư vị Tôn Thần.\nCon kính lạy ngài Cựu niên Hành Khiển, Cựu Hành Binh chi Thần, Cựu Phán Quan.\nCon kính lạy ngài Đương niên Hành Khiển, Đương niên Hành Binh chi Thần, Đương niên Phán Quan.\nCon kính lạy các ngài Ngũ phương, Ngũ hổ, Long Mạch, Táo Quân, chư vị Tôn Thần.\n\nNay là phút Giao Thừa năm Quý Mão với năm Giáp Thìn.\n\nChúng con là: …, sinh năm: …, hành canh: … tuổi, cư ngụ tại ....\n\nNhân phút thiêng liêng Giao Thừa vừa tới, năm cũ qua đi, đón mừng năm mới, tam dương khang thái, vạn tượng canh tân.\nNay ngài Thái Tuế Tôn Thần trên vâng lệnh Ngọc Hoàng Thượng Đế, giám sát vạn dân, dưới bảo hộ sinh linh, tảo trừ yêu nghiệt. Quan cũ về triều cửa khuyết, lưu phúc, lưu ân; quan mới xuống thay, thể đức hiếu sinh, ban tài tiếp lộc.\nNhân buổi tân xuân, tín chủ chúng con thành tâm, sửa biện hương hoa phẩm vật, nghi lễ cung trần, dâng lên trước án, cúng dường Phật, Thánh, dâng hiến Tôn Thần, đốt nén tâm hương, dốc lòng bái thỉnh.\nChúng con kính mời: Ngài Cựu niên đương cai Thái Tuế, ngài Tân niên đương cai Thái Tuế chí đức Tôn Thần, ngài Bản cảnh Thành Hoàng chư vị Đại Vương, ngài Bản xứ Thần linh Thổ Địa, ngài Hỷ Thần, Phúc Đức Chính Thần, các ngài Ngũ phương, Ngũ thổ, Long Mạch, Tài Thần, chư vị bản gia Táo Quân, và chư vị Thần linh cai quản ở trong xứ này, cúi xin giáng lâm trước án thụ hưởng lễ vật.\nNguyện cho tín chủ minh niên khang thái, vạn sự tốt lành, bốn mùa tám tiết được chữ bình an, gia đạo hưng long thịnh vượng, bách sự hanh thông, ngày ngày được hưởng ơn Trời, Phật, chư vị Tôn Thần.\nChúng con kính cẩn tiến dâng lễ vật, thành tâm cầu nguyện. Cúi xin chín phương trời, mười phương chư Phật cùng chư vị Tôn Thần chứng giám, phù hộ độ trì.\nNam mô A-Di-Đà Phật (3 lần, 3 lạy).",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "11",
    title: "Văn khấn Giao Thừa trong nhà",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy:\n\nĐức Đương Lai Hạ Sinh Di Lặc Tôn Phật  \nHoàng Thiên Hậu Thổ chư vị Tôn Thần  \nNgài Bản Cảnh Thành Hoàng chư vị Đại Vương  \nNgài Bản Xứ Thần linh Thổ Địa, Ngài Định Phúc Táo Quân  \nCác Ngài Địa Chúa Long Mạch Tôn Thần và tất cả các Thần linh cai quản trong khu vực này  \nCác Cụ Tổ tiên nội ngoại chư vị Tiên Linh\n\nNay là giờ phút Giao Thừa năm: ....................\n\nChúng con là: ...................................\n\nNgụ tại: .............................\n\nPhút Giao Thừa vừa tới, nay theo vạn luật, tống cựu nghinh tân, giờ Tý đầu Xuân, đón mừng Nguyên Đán. Chúng con thành tâm sửa biện hương hoa vật phẩm, nghi lễ cung trần, dâng lên trước án, cúng dâng Phật Thánh, dâng hiến Tôn Thần, dâng cúng Tổ tiên, đốt nén tâm hương, dốc lòng bái thỉnh.\nChúng con kính mời: Ngài Bản Cảnh Thành Hoàng chư vị Đại Vương, Ngài Bản Xứ Thần linh Thổ Địa, Ngài Định Phúc Táo Quân, Ngài Phúc Đức Chính Thần, các Ngài Ngũ phương, Ngũ thổ, Long Mạch Tài Thần, Ngài Bản Gia Táo Quân, các Ngài Địa Chúa Long Mạch Tôn Thần và tất cả các Thần linh cai quản trong khu vực này. Cúi xin giáng lâm trước án, thụ hưởng lễ vật.\nChúng con lại kính mời: Các Cụ Tiên Linh Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bá Thúc Huynh Đệ, Cô Di Tỷ Muội, nội ngoại gia tộc chư vị hương linh, cúi xin giáng về linh sàng hâm hưởng lễ vật.\nChúng con cũng kính mời các vị vong linh tiền chủ, hậu chủ, y thảo phụ mộc ở trong đất này, nhân tiết Giao Thừa, giáng lâm trước án, chiêm ngưỡng Tôn Thần, thụ hưởng lễ vật.\nNguyện cho chúng con: Minh niên khang thái, trú dạ cát tường.\nĐộ cho chúng con mọi duyên thuận lợi, công việc hanh thông. Mọi người đều được bình an, tháng ngày được hưởng phần lợi lộc. Âm phù, dương trợ, sở nguyện như ý, sở cầu tòng tâm. Bốn mùa không hạn ách nào xâm, tám tiết có điềm lành tiếp ứng.\nGiãi tấm lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "12",
    title: "Văn khấn Tổ tiên ngày mồng Một Tết",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy: Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật  \nCác Cụ Tiên Linh Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bá Thúc Huynh Đệ, Cô Di Tỷ Muội, nội ngoại tộc chư vị hương linh.\n\nTín chủ tên là:..............  \nCư ngụ tại địa chỉ:...............  \n\nNay theo tuế luật, âm dương vận hành tới tuần Nguyên Đán. Mùng Một đầu xuân, mưa móc thấm nhuần, đón mừng năm mới. Con cháu tưởng niệm ân đức của Tổ tiên như trời cao biển rộng, không đem tấc cỏ báo đền ba xuân.\nDo đó, chúng con cùng toàn thể con cháu trong nhà sửa biện hương hoa vật phẩm, nghi lễ cung trần, dâng lên trước án. Cúi xin giáng về linh sàng hâm hưởng lễ vật.\nKính mời các Cụ Tiên Linh Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bá Thúc Huynh Đệ, Cô Di Tỷ Muội, nội ngoại tộc chư vị hương linh.\nNguyện cho chúng con: Minh niên khang thái, trú dạ cát tường. Độ cho chúng con mọi duyên thuận lợi, công việc hanh thông. Mọi người đều được bình an, tháng ngày được hưởng lợi lộc. Âm phù, dương trợ, sở nguyện như ý, sở cầu tòng tâm. Bốn mùa không hạn ách nào xâm, tám tiết có điềm lành tiếp ứng.\nTín chủ lại kính mời: Các vị vong linh tiền chủ, hậu chủ ở trong đất này cùng về hâm hưởng.\nGiãi tấm lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "13",
    title: "Văn khấn Thần linh trong nhà ngày mồng Một Tết",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy: Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật  \nHoàng Thiên Hậu Thổ chư vị Tôn Thần  \nNgài Bản Cảnh Thành Hoàng chư vị Đại Vương  \nNgài Bản Gia Táo Quân cùng các chư vị Tôn Thần\n\nHôm nay là ngày mồng Một tháng Giêng, ngày Tết Nguyên Đán đầu Xuân.\n\nChúng con là: .....................................\n\nNgụ tại: .........................................\n\nNhân Tiết Nguyên Đán, tín chủ của chúng con cảm nghĩ thâm ân Trời-Đất, chư vị Tôn Thần, nhờ đức cù lao Tiên Tổ mỗi niệm không quên. Do đó, chúng con sắm sanh lễ vật, sửa sang hương đăng, trần thiết trà quả dâng lên trước án.\nTín chủ chúng con thành tâm kính mời:\nNgài Kim niên đương cai Thái Tuế chí đức Tôn Thần  \nNgài Bản Cảnh Thành Hoàng chư vị Đại Vương.  \nNgài Bản Xứ Thần linh Thổ Địa, Ngài Định Phúc Táo Quân  \nCác Ngài Địa Chúa Long Mạch Tôn Thần và tất cả các Thần linh cai quản trong khu vực này.\nCúi xin giáng lâm trước án, chứng giám lòng thành thụ hưởng lễ vật.\nTín chủ lại xin phổ cáo với các vị tiền chủ, hậu chủ và các hương linh, cô hồn y thảo phụ mộc phảng phất trong khu vực này.\nXin mời tới đây chiêm ngưỡng Tôn Thần, thụ hưởng lễ vật, nguyện cho chúng con thân cung khang thái, bản mệnh bình an. Mong ơn Bản Cảnh Thành Hoàng, đội đức Tôn Thần Bản Xứ, hộ trì tín chủ, gia lộc gia ân, xá quá trừ tai. Đầu năm chí giữa, nửa năm chí cuối, sự nghiệp hanh thông, sở cầu như ý.\nGiãi tấm lòng thành, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "14",
    title: "Văn khấn tạ năm mới (hóa vàng ngày mồng 3 Tết)",
    content:
      "Nam Mô A Di Đà Phật (Niệm 3 lần)\n\nKính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.  \nKính lạy Ngài Đương niên, Ngài Bản Cảnh Thành Hoàng, các Ngài Thổ Địa, Táo Quân, Long Mạch, Tôn Thần.  \nCác Cụ Tổ Khảo, Tổ Tỷ, nội ngoại tiên linh.\n\nHôm nay ngày mồng 3 tháng Giêng năm ...................................\n\nTín chủ chúng con: .............................\n\nNgụ tại: .....................................\n\nThành tâm sửa biện hương hoa, phẩm vật, phụ tửu, lễ nghi, dâng lên trước án. Kính cẩn thưa trình tiệc Xuân đã mãn, nguyên tiễn tiên linh trở về âm giới.\nKính xin: Lưu phúc lưu ân, phù hộ độ trì, dương cơ âm mộ, mọi chỗ tốt lành. Cháu con được chữ bình an, gia đạo hưng long thịnh vượng. Lòng thành kính cẩn, lễ bạc tiến dâng, lượng cả xét soi, cúi xin chứng giám.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
  {
    id: "15",
    title: "Văn khấn cúng dâng sao giải hạn (Rằm tháng Giêng)",
    content:
      "Nhật cung Thái Dương Thiên Tử tinh quân, Nam Tào Bắc Đẩu tinh quân, Thái Bạch, Thổ Tú tinh quân, Bắc Cực Tử Vi Đại Đức tinh quân, Văn Xương, Văn Khúc tinh quân, Nhị thập bát tú, Ngũ hành tinh quân, La Hầu, Kế Đô tinh quân.\n\nTín chủ tên là:..............  \nCư ngụ tại địa chỉ:...............  \n\nChúng con dâng lễ quả cau lá trầu, hương hoa trà quả, thắp nén tâm hương trước án, kính mời các vị thần linh về dự, mong gia đình được phù hộ, mạnh khỏe, bình an và may mắn trong năm mới. Đèn trời sáng lạn, chiếu thắp cõi trần, xin các tinh quân lưu ân lưu phúc, lễ tuy mọn bạc, lòng thành có dư, mệnh vị an cư.\nCẩn cáo!",
    occasion: "Tết Nguyên Đán",
    category: "family",
  },
]

export default function PrayerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("general")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = [
    { id: "family", name: "Gia Đình" },
    { id: "prosperity", name: "Tài Lộc" },
    { id: "health", name: "Sức Khỏe" },
    { id: "general", name: "Tất Cả" },
  ]

  const filteredPrayers =
    selectedCategory === "general"
      ? PRAYERS
      : PRAYERS.filter((p) => p.category === selectedCategory)

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getCategoryBadgeClass = (category: Prayer["category"]) => {
    switch (category) {
      case "family":
        return "bg-red-50 text-red-700 border-red-200"
      case "prosperity":
        return "bg-amber-50 text-amber-800 border-amber-200"
      case "health":
        return "bg-emerald-50 text-emerald-800 border-emerald-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getCategoryLabel = (category: Prayer["category"]) => {
    switch (category) {
      case "family":
        return "Gia đình"
      case "prosperity":
        return "Tài lộc"
      case "health":
        return "Sức khỏe"
      default:
        return "Chung"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7e6] via-[#ffe9d6] to-[#ffe0cc] py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* HEADER TẾT SÁNG */}
        <div className="text-center relative">
          <div className="absolute inset-x-10 -top-2 h-8 border-t border-amber-300/70 rounded-t-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 border border-amber-300/80 mb-3 shadow-sm">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-amber-400 text-xs font-bold text-white shadow">
              ✦
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-red-700/80">
              Xuân – Tết – Văn khấn
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 drop-shadow-[0_0_10px_rgba(248,250,252,0.4)]">
            Văn Khấn Tết
          </h1>
          <p className="mt-3 text-sm md:text-base text-red-700/90 max-w-2xl mx-auto">
            Tuyển chọn những bài văn khấn ngày Tết, giao thừa, tảo mộ, tổ tiên…{" "}
            <span className="text-red-700 font-semibold">
              trang trọng, dễ đọc, dễ sao chép.
            </span>
          </p>
        </div>

        {/* BỘ LỌC DANH MỤC */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => {
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
                    : "bg-white/70 border-amber-300 text-red-700 hover:bg-amber-50",
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

        {/* DANH SÁCH VĂN KHẤN */}
        <div className="space-y-5">
          {filteredPrayers.map((prayer) => (
            <Card
              key={prayer.id}
              className="relative overflow-hidden border border-amber-300 bg-white/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(148,63,37,0.18)] rounded-3xl"
            >
              {/* Hoa văn góc sáng */}
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                aria-hidden
              >
                <div className="absolute top-3 left-6 h-8 w-8 border-t border-l border-amber-300/80 rounded-tl-2xl" />
                <div className="absolute top-3 right-6 h-8 w-8 border-t border-r border-amber-300/80 rounded-tr-2xl" />
                <div className="absolute bottom-3 left-6 h-8 w-8 border-b border-l border-amber-300/80 rounded-bl-2xl" />
                <div className="absolute bottom-3 right-6 h-8 w-8 border-b border-r border-amber-300/80 rounded-br-2xl" />
              </div>

              <div className="relative p-5 md:p-6 flex flex-col gap-3">
                {/* Header card */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-1">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-bold text-red-900 leading-snug">
                      {prayer.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">
                        {prayer.occasion}
                      </span>
                      <span
                        className={
                          "px-2.5 py-1 rounded-full border text-[11px] " +
                          getCategoryBadgeClass(prayer.category)
                        }
                      >
                        {getCategoryLabel(prayer.category)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(prayer.id, prayer.content)}
                    className="shrink-0 border-red-300 bg-red-50 text-red-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-400 hover:text-white hover:border-amber-400"
                  >
                    {copiedId === prayer.id ? "✓ Đã sao chép" : "Sao chép văn khấn"}
                  </Button>
                </div>

                {/* Nội dung văn khấn */}
                <div className="mt-1 rounded-2xl bg-gradient-to-br from-[#fffaf0] via-[#fff7e6] to-[#fffaf0] border border-amber-200 px-4 py-4 text-sm leading-relaxed text-[#5b2b20] whitespace-pre-line italic shadow-inner">
                  {prayer.content}
                </div>

                {/* Gợi ý nhỏ */}
                <div className="text-[11px] text-red-700/80 mt-1">
                  Gợi ý: Nhấn{" "}
                  <span className="font-semibold text-red-700">
                    “Sao chép văn khấn”
                  </span>{" "}
                  rồi dán vào Zalo / Ghi chú để đọc khi làm lễ.
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

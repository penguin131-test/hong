"use client"

const ZODIAC = [
  { key: "Tý", label: "Tý (Chuột)" },
  { key: "Sửu", label: "Sửu (Trâu)" },
  { key: "Dần", label: "Dần (Hổ)" },
  { key: "Mão", label: "Mão (Mèo)" },
  { key: "Thìn", label: "Thìn (Rồng)" },
  { key: "Tỵ", label: "Tỵ (Rắn)" },
  { key: "Ngọ", label: "Ngọ (Ngựa)" },
  { key: "Mùi", label: "Mùi (Dê)" },
  { key: "Thân", label: "Thân (Khỉ)" },
  { key: "Dậu", label: "Dậu (Gà)" },
  { key: "Tuất", label: "Tuất (Chó)" },
  { key: "Hợi", label: "Hợi (Lợn)" },
]

// 2020 là năm Tý -> index 0
function getZodiacLabelForYear(year: number) {
  const baseYear = 2020
  const diff = year - baseYear
  const idx = ((diff % 12) + 12) % 12
  return ZODIAC[idx].label
}

export function CultureSnippets() {
  const now = new Date()
  const tetYear =
    now.getMonth() >= 1 // sau khoảng tháng 2 thì coi như đã sang năm âm mới
      ? now.getFullYear() + 1
      : now.getFullYear()
  const zodiacLabel = getZodiacLabelForYear(tetYear)

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-red-900">
          Góc nhỏ về Tết Việt
        </h2>
        <p className="text-xs text-red-700/80">
          Một vài mẩu kiến thức ngắn, dễ đọc.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-amber-200 bg-[#fffaf0] p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-red-900">
            Năm {tetYear} là năm con gì?
          </h3>
          <p className="text-xs text-red-800/85">
            Theo can chi, năm Tết sắp tới được tính là{" "}
            <span className="font-semibold">{zodiacLabel}</span>. 
            Đây là một trong 12 con giáp luân phiên lặp lại theo chu kỳ 12 năm.
          </p>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-[#fffaf0] p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-red-900">
            Vì sao Tết không trùng ngày mỗi năm?
          </h3>
          <p className="text-xs text-red-800/85">
            Tết Nguyên Đán dựa trên lịch âm – dương, nên mỗi năm ngày Tết dương
            lịch sẽ dịch chuyển trong khoảng cuối tháng 1 đến giữa tháng 2.
          </p>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-[#fffaf0] p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-red-900">
            Một số phong tục quen thuộc
          </h3>
          <p className="text-xs text-red-800/85">
            Trước Tết thường có cúng ông Công, ông Táo, dọn dẹp nhà cửa, đi tảo
            mộ, gói bánh chưng – bánh tét, trang trí hoa mai, hoa đào và chuẩn
            bị mâm cúng tất niên, giao thừa.
          </p>
        </article>
      </div>
    </section>
  )
}

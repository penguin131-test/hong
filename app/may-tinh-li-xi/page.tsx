"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const luckyNumbers = [100, 200, 500, 888, 1000, 1688, 2000, 2888, 3000, 5000, 6868, 8888]

const recipientTypes = [
  { value: "children", label: "Trẻ nhỏ" },
  { value: "siblings", label: "Anh chị em" },
  { value: "friends", label: "Bạn bè" },
  { value: "employees", label: "Nhân viên/Đồng nghiệp" },
  { value: "elderly", label: "Người lớn tuổi" },
  { value: "partners", label: "Đối tác/Khách hàng" },
]

const closenessLevels = [
  { value: "normal", label: "Bình thường" },
  { value: "close", label: "Thân" },
  { value: "very-close", label: "Rất thân/Quan trọng" },
]

const relationshipNotes: Record<string, string> = {
  "children-normal": "Lì xì mang tính tượng trưng, chủ yếu để lấy lộc đầu năm cho các bé.",
  "children-close": "Các bé quen thân trong gia đình, số tiền nên nhỉnh hơn một chút để các bé vui.",
  "children-very-close": "Con cháu ruột hoặc cực kỳ thân thiết, có thể lì xì rộng rãi hơn để chúc may mắn.",
  "siblings-normal": "Anh chị em ít tương tác, có thể giữ mức vừa phải để tránh ngại ngùng.",
  "siblings-close": "Anh chị em thân thiết, gợi ý số tiền thể hiện sự quan tâm mà vẫn thoải mái.",
  "siblings-very-close": "Rất thân, có thể lì xì nhiều hơn một chút như lời chúc mạnh mẽ đầu năm.",
  "friends-normal": "Bạn bè xã giao, mức lì xì nhẹ nhàng là đủ vui vẻ.",
  "friends-close": "Bạn bè thân thiết, có thể lì xì nhỉnh hơn mang tính kỷ niệm đầu năm.",
  "friends-very-close": "Bạn rất thân/tri kỷ, số tiền mang tính chia sẻ niềm vui đầu năm.",
  "employees-normal": "Lì xì động viên tinh thần, tạo không khí Tết cho nhân viên.",
  "employees-close": "Nhân sự quan trọng hoặc thân, có thể lì xì nhỉnh hơn để khích lệ.",
  "employees-very-close": "Nhân sự chủ chốt, nên chọn mức thể hiện sự trân trọng và ghi nhận.",
  "elderly-normal": "Người lớn tuổi không nặng về tiền, chủ yếu là tấm lòng chúc sức khỏe, bình an.",
  "elderly-close": "Ông bà/bố mẹ hoặc người lớn thân, có thể lì xì nhỉnh hơn bày tỏ hiếu kính.",
  "elderly-very-close": "Người thân ruột thịt, mức lì xì rộng rãi hơn để chúc phúc, báo hiếu.",
  "partners-normal": "Đối tác/khách hàng mới, mức vừa phải để giữ phép lịch sự.",
  "partners-close": "Đối tác thân quen, nên lì xì nhỉnh hơn một chút để gắn kết mối quan hệ.",
  "partners-very-close": "Đối tác chiến lược/quan trọng, mức lì xì thể hiện sự trân trọng và lâu dài.",
}

export default function LuckyMoneyCalculator() {
  const [recipient, setRecipient] = useState("children")
  const [closeness, setCloseness] = useState("normal")
  const [budget, setBudget] = useState("")
  const [suggestion, setSuggestion] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateSuggestion = () => {
    setError(null)
    setSuggestion(null)

    if (!budget) {
      setError("Vui lòng nhập ngân sách dự kiến.")
      return
    }

    const budgetNum = Number.parseInt(budget)
    if (Number.isNaN(budgetNum) || budgetNum <= 0) {
      setError("Ngân sách không hợp lệ. Vui lòng nhập số tiền lớn hơn 0.")
      return
    }

    let baseAmount = 100

    if (recipient === "children") {
      baseAmount = closeness === "very-close" ? 500 : closeness === "close" ? 300 : 100
    } else if (recipient === "siblings" || recipient === "friends") {
      baseAmount = closeness === "very-close" ? 1000 : closeness === "close" ? 500 : 200
    } else if (recipient === "employees") {
      baseAmount = closeness === "very-close" ? 500 : closeness === "close" ? 300 : 200
    } else if (recipient === "elderly") {
      baseAmount = closeness === "very-close" ? 2000 : closeness === "close" ? 1000 : 500
    } else if (recipient === "partners") {
      baseAmount = closeness === "very-close" ? 1000 : closeness === "close" ? 800 : 500
    }

    if (budgetNum < baseAmount) {
      setError(
        `Ngân sách hiện tại thấp hơn mức tối thiểu gợi ý (~${baseAmount.toLocaleString(
          "vi-VN",
        )} đ) cho đối tượng và mức độ thân thiết này.`,
      )
      return
    }

    const candidates = luckyNumbers.filter((n) => n >= baseAmount && n <= budgetNum)
    const recommended = candidates.length ? candidates[candidates.length - 1] : baseAmount

    setSuggestion(recommended)
  }

  const noteKey = `${recipient}-${closeness}`
  const note = relationshipNotes[noteKey]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7e6] via-[#ffe9d6] to-[#ffd2b3]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-4 rounded-full border-amber-300 bg-white/60 px-4 py-2 text-sm text-red-800 shadow-sm hover:bg-white"
            >
              ← Quay lại Hóng Tết
            </Button>
          </Link>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-300 bg-white/80 px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              Công cụ Tết
            </span>
            <span className="text-xs text-amber-700">Máy tính lì xì · Số đẹp – Vừa túi tiền</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-red-900 md:text-5xl">
            Máy tính lì xì Hóng Tết
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-red-800/80 md:text-base">
            Gợi ý số tiền lì xì hợp lý dựa trên đối tượng, mức độ thân thiết và ngân sách của bạn — vừa giữ
            không khí Tết, vừa không bị “quá tay”.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Calculator Form */}
          <Card className="space-y-6 rounded-2xl border-amber-200 bg-white/90 p-6 shadow-[0_10px_30px_rgba(148,63,37,0.15)]">
            <div>
              <label className="mb-3 block text-sm font-semibold text-red-900">
                Đối tượng nhận lì xì
              </label>
              <div className="space-y-2">
                {recipientTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-red-50/0 px-3 py-2 text-sm text-red-900 transition hover:border-amber-300 hover:bg-[#fff7e6]"
                  >
                    <input
                      type="radio"
                      name="recipient"
                      value={type.value}
                      checked={recipient === type.value}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="h-4 w-4 accent-red-600"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-red-900">
                Mức độ thân thiết
              </label>
              <div className="space-y-2">
                {closenessLevels.map((level) => (
                  <label
                    key={level.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-red-50/0 px-3 py-2 text-sm text-red-900 transition hover:border-amber-300 hover:bg-[#fff7e6]"
                  >
                    <input
                      type="radio"
                      name="closeness"
                      value={level.value}
                      checked={closeness === level.value}
                      onChange={(e) => setCloseness(e.target.value)}
                      className="h-4 w-4 accent-red-600"
                    />
                    <span>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-red-900">
                Ngân sách tối đa cho 1 phong bao (VND)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ví dụ: 500000"
                className="w-full rounded-xl border border-amber-200 bg-white/90 px-4 py-2 text-sm text-red-900 placeholder:text-red-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400"
              />
              <p className="mt-1 text-xs text-red-700/75">
                Gợi ý áp dụng cho <span className="font-semibold">mỗi phong bao</span>. Nếu bạn có nhiều người
                nhận, hãy ước lượng số lượng bao dựa vào mức gợi ý.
              </p>
            </div>

            {note && (
              <div className="rounded-xl border border-amber-200 bg-[#fff7e6] px-3 py-2 text-xs text-red-800">
                {note}
              </div>
            )}

            <Button
              onClick={calculateSuggestion}
              className="mt-2 w-full rounded-full bg-red-700 text-sm font-semibold text-amber-50 shadow-md hover:bg-red-800"
            >
              Gợi ý số tiền lì xì
            </Button>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}
          </Card>

          {/* Suggestion Result + Quick picks */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-amber-200 bg-gradient-to-br from-[#fff7e6] via-[#ffe3bf] to-[#ffcfaa] p-6 shadow-[0_10px_30px_rgba(148,63,37,0.18)]">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
                Kết quả gợi ý
              </h3>

              {suggestion ? (
                <>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                      Số tiền nên lì xì
                    </span>
                  </div>
                  <div className="mb-1 text-4xl font-extrabold text-red-900 md:text-5xl">
                    {suggestion.toLocaleString("vi-VN")} đ
                  </div>
                  <p className="text-sm text-red-800/80">
                    Đây là số tiền đẹp, phù hợp với ngân sách của bạn và mức độ quan hệ với người nhận.
                  </p>
                  <ul className="mt-4 space-y-1 text-xs text-red-800/85">
                    <li>• Không vượt ngân sách tối đa bạn đã đặt.</li>
                    <li>• Là số “đẹp” thường được dùng khi lì xì (100, 200, 500, 888, 1000, ...).</li>
                    <li>• Đã cân nhắc đối tượng nhận và mức độ thân thiết.</li>
                  </ul>
                </>
              ) : (
                <p className="text-sm text-red-800/80">
                  Nhập thông tin bên trái rồi bấm{" "}
                  <span className="font-semibold">“Gợi ý số tiền lì xì”</span> để xem gợi ý phù hợp với bạn.
                </p>
              )}
            </Card>

            {/* Lucky Numbers quick pick */}
            <Card className="rounded-2xl border-amber-200 bg-white/90 p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-red-900">
                Hoặc chọn nhanh một số tiền truyền thống
              </h3>
              <p className="mb-3 text-xs text-red-700/80">
                Chạm để chọn trực tiếp, sau đó bạn có thể điều chỉnh lại ngân sách cho phù hợp.
              </p>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                {luckyNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setSuggestion(num)
                      setError(null)
                    }}
                    className="rounded-xl border border-amber-200 bg-[#fff7e6] px-3 py-2 text-xs font-semibold text-red-900 shadow-sm transition hover:border-red-400 hover:bg-[#ffe3bf]"
                  >
                    {num.toLocaleString("vi-VN")} đ
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

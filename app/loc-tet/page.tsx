"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getRewards, dailyCheckIn, claimReward, unlockEffect, unlockTheme, type UserRewards } from "@/lib/rewards"

const shopItems = [
  {
    id: "theme-peach",
    name: "Theme Hoa Đào",
    description: "Giao diện màu hồng, tượng trưng sắc đẹp",
    cost: 300,
    type: "theme",
  },
  {
    id: "theme-apricot",
    name: "Theme Hoa Mai",
    description: "Giao diện màu vàng, tượng trưng vàng tươi",
    cost: 300,
    type: "theme",
  },
  {
    id: "effect-fireworks",
    name: "Hiệu ứng Pháo Hoa",
    description: "Pháo hoa bay khi countdown hết giờ",
    cost: 500,
    type: "effect",
  },
  {
    id: "effect-lantern",
    name: "Hiệu ứng Đèn Lồng",
    description: "Đèn lồng rung nhẹ trên màn hình",
    cost: 500,
    type: "effect",
  },
]

export default function RewardsPage() {
  const [rewards, setRewards] = useState<UserRewards | null>(null)
  const [message, setMessage] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRewards(getRewards())
  }, [])

  const handleDailyCheckIn = () => {
    const result = dailyCheckIn()
    setRewards(getRewards())
    if (result.isNewStreak) {
      setMessage(`Tuyệt vời! Nhận ${result.xu === rewards?.xu ? 0 : Math.abs(result.xu - (rewards?.xu || 0))} Xu`)
    } else {
      setMessage("Bạn đã điểm danh hôm nay rồi!")
    }
    setTimeout(() => setMessage(""), 3000)
  }

  const handleClaimReward = (rewardType: "view_todo" | "share_site") => {
    const result = claimReward(rewardType)
    setRewards(getRewards())
    if (result.success) {
      setMessage(`Nhận thêm Xu!`)
    } else {
      setMessage("Bạn đã nhận thưởng này hôm nay rồi")
    }
    setTimeout(() => setMessage(""), 3000)
  }

  const handleUnlock = (item: any) => {
    let result
    if (item.type === "theme") {
      result = unlockTheme(item.id)
    } else {
      result = unlockEffect(item.id)
    }
    setRewards(getRewards())
    if (result.success) {
      setMessage(`${item.name} đã mở khóa!`)
    } else {
      setMessage("Xu không đủ!")
    }
    setTimeout(() => setMessage(""), 3000)
  }

  if (!mounted || !rewards) {
    return null
  }

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
          <h1 className="text-4xl font-bold text-primary mb-2">Xu Tết & Linh thú</h1>
          <p className="text-muted-foreground">Thu thập Xu Tết và mở khóa những theme và hiệu ứng đặc biệt</p>
        </div>

        {/* Current Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-muted-foreground text-sm mb-1">Xu Tết Hiện tại</p>
            <p className="text-3xl font-bold text-primary">{rewards.xu}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <p className="text-muted-foreground text-sm mb-1">Streak Hôm nay</p>
            <p className="text-3xl font-bold text-secondary">{rewards.streak}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <p className="text-muted-foreground text-sm mb-1">Đã mở khóa</p>
            <p className="text-3xl font-bold text-accent">{rewards.effects.length}</p>
          </Card>
        </div>

        {/* Message */}
        {message && (
          <Card className="p-4 mb-6 bg-primary/10 border border-primary/20">
            <p className="text-primary font-medium">{message}</p>
          </Card>
        )}

        {/* Daily Missions */}
        <Card className="p-6 mb-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Nhiệm vụ hôm nay</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Điểm danh hàng ngày</p>
                <p className="text-sm text-muted-foreground">Nhận {100 * Math.min(rewards.streak + 1, 5)} Xu</p>
              </div>
              <Button
                onClick={handleDailyCheckIn}
                disabled={rewards.checkedInToday}
                className="bg-primary hover:bg-primary/90"
              >
                {rewards.checkedInToday ? "✓ Đã làm" : "Làm ngay"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Xem checklist chuẩn bị Tết</p>
                <p className="text-sm text-muted-foreground">Nhận 10 Xu</p>
              </div>
              <Button
                onClick={() => handleClaimReward("view_todo")}
                disabled={rewards.rewards.view_todo}
                className="bg-primary hover:bg-primary/90"
              >
                {rewards.rewards.view_todo ? "✓ Đã làm" : "Làm ngay"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Chia sẻ trang web</p>
                <p className="text-sm text-muted-foreground">Nhận 20 Xu</p>
              </div>
              <Button
                onClick={() => handleClaimReward("share_site")}
                disabled={rewards.rewards.share_site}
                className="bg-primary hover:bg-primary/90"
              >
                {rewards.rewards.share_site ? "✓ Đã làm" : "Làm ngay"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Shop */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Shop Tết</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {shopItems.map((item) => {
              const isUnlocked = rewards.effects.includes(item.id)

              return (
                <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    {isUnlocked && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Đã mở</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-primary">{item.cost} Xu</p>
                    <Button
                      onClick={() => handleUnlock(item)}
                      disabled={rewards.xu < item.cost || isUnlocked}
                      size="sm"
                      className={
                        isUnlocked
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }
                    >
                      {isUnlocked ? "Đã mở" : "Mở khóa"}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

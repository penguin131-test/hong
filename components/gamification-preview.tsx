"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function GamificationPreview() {
  return (
    <Link href="/loc-tet">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-6 md:p-8 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Nhận Lộc Tết mỗi ngày</h3>
            <p className="text-muted-foreground">
              Đăng nhập mỗi ngày (không cần tài khoản, lưu tại trình duyệt) để nhận Xu Tết, mở theme mới và hiệu ứng
              pháo hoa.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full whitespace-nowrap">
            Bắt đầu →
          </Button>
        </div>
      </Card>
    </Link>
  )
}

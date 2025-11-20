"use client"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Không có kết nối Internet</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Trang web này không thể tải mà không có kết nối internet. Vui lòng kiểm tra kết nối của bạn.
          </p>
        </div>

        <div className="bg-muted p-6 rounded-lg mb-6">
          <p className="text-sm text-muted-foreground mb-4">Bạn có thể xem các trang đã tải trước đó:</p>
          <ul className="text-left space-y-2 text-sm">
            <li className="text-muted-foreground">• Trang chủ - Đếm ngược Tết</li>
            <li className="text-muted-foreground">• Các trang đã ghé thăm gần đây</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Quay về Trang Chủ
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition"
          >
            Quay Lại
          </button>
        </div>
      </div>
    </div>
  )
}

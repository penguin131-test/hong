import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Hóng Tết</h3>
            <p className="text-sm text-muted-foreground">
              Đếm ngược Tết, quản lý Tết và chia sẻ niềm vui Tết cùng gia đình và bạn bè.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Tiện ích</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lich-nghi-tet" className="text-muted-foreground hover:text-primary">
                  Lịch nghỉ Tết
                </Link>
              </li>
              <li>
                <Link href="/may-tinh-li-xi" className="text-muted-foreground hover:text-primary">
                  Máy tính lì xì
                </Link>
              </li>
              <li>
                <Link href="/cau-chuc-tet" className="text-muted-foreground hover:text-primary">
                  Câu chúc Tết
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Khác</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/van-hoa-tet" className="text-muted-foreground hover:text-primary">
                  Về văn hóa Tết
                </Link>
              </li>
              <li>
                <a href="mailto:nometech@gmail.com" className="text-muted-foreground hover:text-primary">
                  Góp ý & Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Made with ❤️ cho mùa Tết Việt | © 2025 Hóng Tết (Nguyễn Hoàng Nam)</p>
        </div>
      </div>
    </footer>
  )
}

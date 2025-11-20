"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/van-khan", label: "Văn khấn" },
  { href: "/cau-chuc-tet", label: "Câu chúc" },
  { href: "/lich-van-nien", label: "Lịch âm" },
  { href: "/blogs", label: "Hiểu tết" },
  { href: "/loc-tet", label: "Lộc tết" },
]

export function TetNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-amber-300/70 bg-gradient-to-r from-[#fffaf0]/95 via-[#ffeede]/95 to-[#fff7e6]/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-1 text-base font-bold tracking-wide text-red-800"
        >
          <span>Hóng Tết</span>
          <span className="text-[11px] font-medium text-red-700/70">
            Đếm ngược & tiện ích
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium border transition-all",
                "border-transparent text-red-800/80 hover:border-amber-400 hover:bg-amber-50 hover:text-red-900",
                isActive(link.href) &&
                  "border-amber-400 bg-amber-50 text-red-900 shadow-sm"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-amber-300 bg-white/80 md:hidden"
        >
          <span
            className={cn(
              "block h-[2px] w-5 bg-red-800 transition-all",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-5 bg-red-800 transition-all",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-5 bg-red-800 transition-all",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-amber-200 bg-[#fffaf0]/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-all border",
                  "border-transparent text-red-800/80 hover:bg-amber-50 hover:border-amber-300",
                  isActive(link.href) &&
                    "border-amber-400 bg-amber-50 text-red-900 shadow-sm"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

"use client"

import Link from "next/link"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-provider"
import { Logo } from "./logo"
import { SITE_CONFIG } from "@/lib/site"

const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "المتجر", href: "/shop" },
  { label: "الأقسام", href: "/#categories" },
  { label: "العروض", href: "/#offers" },
  { label: "المدونة", href: "/blog" },
  { label: "تواصل معنا", href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setOpen(true)}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors lg:hidden"
            aria-label="فتح القائمة"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Logo />

          <nav className="hidden lg:flex items-center gap-8" aria-label="القائمة الرئيسية">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 text-foreground hover:text-primary transition-colors hidden md:block"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-foreground hover:text-primary transition-colors relative"
              aria-label={`السلة (${totalItems} منتج)`}
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 left-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* القائمة الجانبية للموبايل */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Logo />
              <button onClick={() => setOpen(false)} className="p-2" aria-label="إغلاق القائمة">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-colors font-medium"
              >
                من نحن
              </Link>
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-colors font-medium"
              >
                الأسئلة الشائعة
              </Link>
            </nav>
            <div className="p-4 border-t border-border text-sm text-muted-foreground">
              <p className="mb-1">للتواصل:</p>
              <a href={`tel:${SITE_CONFIG.contact.phone}`} className="block hover:text-primary" dir="ltr">
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

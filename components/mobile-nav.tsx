"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3x3, Search, Heart, MoreHorizontal } from "lucide-react"
import { useCart } from "./cart-provider"
import { ShoppingBag } from "lucide-react"

const ITEMS = [
  { href: "/", label: "الرئيسية", icon: Home, primary: true },
  { href: "/shop", label: "الأقسام", icon: Grid3x3 },
  { href: "/search", label: "البحث", icon: Search },
  { href: "/cart", label: "السلة", icon: ShoppingBag },
  { href: "/contact", label: "المزيد", icon: MoreHorizontal },
]

export function MobileNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border lg:hidden"
      aria-label="التنقل السفلي"
    >
      <ul className="flex items-center justify-around relative">
        {ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          const isCart = item.href === "/cart"
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2.5 transition-colors relative ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isCart && totalItems > 0 && (
                    <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

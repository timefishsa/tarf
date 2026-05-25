"use client"

import { useState, useMemo } from "react"
import { Search as SearchIcon } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import productsData from "@/data/products.json"
import type { Product } from "@/lib/types"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const products = productsData.products as Product[]

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [query, products])

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">البحث</h1>
          <div className="relative mb-6">
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-card border border-border rounded-full pr-12 pl-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            نتائج البحث ({results.length})
          </p>
          {results.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">لا توجد نتائج تطابق بحثك</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

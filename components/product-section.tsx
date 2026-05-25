import Link from "next/link"
import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"

export function ProductSection({
  title,
  products,
  viewAllHref = "/shop",
  id,
}: {
  title: string
  products: Product[]
  viewAllHref?: string
  id?: string
}) {
  if (products.length === 0) return null
  return (
    <section id={id} className="py-8" aria-label={title}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
          <Link href={viewAllHref} className="text-sm text-primary font-medium hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

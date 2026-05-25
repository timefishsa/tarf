import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { SITE_CONFIG } from "@/lib/site"

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          itemProp="image"
        />
        {product.oldPrice && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </span>
        )}
        {product.isNew && !product.oldPrice && (
          <span className="absolute top-2 right-2 bg-accent-foreground text-accent text-xs font-bold px-2 py-1 rounded-full">
            جديد
          </span>
        )}
      </div>
      <div className={`p-3 ${compact ? "" : "md:p-4"}`}>
        <h3
          className={`font-medium text-foreground line-clamp-1 mb-1 ${compact ? "text-sm" : "text-sm md:text-base"}`}
          itemProp="name"
        >
          {product.name}
        </h3>
        {!compact && (
          <div className="flex items-center gap-1 mb-2" aria-label={`التقييم ${product.rating} من 5`}>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span className="font-bold text-primary" itemProp="price" content={String(product.price)}>
            {product.price} {SITE_CONFIG.currency}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-price-old line-through">
              {product.oldPrice} {SITE_CONFIG.currency}
            </span>
          )}
          <meta itemProp="priceCurrency" content="SAR" />
        </div>
      </div>
    </Link>
  )
}

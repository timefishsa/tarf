import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/types"

export function CategoryCircles({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8" aria-label="الأقسام">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-secondary ring-2 ring-transparent group-hover:ring-primary transition-all">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground text-center line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

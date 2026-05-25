import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Offer } from "@/lib/types"

export function OffersGrid({ offers }: { offers: Offer[] }) {
  return (
    <section id="offers" className="py-8" aria-label="أهم العروض">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">أهم العروض</h2>
          <Link href="/shop" className="text-sm text-primary font-medium hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary"
            >
              <Image
                src={offer.image || "/placeholder.svg"}
                alt={offer.title}
                fill
                sizes="(min-width: 768px) 33vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-primary-foreground text-xs md:text-sm font-bold line-clamp-2">
                    {offer.title}
                  </h3>
                  <p className="text-primary-foreground/90 text-[10px] md:text-xs mt-1">
                    خصومات تصل إلى
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
                    {offer.discount}
                  </span>
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-[10px] md:text-xs font-bold inline-flex items-center gap-1">
                    تسوق الآن <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

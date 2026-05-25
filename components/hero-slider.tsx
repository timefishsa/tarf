"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, MessageCircle } from "lucide-react"
import type { Slide } from "@/lib/types"
import { SITE_CONFIG } from "@/lib/site"

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" })
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative" aria-label="عروض المتجر">
      <div className="overflow-hidden rounded-3xl mx-4 mt-4" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative aspect-[16/10] md:aspect-[21/9] bg-muted">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 md:px-12 lg:px-16 max-w-xl text-primary-foreground">
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-balance">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg mb-5 text-pretty opacity-90">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.href}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
                      >
                        {slide.cta}
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                      <a
                        href={SITE_CONFIG.social.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-background/15 backdrop-blur-sm text-primary-foreground border border-background/30 rounded-full px-6 py-3 text-sm font-medium hover:bg-background/25 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        اطلب عبر واتساب
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* النقاط */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`الانتقال إلى الشريحة ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              selected === i ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Minus, Plus, Star, Truck, Shield, Headphones, RotateCcw, MessageCircle, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"
import { SITE_CONFIG } from "@/lib/site"

const FEATURES = [
  { icon: Truck, title: "شحن سريع", desc: "خلال 1-3 أيام" },
  { icon: Shield, title: "جودة عالية", desc: "منتجات أصلية 100%" },
  { icon: Headphones, title: "دعم 24/7", desc: "لخدمتكم دائماً" },
  { icon: RotateCcw, title: "إرجاع سهل", desc: "خلال 14 يوم" },
]

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const images = product.images.length > 0 ? product.images : [product.image]

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
    toast({
      title: "تمت الإضافة للسلة",
      description: `${product.name} (${quantity})`,
    })
  }

  const handleWhatsAppOrder = () => {
    const msg = `مرحباً، أرغب في طلب:\n\n*${product.name}*\nالسعر: ${product.price} ${SITE_CONFIG.currency}\nاللون: ${selectedColor}\nالمقاس: ${selectedSize}\nالكمية: ${quantity}\nالإجمالي: ${product.price * quantity} ${SITE_CONFIG.currency}`
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* الصور */}
        <div>
          <div className="relative aspect-square bg-muted rounded-3xl overflow-hidden mb-3">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <button
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="إضافة للمفضلة"
            >
              <Heart className="w-5 h-5 text-foreground" />
            </button>
            <span className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-xs font-medium rounded-full px-3 py-1">
              {selectedImage + 1}/{images.length}
            </span>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-2 transition-all ${
                    selectedImage === i ? "ring-primary" : "ring-transparent"
                  }`}
                  aria-label={`صورة ${i + 1}`}
                >
                  <Image src={img || "/placeholder.svg"} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* التفاصيل */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex" aria-label={`التقييم ${product.rating} من 5`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewsCount}S)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold text-primary">
              {product.price} {SITE_CONFIG.currency}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-price-old line-through">
                {product.oldPrice} {SITE_CONFIG.currency}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {/* الألوان */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">اللون: <span className="text-muted-foreground font-normal">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${
                      selectedColor === color.name ? "ring-primary" : "ring-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* المقاسات */}
          {product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">المقاس</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 h-10 rounded-full text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* الكمية */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">الكمية</p>
            <div className="inline-flex items-center border border-border rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                aria-label="تقليل الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* أزرار الإجراء */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary rounded-full py-3 font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              إضافة للسلة
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full py-3 font-bold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              طلب مباشر
            </button>
          </div>

          {/* المميزات */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="text-center bg-secondary rounded-xl p-3">
                  <Icon className="w-5 h-5 mx-auto text-primary mb-1.5" />
                  <p className="text-xs font-bold mb-0.5">{f.title}</p>
                  <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

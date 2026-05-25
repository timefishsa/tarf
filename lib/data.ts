import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"
import sliderData from "@/data/slider.json"
import offersData from "@/data/offers.json"
import couponsData from "@/data/coupons.json"
import reviewsData from "@/data/reviews.json"
import blogData from "@/data/blog.json"
import type { Product, Category, Slide, Offer, Coupon, Review, BlogPost } from "./types"

// ============================================
// دوال جلب البيانات الديناميكية من JSON
// ============================================

export function getProducts(): Product[] {
  return productsData.products as Product[]
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter((p) => p.category === categorySlug)
}

export function getBestsellers(): Product[] {
  return getProducts().filter((p) => p.isBestseller)
}

export function getNewArrivals(): Product[] {
  return getProducts().filter((p) => p.isNew)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return getProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  )
}

export function getCategories(): Category[] {
  return categoriesData.categories as Category[]
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug)
}

export function getSlides(): Slide[] {
  return sliderData.slides as Slide[]
}

export function getOffers(): Offer[] {
  return offersData.offers as Offer[]
}

export function getCoupons(): Coupon[] {
  return couponsData.coupons as Coupon[]
}

export function validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; discountAmount: number; message: string } {
  const coupon = getCoupons().find((c) => c.code.toUpperCase() === code.toUpperCase())
  if (!coupon) {
    return { valid: false, discountAmount: 0, message: "كود الخصم غير صحيح" }
  }
  if (coupon.minOrder && subtotal < coupon.minOrder) {
    return {
      valid: false,
      discountAmount: 0,
      message: `الحد الأدنى للطلب ${coupon.minOrder} ريال`,
    }
  }
  const discountAmount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.discount) / 100)
      : coupon.discount
  return { valid: true, coupon, discountAmount, message: "تم تطبيق الكود بنجاح" }
}

export function getReviews(): Review[] {
  return reviewsData.reviews as Review[]
}

export function getBlogPosts(): BlogPost[] {
  return blogData.posts as BlogPost[]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug)
}

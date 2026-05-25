export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviewsCount: number
  colors: { name: string; hex: string }[]
  sizes: string[]
  stock: number
  isNew?: boolean
  isBestseller?: boolean
  badge?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
  productCount?: number
}

export interface Slide {
  id: string
  title: string
  subtitle: string
  cta: string
  href: string
  image: string
}

export interface Coupon {
  code: string
  discount: number // بالنسبة المئوية
  type: "percent" | "fixed"
  minOrder?: number
  description: string
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  readTime: string
}

export interface Offer {
  id: string
  title: string
  discount: string
  image: string
  href: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

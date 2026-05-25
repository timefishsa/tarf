import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { CategoryCircles } from "@/components/category-circles"
import { getCategories, getProducts } from "@/lib/data"

export const metadata: Metadata = {
  title: "المتجر - تشكيلة كاملة من الأزياء",
  description: "تصفح جميع منتجات متجر ترف من ملابس رجالية ونسائية وأطفال وحقائب وأحذية وعطور وإكسسوارات.",
}

export default function ShopPage() {
  const products = getProducts()
  const categories = getCategories()

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">المتجر</h1>
          <p className="text-muted-foreground text-sm">
            تصفح {products.length} منتجاً من أحدث صيحات الموضة
          </p>
        </div>
        <CategoryCircles categories={categories} />
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

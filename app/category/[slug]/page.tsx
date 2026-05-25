import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data"

export async function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return { title: "القسم غير موجود" }
  return {
    title: category.name,
    description: `تسوق أحدث ${category.name} من متجر ترف بأفضل الأسعار وجودة عالية وشحن سريع.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()
  const products = getProductsByCategory(slug)

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <nav aria-label="مسار التنقل" className="text-sm text-muted-foreground mb-3">
            <a href="/" className="hover:text-primary">الرئيسية</a>
            <span className="mx-2">/</span>
            <a href="/shop" className="hover:text-primary">المتجر</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{category.name}</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {products.length} {products.length === 1 ? "منتج" : "منتجات"}
          </p>
          {products.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">لا توجد منتجات في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {products.map((product) => (
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

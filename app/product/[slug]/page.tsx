import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { ProductDetail } from "@/components/product-detail"
import { ProductSection } from "@/components/product-section"
import { getProductBySlug, getProducts, getProductsByCategory } from "@/lib/data"
import { SITE_CONFIG } from "@/lib/site"

export async function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "المنتج غير موجود" }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // JSON-LD للمنتج (مهم جداً للـ SEO)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "SAR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_CONFIG.url}/product/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <main className="pb-24 lg:pb-12">
        <ProductDetail product={product} />
        {related.length > 0 && (
          <ProductSection title="منتجات مشابهة" products={related} viewAllHref={`/category/${product.category}`} />
        )}
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

import { HeroSlider } from "@/components/hero-slider"
import { CategoryCircles } from "@/components/category-circles"
import { OffersGrid } from "@/components/offers-grid"
import { ProductSection } from "@/components/product-section"
import { CategoryList } from "@/components/category-list"
import { FeatureBar } from "@/components/feature-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import {
  getSlides,
  getCategories,
  getOffers,
  getBestsellers,
  getNewArrivals,
  getProducts,
} from "@/lib/data"

export default function HomePage() {
  const slides = getSlides()
  const categories = getCategories()
  const offers = getOffers()
  const bestsellers = getBestsellers()
  const newArrivals = getNewArrivals()
  const allProducts = getProducts()

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-0">
        <HeroSlider slides={slides} />
        <CategoryCircles categories={categories} />
        <OffersGrid offers={offers} />
        <ProductSection title="الأكثر مبيعاً" products={bestsellers.length ? bestsellers : allProducts} />
        <CategoryList categories={categories} />
        <ProductSection
          title="وصل حديثاً"
          products={newArrivals.length ? newArrivals : allProducts.slice(0, 8)}
        />
        <FeatureBar />
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

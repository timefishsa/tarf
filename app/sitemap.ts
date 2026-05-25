import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/lib/site"
import { getProducts, getCategories, getBlogPosts } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/returns",
    "/cart",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }))

  const products: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categories: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const posts: MetadataRoute.Sitemap = getBlogPosts().map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...products, ...categories, ...posts]
}

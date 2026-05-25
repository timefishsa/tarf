import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { getBlogPosts } from "@/lib/data"

export const metadata: Metadata = {
  title: "المدونة - أحدث المقالات والصيحات",
  description: "اقرأ أحدث المقالات حول الموضة والأناقة ونصائح التسوق من خبراء متجر ترف.",
}

export default function BlogPage() {
  const posts = getBlogPosts()
  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12 mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">المدونة</h1>
        <p className="text-muted-foreground text-sm mb-6">
          أحدث المقالات والنصائح من فريق ترف
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  اقرأ المقال <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

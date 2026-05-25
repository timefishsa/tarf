import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowRight, Share2, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data"
import { SITE_CONFIG } from "@/lib/site"

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: "المقال غير موجود" }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12 mx-auto max-w-3xl px-4 py-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowRight className="w-4 h-4" /> العودة للمدونة
        </Link>
        <article>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-balance">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
            <span>بواسطة {post.author}</span>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted mb-6">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose prose-sm md:prose-base max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-foreground leading-relaxed mb-4 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          {/* المشاركة */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="font-bold mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> شارك المقال
            </p>
            <div className="flex gap-2">
              <a
                href={`${SITE_CONFIG.social.whatsapp}?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                aria-label="مشاركة على واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

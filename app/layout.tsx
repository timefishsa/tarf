import type { Metadata, Viewport } from "next"
import { Tajawal, Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { SITE_CONFIG } from "@/lib/site"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
})

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
})

// ============================================
// SEO ثابت في HTML - يقرأه جوجل أثناء الزحف
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | متجر ملابس وأزياء رجالية ونسائية وأطفال`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  generator: "Next.js",
  applicationName: SITE_CONFIG.name,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | متجر الأزياء الأول`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#E91E63",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD للمتجر (Schema.org) - مهم جداً للـ SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.nameEn,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.contact.phone,
  email: SITE_CONFIG.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.contact.address,
    addressCountry: "YE",
  },
  sameAs: [
    SITE_CONFIG.social.instagram,
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.tiktok,
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${amiri.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

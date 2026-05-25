// ============================================
// إعدادات المتجر الثابتة - مكتوبة في HTML مباشرة
// هذه البيانات يقرأها جوجل أثناء الزحف (SEO)
// ============================================

export const SITE_CONFIG = {
  name: "ترف",
  nameEn: "TARAF STORE",
  tagline: "وجهتك الأولى للأناقة والجودة",
  description:
    "متجر ترف للأزياء والملابس الرجالية والنسائية والأطفال بأفضل الأسعار وجودة عالية وشحن سريع لجميع المناطق.",
  url: "https://tarafstore.com",
  locale: "ar_SA",
  currency: "ر.س",

  // معلومات التواصل
  contact: {
    phone: "+967747867867",
    phoneDisplay: "+967 747 867 867",
    whatsapp: "967747867867",
    email: "info@tarafstore.com",
    address: "صنعاء - شارع تعز",
    addressFull: "صنعاء - شارع تعز - اليمن",
    workingHours: "السبت - الخميس: 9:00 ص - 10:00 م",
  },

  // روابط التواصل الاجتماعي
  social: {
    whatsapp: "https://wa.me/967747867867",
    instagram: "https://instagram.com/tarafstore",
    tiktok: "https://tiktok.com/@tarafstore",
    facebook: "https://facebook.com/tarafstore",
    twitter: "https://twitter.com/tarafstore",
  },

  // الفوتر
  footer: {
    copyright: "© 2026 جميع الحقوق محفوظة - ترف",
    credit: "تصميم وتطوير بواسطة نسيم ستور",
  },

  // الكلمات المفتاحية للـ SEO
  keywords: [
    "متجر ترف",
    "TARAF STORE",
    "ملابس رجالية",
    "ملابس نسائية",
    "ملابس أطفال",
    "أزياء",
    "حقائب",
    "أحذية",
    "عطور",
    "إكسسوارات",
    "تسوق أونلاين",
    "متجر إلكتروني",
  ],
} as const

// ميزات المتجر (ثابتة في HTML)
export const STORE_FEATURES = [
  {
    icon: "truck",
    title: "شحن سريع",
    description: "إلى جميع المناطق",
  },
  {
    icon: "shield",
    title: "جودة مضمونة",
    description: "منتجات أصلية 100%",
  },
  {
    icon: "headphones",
    title: "دعم عملاء 24/7",
    description: "نحن هنا لخدمتكم دائماً",
  },
  {
    icon: "lock",
    title: "دفع آمن",
    description: "طرق دفع متعددة وآمنة",
  },
] as const

// روابط التنقل في الفوتر
export const FOOTER_LINKS = {
  important: [
    { label: "الرئيسية", href: "/" },
    { label: "المتجر", href: "/shop" },
    { label: "الأقسام", href: "/#categories" },
    { label: "العروض", href: "/#offers" },
    { label: "المدونة", href: "/blog" },
    { label: "تتبع الطلب", href: "/contact" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "سياسة الاسترجاع", href: "/returns" },
  ],
  categories: [
    { label: "ملابس نسائية", href: "/category/women" },
    { label: "ملابس رجالية", href: "/category/men" },
    { label: "ملابس أطفال", href: "/category/kids" },
    { label: "حقائب", href: "/category/bags" },
    { label: "أحذية", href: "/category/shoes" },
    { label: "إكسسوارات", href: "/category/accessories" },
    { label: "عطور", href: "/category/perfumes" },
  ],
} as const

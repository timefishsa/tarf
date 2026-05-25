import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { SITE_CONFIG } from "@/lib/site"

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: `سياسة الخصوصية وحماية البيانات في متجر ${SITE_CONFIG.name}.`,
}

// ============================================
// سياسة الخصوصية - ثابتة في HTML للـ SEO والمتطلبات القانونية
// ============================================
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-12 mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">سياسة الخصوصية</h1>
        <p className="text-sm text-muted-foreground mb-6">آخر تحديث: 1 مايو 2026</p>

        <div className="space-y-5 text-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-bold mb-2">مقدمة</h2>
            <p className="text-muted-foreground">
              في متجر {SITE_CONFIG.name}، نحن ملتزمون بحماية خصوصية عملائنا. توضح هذه السياسة كيفية
              جمعنا واستخدامنا وحمايتنا للبيانات الشخصية التي تشاركها معنا.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">البيانات التي نجمعها</h2>
            <ul className="list-disc pr-5 space-y-1 text-muted-foreground">
              <li>الاسم الكامل ورقم الهاتف</li>
              <li>عنوان التوصيل والبريد الإلكتروني</li>
              <li>بيانات الطلب والمنتجات المشتراة</li>
              <li>معلومات تقنية مثل عنوان IP ونوع المتصفح</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">كيف نستخدم بياناتك</h2>
            <ul className="list-disc pr-5 space-y-1 text-muted-foreground">
              <li>تنفيذ الطلبات وتوصيلها إلى عنوانك</li>
              <li>التواصل معك بخصوص طلبك</li>
              <li>تحسين خدماتنا ومنتجاتنا</li>
              <li>إرسال العروض الترويجية (بموافقتك)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">حماية البيانات</h2>
            <p className="text-muted-foreground">
              نطبق إجراءات أمنية صارمة لحماية بياناتك من الوصول غير المصرح به. لا نشارك بياناتك مع
              أي طرف ثالث إلا للضرورة (مثل شركات الشحن).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">حقوقك</h2>
            <ul className="list-disc pr-5 space-y-1 text-muted-foreground">
              <li>الحق في الوصول إلى بياناتك الشخصية</li>
              <li>الحق في تصحيح البيانات غير الصحيحة</li>
              <li>الحق في طلب حذف بياناتك</li>
              <li>الحق في إلغاء الاشتراك من الرسائل الترويجية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2">التواصل معنا</h2>
            <p className="text-muted-foreground">
              لأي استفسار حول سياسة الخصوصية، يمكنك التواصل معنا عبر:
              <br />
              البريد الإلكتروني: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-primary hover:underline">{SITE_CONFIG.contact.email}</a>
              <br />
              الهاتف: <span dir="ltr">{SITE_CONFIG.contact.phoneDisplay}</span>
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

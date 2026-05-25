"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check, MessageCircle, MapPin, Phone, User, Truck, Store, Zap, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import couponsData from "@/data/coupons.json"
import { SITE_CONFIG } from "@/lib/site"
import type { Coupon } from "@/lib/types"

const SHIPPING_METHODS = [
  { id: "express", icon: Zap, name: "شحن سريع", desc: "1 - 2 يوم عمل", price: 20 },
  { id: "standard", icon: Truck, name: "شحن عادي", desc: "3 - 5 أيام عمل", price: 15 },
  { id: "pickup", icon: Store, name: "استلام من المتجر", desc: "جاهز للاستلام", price: 0 },
] as const

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [shipping, setShipping] = useState<string>("standard")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ coupon: Coupon; amount: number } | null>(null)
  const [couponMessage, setCouponMessage] = useState("")

  const shippingMethod = SHIPPING_METHODS.find((s) => s.id === shipping) || SHIPPING_METHODS[1]
  const discountAmount = appliedCoupon?.amount || 0
  const total = Math.max(0, subtotal + shippingMethod.price - discountAmount)

  const applyCoupon = () => {
    const coupons = couponsData.coupons as Coupon[]
    const found = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase())
    if (!found) {
      setCouponMessage("كود الخصم غير صحيح")
      setAppliedCoupon(null)
      return
    }
    if (found.minOrder && subtotal < found.minOrder) {
      setCouponMessage(`الحد الأدنى للطلب ${found.minOrder} ${SITE_CONFIG.currency}`)
      setAppliedCoupon(null)
      return
    }
    const amount =
      found.type === "percent" ? Math.round((subtotal * found.discount) / 100) : found.discount
    setAppliedCoupon({ coupon: found, amount })
    setCouponMessage("تم تطبيق الكود بنجاح")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast({ title: "السلة فارغة", description: "أضف منتجات قبل إتمام الطلب" })
      return
    }
    const lines = items.map(
      (i) =>
        `• ${i.name}\n  المقاس: ${i.size} | اللون: ${i.color} | الكمية: ${i.quantity} | ${i.price * i.quantity} ${SITE_CONFIG.currency}`,
    )
    const msg = [
      `*طلب جديد من ${SITE_CONFIG.name}*`,
      "",
      "*بيانات العميل:*",
      `الاسم: ${name}`,
      `الهاتف: ${phone}`,
      `المدينة: ${city}`,
      `العنوان: ${address}`,
      "",
      "*المنتجات:*",
      ...lines,
      "",
      `طريقة التوصيل: ${shippingMethod.name}`,
      appliedCoupon ? `كود الخصم: ${appliedCoupon.coupon.code} (-${discountAmount} ${SITE_CONFIG.currency})` : "",
      "",
      `*الإجمالي: ${total} ${SITE_CONFIG.currency}*`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank")
    clearCart()
    setTimeout(() => router.push("/"), 1500)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-3">السلة فارغة</h1>
          <p className="text-muted-foreground mb-6">أضف منتجات لإتمام الطلب</p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold"
          >
            تصفح المتجر
          </button>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pb-12 mx-auto max-w-3xl px-4 py-6">
        {/* مؤشر الخطوات */}
        <div className="flex items-center justify-between mb-8 max-w-md mx-auto" aria-label="خطوات الطلب">
          {[
            { label: "السلة", done: true },
            { label: "البيانات", done: true },
            { label: "تأكيد الطلب", done: false, active: true },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.active
                      ? "bg-primary text-primary-foreground"
                      : step.done
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    step.active || step.done ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step.done ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ملخص الطلب */}
        <section className="bg-card border border-border rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded" />
            ملخص الطلب
          </h2>
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 py-3 border-b border-border last:border-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-muted-foreground text-xs">
                  المقاس: {item.size} | اللون: {item.color} | الكمية: {item.quantity}
                </p>
                <p className="font-bold text-primary mt-1">
                  {item.price * item.quantity} {SITE_CONFIG.currency}
                </p>
              </div>
            </div>
          ))}
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* بيانات العميل */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded" />
              بيانات العميل
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم الكامل</label>
                <User className="absolute right-3 top-9 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full bg-background border border-input rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">رقم الهاتف</label>
                <Phone className="absolute right-3 top-9 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <input
                  id="phone"
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-background border border-input rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              </div>
              <div className="relative sm:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium mb-1">المدينة</label>
                <MapPin className="absolute right-3 top-9 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <input
                  id="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="اختر مدينتك"
                  className="w-full bg-background border border-input rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-1">العنوان التفصيلي</label>
                <textarea
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="أدخل العنوان بالتفصيل (الحي، الشارع، رقم المبنى...)"
                  rows={2}
                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </section>

          {/* كود الخصم */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              كود الخصم
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="أدخل كود الخصم"
                className="flex-1 bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="bg-primary text-primary-foreground rounded-xl px-5 py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                تطبيق الكود
              </button>
            </div>
            {couponMessage && (
              <p className={`mt-2 text-xs ${appliedCoupon ? "text-emerald-600" : "text-destructive"}`}>
                {couponMessage}
              </p>
            )}
            {appliedCoupon && (
              <dl className="mt-3 pt-3 border-t border-border space-y-1 text-sm">
                <div className="flex justify-between text-emerald-600">
                  <dt>قيمة الخصم</dt>
                  <dd className="font-bold">- {discountAmount} {SITE_CONFIG.currency}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-bold">المبلغ بعد الخصم</dt>
                  <dd className="font-bold text-primary">{total} {SITE_CONFIG.currency}</dd>
                </div>
              </dl>
            )}
          </section>

          {/* طريقة التوصيل */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              طريقة التوصيل
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SHIPPING_METHODS.map((method) => {
                const Icon = method.icon
                const selected = shipping === method.id
                return (
                  <label
                    key={method.id}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                      selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={selected}
                      onChange={() => setShipping(method.id)}
                      className="sr-only"
                    />
                    <Icon className={`w-6 h-6 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-bold text-sm">{method.name}</span>
                    <span className="text-xs text-muted-foreground">{method.desc}</span>
                    <span className="text-sm font-bold text-primary">
                      {method.price === 0 ? "مجاناً" : `${method.price} ${SITE_CONFIG.currency}`}
                    </span>
                    <span
                      className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 ${
                        selected ? "border-primary bg-primary" : "border-border"
                      }`}
                      aria-hidden="true"
                    />
                  </label>
                )
              })}
            </div>
          </section>

          {/* ملخص الفاتورة */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded" />
              ملخص الفاتورة
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">إجمالي المنتجات</dt>
                <dd>{subtotal} {SITE_CONFIG.currency}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">رسوم الشحن</dt>
                <dd>{shippingMethod.price} {SITE_CONFIG.currency}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>الخصم</dt>
                  <dd>- {discountAmount} {SITE_CONFIG.currency}</dd>
                </div>
              )}
            </dl>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mt-4 flex justify-between items-baseline">
              <span className="font-bold">الإجمالي النهائي</span>
              <span className="font-bold text-2xl text-primary">
                {total} {SITE_CONFIG.currency}
              </span>
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-3 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="flex flex-col items-start">
              <span>إتمام الطلب عبر واتساب</span>
              <span className="text-xs font-normal opacity-90">سيتم فتح واتساب مع تفاصيل طلبك</span>
            </span>
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}

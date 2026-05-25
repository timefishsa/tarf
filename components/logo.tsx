import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex flex-col items-center leading-none ${className}`} aria-label="ترف - الرئيسية">
      <span className="font-display text-2xl font-bold text-primary tracking-tight">ترف</span>
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-medium mt-0.5">TARAF</span>
    </Link>
  )
}

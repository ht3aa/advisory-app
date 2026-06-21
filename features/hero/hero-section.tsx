import Link from "next/link";
import { ArrowLeft, ChevronDown, ShieldCheck } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";

const highlights = [
  "استشارة مستقلة ومحايدة",
  "معايير وطنية معتمدة",
  "خبرة فنية موثّقة",
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-brand-ink text-white"
    >
      {/* Emerald canvas + hexagonal field at low opacity (brand) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-brand-emerald-deep via-brand-ink to-brand-ink" />
      <div className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
      <div className="pointer-events-none absolute -top-24 left-[-10%] -z-10 size-[36rem] rounded-full bg-brand-emerald/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-5%] -z-10 size-[28rem] rounded-full bg-brand-bright/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <span className="label-mono inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-white/80">
              <span aria-hidden className="text-brand-bright">
                /
              </span>
              {site.city} — {site.est}
            </span>

            <h1 className="mt-7 text-balance text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              المرجع الفني المستقل
              <br />
              <span className="text-brand-bright">لصناعة البرمجيات</span> في
              العراق
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/75">
              المكتب الاستشاري التابع لنقابة المبرمجين العراقيين — نقدّم
              الاستشارة الفنية والتدقيق والإشراف وبناء القدرات للجهات الحكومية
              والشركات والمؤسسات الأكاديمية.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-bright text-brand-emerald-deep hover:bg-white"
              >
                <Link href="/request">
                  اطلب استشارة
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#services">استعرض الخدمات</a>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <ShieldCheck className="size-4 text-brand-bright" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Brand mark composition */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
              <div className="bg-hex absolute inset-0 rounded-2xl opacity-[0.07]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <LogoMark className="size-48 text-brand-bright/90" />
              </div>
              <div className="absolute bottom-5 right-5 left-5 flex items-center justify-between">
                <span className="label-mono text-white/55">{site.domain}</span>
                <span className="label-mono text-white/55">EST · 2026</span>
              </div>
              <div className="absolute right-5 top-5 font-mono text-xs text-white/40">
                {"</>"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sector strip + scroll-down cue */}
      <div className="relative border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="label-mono text-white/40">يخدم</span>
            {["الحكومة", "الجامعات", "الصناعة", "الشركات الناشئة", "المحاكم"].map(
              (s) => (
                <span key={s} className="text-sm font-medium text-white/65">
                  {s}
                </span>
              )
            )}
          </div>

          <a
            href="#services"
            className="group flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-brand-bright"
          >
            <span className="label-mono">اسحب للأسفل</span>
            <span className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-brand-bright/50 group-hover:bg-brand-bright/10">
              <ChevronDown className="size-4 animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

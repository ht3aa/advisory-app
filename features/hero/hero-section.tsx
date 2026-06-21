import Link from "next/link";
import { ArrowLeft, ChevronDown, ShieldCheck } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/brand/mark";
import { HexField } from "@/components/brand/hex-field";

const highlights = [
  "استشارة مستقلة ومحايدة",
  "معايير وطنية معتمدة",
  "خبرة فنية موثّقة",
];

export function HeroSection() {
  return (
    <section
      id="top"
      style={{ viewTransitionName: "ips-hero" }}
      className="relative isolate overflow-hidden bg-ips-green-deep text-ips-white"
    >
      {/* Deep-green canvas + hexagonal field at 6% (brand /27) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-bl from-ips-green/35 via-ips-green-deep to-ips-ink" />
      <HexField className="-z-10" opacity={0.06} />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <span className="ips-build label-mono inline-flex items-center gap-2 rounded-full border border-ips-white/15 bg-ips-white/5 px-3.5 py-1.5 text-ips-white/80">
              <span aria-hidden className="text-ips-emerald">
                /
              </span>
              {site.city} — {site.est}
            </span>

            <h1 className="ips-build ips-build-1 mt-7 text-balance text-h1 font-semibold">
              المرجع الفني المستقل
              <br />
              <span className="text-ips-emerald">لصناعة البرمجيات</span> في
              العراق
            </h1>

            <p className="ips-build ips-build-2 mt-6 max-w-xl text-balance text-lead text-ips-white/75">
              المكتب الاستشاري التابع لنقابة المبرمجين العراقيين — نقدّم
              الاستشارة الفنية والتدقيق والإشراف وبناء القدرات للجهات الحكومية
              والشركات والمؤسسات الأكاديمية.
            </p>

            <div className="ips-build ips-build-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/request">
                  اطلب استشارة
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-ips-white/25 bg-transparent text-ips-white hover:border-ips-white/40 hover:bg-ips-white/10 hover:text-ips-white"
              >
                <a href="#services">استعرض الخدمات</a>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-sm text-ips-white/70"
                >
                  <ShieldCheck className="size-4 text-ips-emerald" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Brand mark composition */}
          <div className="relative hidden lg:block">
            <div className="ips-build ips-build-2 relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-[var(--radius-xl)] border border-ips-white/10 bg-ips-white/[0.03]" />
              <HexField className="rounded-[var(--radius-xl)]" opacity={0.07} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Mark variant="white" decorative className="size-48" />
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                <span className="label-mono text-ips-white/55">
                  {site.domain}
                </span>
                <span className="label-mono text-ips-white/55">EST · 2026</span>
              </div>
              <div className="absolute end-5 top-5 font-mono text-xs text-ips-white/40">
                {"</>"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sector strip */}
      <div className="relative border-t border-ips-white/10 bg-ips-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-6 lg:flex-row lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="label-mono text-ips-white/40">يخدم</span>
            {["الحكومة", "الجامعات", "الصناعة", "الشركات الناشئة", "المحاكم"].map(
              (s) => (
                <span key={s} className="text-sm font-medium text-ips-white/65">
                  {s}
                </span>
              )
            )}
          </div>

          <a
            href="#services"
            className="group flex items-center gap-2 text-sm font-medium text-ips-white/60 transition-colors duration-150 ease-ips hover:text-ips-emerald"
          >
            <span className="label-mono">اسحب للأسفل</span>
            <span className="flex size-9 items-center justify-center rounded-full border border-ips-white/15 bg-ips-white/5 transition-all duration-150 ease-ips group-hover:translate-y-0.5 group-hover:border-ips-emerald/50 group-hover:bg-ips-emerald/10">
              <ChevronDown className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

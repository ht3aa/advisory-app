import { ArrowLeft, Mail, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";

export function CtaSection() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-2xl bg-brand-ink px-6 py-16 text-white sm:px-12 lg:px-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-brand-emerald-deep via-brand-ink to-brand-ink" />
          <div className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
          <div className="pointer-events-none absolute -left-10 -top-10 -z-10 size-72 rounded-full bg-brand-bright/10 blur-[100px]" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="label-mono flex items-center gap-2 text-brand-bright">
                <span aria-hidden>/</span> ابدأ الآن
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                مشروعك التقني يستحق رأيًا فنيًا مستقلًا
              </h2>
              <p className="mt-4 max-w-xl text-balance leading-relaxed text-white/75">
                تواصل مع المكتب الاستشاري لمناقشة احتياجك، وسنحدّد المسار الأنسب
                لمشروعك — من التقييم وحتى التسليم.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-bright text-brand-emerald-deep hover:bg-white"
                >
                  <a href={`mailto:${site.email}`}>
                    اطلب استشارة
                    <ArrowLeft className="size-4" />
                  </a>
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

              <div className="mt-9 flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:gap-8">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-brand-bright"
                >
                  <Mail className="size-4 text-brand-bright" />
                  <span dir="ltr">{site.email}</span>
                </a>
                <span className="flex items-center gap-2">
                  <Phone className="size-4 text-brand-bright" />
                  <span dir="ltr">{site.phone}</span>
                </span>
              </div>
            </div>

            <div className="relative hidden justify-self-center lg:flex">
              <div className="relative flex size-64 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="bg-hex absolute inset-0 rounded-2xl opacity-[0.07]" />
                <LogoMark className="size-32 text-brand-bright/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

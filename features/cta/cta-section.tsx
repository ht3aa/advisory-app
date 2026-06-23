import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HexField } from "@/components/brand/hex-field";
import { Reveal } from "@/components/motion/reveal";

export function CtaSection() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="relative isolate overflow-hidden rounded-[var(--radius-2xl)] bg-ips-green-deep px-6 py-16 text-ips-white sm:px-12 lg:px-20 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-linear-to-bl from-ips-green/40 via-ips-green-deep to-ips-ink" />

          {/* Brand service-ecosystem render — full-bleed across the band,
              mirrored so the subject sits on the inline-start (left in RTL),
              clear of the Arabic copy on the inline-end. */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src="/generated/advisory-hero.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-scale-x-100 object-cover object-center opacity-40 lg:opacity-100"
            />
            {/* Legibility scrims — darken toward the copy + anchor edges */}
            <div className="absolute inset-0 bg-linear-to-l from-ips-green-deep via-ips-green-deep/75 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-ips-green-deep/80 via-transparent to-ips-green-deep/40" />
          </div>

          <HexField className="-z-10" opacity={0.06} />

          <div className="max-w-xl">
            <span className="label-mono flex items-center gap-2 text-ips-emerald">
              <span aria-hidden>/</span> ابدأ الآن
            </span>
            <h2 className="mt-4 text-balance text-h2 sm:text-h2">
              مشروعك التقني يستحق رأيًا فنيًا مستقلًا
            </h2>
            <p className="mt-4 max-w-xl text-balance leading-relaxed text-ips-white/75">
              تواصل مع المكتب الاستشاري لمناقشة احتياجك، وسنحدّد المسار الأنسب
              لمشروعك — من التقييم وحتى التسليم.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

            <div className="mt-9 flex flex-col gap-3 text-sm text-ips-white/70 sm:flex-row sm:gap-8">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition-colors duration-150 ease-ips hover:text-ips-emerald"
              >
                <Mail className="size-4 text-ips-emerald" />
                <span dir="ltr">{site.email}</span>
              </a>
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-ips-emerald" />
                <span dir="ltr">{site.phone}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

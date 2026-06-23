import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "./services.data";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="خدماتنا"
            title="عشر خدمات استشارية تغطي دورة حياة المشروع التقني"
            description="من الاستشارة والتخطيط، مرورًا بالتنفيذ والإشراف، وصولًا إلى التدقيق والخبرة الفنية وبناء القدرات."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            return (
              <Reveal
                key={service.id}
                delay={(i % 3) * 0.08}
                className="group relative flex flex-col gap-0 rounded-none border-0 bg-card p-7 shadow-none transition-colors hover:bg-secondary/60"
              >
                <span
                  aria-hidden
                  className="label-mono absolute top-7 end-7 text-muted-foreground/50"
                >
                  {service.no}
                </span>

                <div className="flex size-16 items-center justify-center rounded-[var(--radius-lg)] bg-ips-white shadow-sm ring-1 ring-border transition-all duration-150 ease-ips group-hover:-translate-y-0.5 group-hover:ring-ips-green/30">
                  <Image
                    src={service.image}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <span className="label-mono mt-5 text-ips-green/70">
                  {service.labelEn}
                </span>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-ips-emerald transition-transform duration-300 ease-ips group-hover:scale-x-100 ltr:origin-left rtl:origin-right"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

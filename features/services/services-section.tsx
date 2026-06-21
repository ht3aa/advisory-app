import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { services } from "./services.data";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="خدماتنا"
          title="عشر خدمات استشارية تغطي دورة حياة المشروع التقني"
          description="من الاستشارة والتخطيط، مرورًا بالتنفيذ والإشراف، وصولًا إلى التدقيق والخبرة الفنية وبناء القدرات."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="group relative gap-0 rounded-none border-0 bg-card p-7 shadow-none transition-colors hover:bg-secondary/60"
              >
                <span
                  aria-hidden
                  className="label-mono absolute left-7 top-7 text-muted-foreground/50"
                >
                  {service.no}
                </span>

                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-md",
                    "bg-primary/10 text-primary transition-colors",
                    "group-hover:bg-primary group-hover:text-primary-foreground"
                  )}
                >
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <span className="label-mono mt-5 text-primary/70">
                  {service.labelEn}
                </span>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-brand-bright transition-transform duration-300 group-hover:scale-x-100"
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

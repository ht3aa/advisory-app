import { BadgeCheck, Scale, Target, Users } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const values = [
  {
    icon: BadgeCheck,
    title: "المصداقية",
    body: "آراء فنية مبنية على المعايير والأدلة، لا على المصالح.",
  },
  {
    icon: Scale,
    title: "الحياد والاستقلالية",
    body: "استشارة محايدة تخدم الجهة والمشروع قبل أي اعتبار آخر.",
  },
  {
    icon: Target,
    title: "الدقة والصرامة",
    body: "منهجية منضبطة ومخرجات قابلة للقياس في كل مرحلة.",
  },
  {
    icon: Users,
    title: "الإرشاد والتمكين",
    body: "ننقل المعرفة ونبني القدرات بدل الاعتماد الدائم علينا.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="من نحن"
              title="الذراع الاستشارية لنقابة المبرمجين العراقيين"
              description="جهة مهنية مستقلة تجمع نخبة من الخبراء في هندسة البرمجيات وأمن المعلومات والبنية التحتية، لتقديم استشارة موثوقة ترفع جودة المشاريع التقنية في العراق."
            />

            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              نعمل جسرًا يربط الحكومة والجامعات والصناعة والشركات الناشئة ضمن منظومة
              تقنية وطنية واحدة، ونضع معايير مهنية تحتكم إليها الجهات عند تصميم
              مشاريعها وتنفيذها وتقييمها.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
              <Stat value="18" label="محافظة مشمولة" />
              <Stat value="+10" label="مجالات استشارية" />
              <Stat value="100%" label="استشارة مستقلة" />
              <Stat value="2026" label="سنة التأسيس" />
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-[var(--radius-ips)] border bg-card p-6 transition-colors duration-150 ease-ips hover:border-ips-green/30"
                >
                  <div className="flex size-11 items-center justify-center rounded-[var(--radius-ips)] bg-ips-green/8 text-ips-green">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="numeral text-4xl leading-none text-ips-green">{value}</dt>
      <dd className="mt-2 text-sm text-muted-foreground">{label}</dd>
    </div>
  );
}

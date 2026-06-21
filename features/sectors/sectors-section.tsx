import {
  Landmark,
  GraduationCap,
  Factory,
  Rocket,
  GitBranch,
  Gavel,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const sectors: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Landmark,
    title: "الجهات الحكومية",
    body: "مشاريع التحول الرقمي والحكومة الإلكترونية والمناقصات التقنية.",
  },
  {
    icon: GraduationCap,
    title: "الجامعات والبحث",
    body: "تطوير المناهج التقنية وبناء قدرات الكوادر الأكاديمية.",
  },
  {
    icon: Factory,
    title: "الصناعة والشركات",
    body: "تدقيق الأنظمة والبنية التحتية ورفع جودة المنتجات الرقمية.",
  },
  {
    icon: Rocket,
    title: "الشركات الناشئة",
    body: "الإرشاد الفني ومراجعة المعمارية وجاهزية المنتج للتوسّع.",
  },
  {
    icon: GitBranch,
    title: "المصادر المفتوحة",
    body: "وضع المعايير ودعم مجتمعات المطوّرين والمساهمات الوطنية.",
  },
  {
    icon: Gavel,
    title: "المحاكم والجهات الرسمية",
    body: "الخبرة الفنية المحايدة والتقارير الموثّقة في القضايا التقنية.",
  },
];

export function SectorsSection() {
  return (
    <section id="sectors" className="scroll-mt-20 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="القطاعات"
          title="منظومة واحدة نخدمها بمهنية"
          description="نربط الحكومة والجامعات والصناعة والشركات الناشئة ضمن منظومة تقنية وطنية متكاملة."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group flex items-start gap-4 rounded-lg border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

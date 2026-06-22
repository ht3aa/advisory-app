import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    no: "01",
    title: "الاستكشاف والتقييم",
    body: "نفهم السياق والأهداف ونقيّم الوضع الراهن للأنظمة والمخاطر التقنية.",
  },
  {
    no: "02",
    title: "التخطيط والمواصفات",
    body: "نضع دراسة الجدوى والمواصفات الفنية والمعايير التي يُحتكم إليها.",
  },
  {
    no: "03",
    title: "التنفيذ والإشراف",
    body: "نشرف فنيًا على التنفيذ ونضبط الالتزام بالجودة والجداول الزمنية.",
  },
  {
    no: "04",
    title: "التدقيق والتسليم",
    body: "ندقّق المخرجات ونتحقق من الأمن والجودة وننقل المعرفة لفريق الجهة.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="منهجيتنا"
            title="مسار عمل منضبط من التقييم حتى التسليم"
            description="منهجية واضحة تضمن أن كل قرار تقني مبني على دليل، وأن كل مخرج قابل للقياس والتدقيق."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.no} delay={i * 0.1} className="relative">
              <div className="flex items-center gap-4">
                <span className="numeral flex size-12 items-center justify-center rounded-[var(--radius-ips)] bg-ips-green text-base font-medium text-ips-white">
                  {step.no}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-linear-to-l from-border to-transparent lg:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

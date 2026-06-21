import { SectionHeading } from "@/components/section-heading";

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
        <SectionHeading
          eyebrow="منهجيتنا"
          title="مسار عمل منضبط من التقييم حتى التسليم"
          description="منهجية واضحة تضمن أن كل قرار تقني مبني على دليل، وأن كل مخرج قابل للقياس والتدقيق."
          align="center"
          className="mx-auto"
        />

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.no} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-md bg-primary font-mono text-base font-semibold text-primary-foreground">
                  {step.no}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-l from-border to-transparent lg:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

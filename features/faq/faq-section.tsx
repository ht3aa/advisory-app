import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "كيف نطلب استشارة من المكتب؟",
    a: "يمكن للجهة إرسال طلب عبر نموذج التواصل أو البريد الرسمي، موضّحًا طبيعة المشروع والنطاق المطلوب، ويتولّى فريقنا تحديد جلسة استكشاف أولية لتقييم الاحتياج.",
  },
  {
    q: "هل خدماتكم متاحة للجهات الحكومية والخاصة معًا؟",
    a: "نعم. نقدّم الاستشارة للجهات الحكومية والجامعات والشركات والمؤسسات الناشئة، مع مراعاة المتطلبات النظامية لكل قطاع.",
  },
  {
    q: "ما الذي يميّز تقاريركم الفنية؟",
    a: "تقاريرنا محايدة ومبنية على المعايير والأدلة، وقابلة للقياس والتدقيق، وتصلح للاستخدام في القرارات الإدارية والمناقصات والقضايا الرسمية.",
  },
  {
    q: "هل تقدّمون الخبرة الفنية للمحاكم؟",
    a: "نعم، نوفّر الخبرة الفنية المحايدة للمحاكم والجهات الرسمية في القضايا التقنية، بتقارير موثّقة تستند إلى الأدلة الفنية.",
  },
  {
    q: "هل توفّرون برامج تدريب وبناء قدرات؟",
    a: "نوفّر برامج تدريب معتمدة للمبرمجين والشركات تهدف إلى رفع الكفاءة المهنية وفق المعايير الوطنية ونقل المعرفة للفرق الداخلية.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title="إجابات سريعة عن أكثر ما يُسأل"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

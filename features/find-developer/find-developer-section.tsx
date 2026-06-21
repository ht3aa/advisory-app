import { ArrowLeft, UserSearch } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export function FindDeveloperSection() {
  const { findDeveloper } = site;

  return (
    <section id="find-developer" className="scroll-mt-20 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 rounded-[var(--radius-lg)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-8 lg:p-10">
          <div className="flex max-w-2xl flex-col gap-5">
            <SectionHeading
              eyebrow="خدمة نقابية"
              title="ابحث عن المطوّر المناسب لمشروعك"
              description="منصة Find Developer — جسر يربط الجهات والشركات بمطوّري برمجيات عراقيين موثّقين، ضمن منظومة نقابة المبرمجين العراقيين."
            />

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <UserSearch className="size-4 shrink-0 text-ips-green" />
                مطوّرون حسب التخصص والخبرة
              </li>
              <li className="label-mono text-ips-gray" dir="ltr">
                {findDeveloper.domain}
              </li>
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Button asChild size="lg" variant="accent">
              <a
                href={findDeveloper.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                زيارة المنصة
                <ArrowLeft className="size-4" />
              </a>
            </Button>
            <span className="label-mono text-xs text-muted-foreground">
              {findDeveloper.nameEn}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

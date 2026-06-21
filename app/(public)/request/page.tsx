import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Wordmark } from "@/components/brand/logo";
import { SiteFooter } from "@/components/layout/site-footer";
import { SubmitForm } from "@/features/requests/submit-form";

export const metadata: Metadata = {
  title: "طلب استشارة",
  description:
    "أرسل طلب استشارة فنية إلى المكتب الاستشاري التابع لنقابة المبرمجين العراقيين.",
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5">
          <Link href="/" aria-label={site.nameAr}>
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="size-4" />
            العودة
          </Link>
        </div>
      </header>

      <main className="flex-1 px-5 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <span className="label-mono flex items-center gap-2 text-primary">
              <span aria-hidden>/</span> طلب استشارة
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              أرسل طلبك للمكتب الاستشاري
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              املأ النموذج أدناه وسيقوم فريقنا بمراجعة طلبك والرد عليك عبر البريد
              الإلكتروني في أقرب وقت.
            </p>
          </div>

          <SubmitForm defaultServiceKey={service} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

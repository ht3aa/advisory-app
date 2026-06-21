import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { LogoMark } from "@/components/brand/logo";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-brand-ink px-5 py-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-brand-emerald-deep via-brand-ink to-brand-ink" />
      <div className="bg-hex pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="size-12 text-brand-bright" />
          <h1 className="mt-4 text-2xl font-bold text-white">بوابة المكتب</h1>
          <p className="label-mono mt-2 text-white/55">{site.orgEn}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-7 shadow-lg">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              تسجيل الدخول للوحة التحكم
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              أدخل بيانات حسابك للمتابعة.
            </p>
          </div>

          <LoginForm callbackUrl={callbackUrl} />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-brand-bright"
          >
            <ArrowRight className="size-4" />
            العودة إلى الموقع
          </Link>
        </div>
      </div>
    </main>
  );
}

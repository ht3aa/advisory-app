import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Mark } from "@/components/brand/mark";
import { HexField } from "@/components/brand/hex-field";
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
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ips-green-deep px-5 py-12">
      <div className="absolute inset-0 -z-10 bg-linear-to-bl from-ips-green/35 via-ips-green-deep to-ips-ink" />
      <HexField className="-z-10" opacity={0.06} />

      <div className="w-full max-w-md">
        <div className="ips-build mb-8 flex flex-col items-center text-center">
          <Mark variant="white" decorative className="size-12" />
          <h1 className="mt-4 text-2xl font-semibold text-ips-white">
            بوابة المكتب
          </h1>
          <p className="label-mono mt-2 text-ips-white/55">{site.orgEn}</p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-border bg-card p-7">
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
            className="inline-flex items-center gap-1.5 text-sm text-ips-white/60 transition-colors duration-150 ease-ips hover:text-ips-emerald"
          >
            <ArrowRight className="size-4" />
            العودة إلى الموقع
          </Link>
        </div>
      </div>
    </main>
  );
}

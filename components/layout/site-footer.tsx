import { Mail, MapPin, Phone } from "lucide-react";

import { navItems, site } from "@/lib/site";
import { LogoMark } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white">
      <div className="bg-hex pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-9 text-brand-bright" />
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold">{site.nameAr}</span>
                <span className="label-mono mt-1 text-white/55">
                  {site.orgEn}
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {site.tagline}. نقدّم الاستشارة الفنية المستقلة والموثوقة للجهات
              الحكومية والشركات والمؤسسات الأكاديمية في العراق.
            </p>
          </div>

          <div>
            <h3 className="label-mono text-white/50">روابط</h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-brand-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-mono text-white/50">تواصل</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-brand-bright" />
                {site.city}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-brand-bright" />
                <span dir="ltr">{site.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-brand-bright" />
                <span dir="ltr">{site.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.org} — جميع الحقوق محفوظة.
          </p>
          <p className="label-mono">
            {site.domain} · {site.city}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";

import { navItems, site } from "@/lib/site";
import { Mark } from "@/components/brand/mark";
import { HexField } from "@/components/brand/hex-field";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ips-ink text-ips-white">
      <HexField opacity={0.05} nodes={false} />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Mark variant="white" decorative className="size-9" />
              <div className="flex flex-col leading-none">
                <span className="text-base font-semibold">{site.nameAr}</span>
                <span className="label-mono mt-1 text-ips-white/55">
                  {site.orgEn}
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ips-white/65">
              {site.tagline}. نقدّم الاستشارة الفنية المستقلة والموثوقة للجهات
              الحكومية والشركات والمؤسسات الأكاديمية في العراق.
            </p>
          </div>

          <div>
            <h3 className="label-mono text-ips-white/50">روابط</h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ips-white/75 transition-colors duration-150 ease-ips hover:text-ips-emerald"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-mono text-ips-white/50">تواصل</h3>
            <ul className="mt-5 space-y-4 text-sm text-ips-white/75">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-ips-emerald" />
                {site.city}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-ips-emerald" />
                <span dir="ltr">{site.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-ips-emerald" />
                <span dir="ltr">{site.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-ips-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-ips-white/45 sm:flex-row">
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

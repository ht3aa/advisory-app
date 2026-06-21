"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { hasPermission } from "@/lib/rbac";
import { Mark } from "@/components/brand/mark";
import { ADMIN_NAV } from "./nav-items";

export function AppSidebar({
  permissions,
  isSuperAdmin,
  onNavigate,
}: {
  permissions: string[];
  isSuperAdmin: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const subject = { permissions, isSuperAdmin };

  const items = ADMIN_NAV.filter((item) =>
    hasPermission(subject, item.permission)
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <Mark variant="mono" decorative className="size-7 text-ips-emerald" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">
            بوابة المكتب
          </span>
          <span className="label-mono text-[10px] text-sidebar-foreground/50">
            Advisory Office
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

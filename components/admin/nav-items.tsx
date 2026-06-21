import {
  Inbox,
  LayoutDashboard,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { PermissionName } from "@/lib/permissions";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  permission: PermissionName;
  /** Match nested routes for active state. */
  exact?: boolean;
};

export const ADMIN_NAV: AdminNavItem[] = [
  {
    label: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard.view",
    exact: true,
  },
  {
    label: "طلبات الاستشارة",
    href: "/admin/requests",
    icon: Inbox,
    permission: "requests.view",
  },
  {
    label: "المستخدمون",
    href: "/admin/users",
    icon: Users,
    permission: "users.view",
  },
  {
    label: "الأدوار والصلاحيات",
    href: "/admin/roles",
    icon: ShieldCheck,
    permission: "roles.view",
  },
];

/**
 * Canonical permission catalog. Pure data (no server-only imports) so it can be
 * shared between the Prisma seed, RBAC helpers, and client components.
 */

export const PERMISSION_GROUPS = {
  dashboard: "لوحة التحكم",
  requests: "طلبات الاستشارة",
  users: "المستخدمون",
  roles: "الأدوار والصلاحيات",
} as const;

export type PermissionGroup = keyof typeof PERMISSION_GROUPS;

export type PermissionDef = {
  name: string;
  label: string;
  group: PermissionGroup;
};

export const PERMISSIONS = [
  { name: "dashboard.view", label: "عرض لوحة التحكم", group: "dashboard" },

  { name: "requests.view", label: "عرض الطلبات", group: "requests" },
  { name: "requests.assign", label: "إسناد الطلبات", group: "requests" },
  { name: "requests.answer", label: "الرد على الطلبات", group: "requests" },
  { name: "requests.delete", label: "حذف الطلبات", group: "requests" },

  { name: "users.view", label: "عرض المستخدمين", group: "users" },
  { name: "users.create", label: "إنشاء مستخدم", group: "users" },
  { name: "users.update", label: "تعديل مستخدم", group: "users" },
  { name: "users.delete", label: "حذف مستخدم", group: "users" },

  { name: "roles.view", label: "عرض الأدوار", group: "roles" },
  { name: "roles.create", label: "إنشاء دور", group: "roles" },
  { name: "roles.update", label: "تعديل دور", group: "roles" },
  { name: "roles.delete", label: "حذف دور", group: "roles" },
] as const satisfies readonly PermissionDef[];

export type PermissionName = (typeof PERMISSIONS)[number]["name"];

export const ALL_PERMISSION_NAMES: PermissionName[] = PERMISSIONS.map(
  (p) => p.name
);

/** Default roles created during seeding. */
export const DEFAULT_ROLES: {
  name: string;
  label: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionName[];
}[] = [
  {
    name: "super-admin",
    label: "مدير عام",
    description: "صلاحيات كاملة على النظام",
    isSystem: true,
    permissions: ALL_PERMISSION_NAMES,
  },
  {
    name: "consultant",
    label: "مستشار",
    description: "عرض الطلبات والرد عليها",
    isSystem: true,
    permissions: [
      "dashboard.view",
      "requests.view",
      "requests.assign",
      "requests.answer",
    ],
  },
];

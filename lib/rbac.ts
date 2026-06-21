import type { PermissionName } from "@/lib/permissions";

export * from "@/lib/permissions";

export type PermissionSubject = {
  isSuperAdmin: boolean;
  permissions: string[];
};

export function hasPermission(
  subject: PermissionSubject | null | undefined,
  permission: PermissionName
): boolean {
  if (!subject) return false;
  if (subject.isSuperAdmin) return true;
  return subject.permissions.includes(permission);
}

export function hasAnyPermission(
  subject: PermissionSubject | null | undefined,
  permissions: PermissionName[]
): boolean {
  if (!subject) return false;
  if (subject.isSuperAdmin) return true;
  return permissions.some((p) => subject.permissions.includes(p));
}

import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/rbac";
import type { PermissionName } from "@/lib/permissions";

export const SUPER_ADMIN_ROLE = "super-admin";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
};

/**
 * Resolves the authenticated user with fresh roles + permissions from the DB.
 * Memoized per-request via React cache. Returns null when unauthenticated or
 * the account is disabled.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: { permissions: { select: { name: true } } },
      },
    },
  });

  if (!user || !user.isActive) return null;

  const roles = user.roles.map((r) => r.name);
  const permissions = Array.from(
    new Set(user.roles.flatMap((r) => r.permissions.map((p) => p.name)))
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles,
    permissions,
    isSuperAdmin: roles.includes(SUPER_ADMIN_ROLE),
  };
});

/** Redirects to /login if not authenticated. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Requires a specific permission; redirects to /admin with a denied flag otherwise. */
export async function requirePermission(
  permission: PermissionName
): Promise<CurrentUser> {
  const user = await requireUser();
  if (!hasPermission(user, permission)) {
    redirect("/admin?denied=1");
  }
  return user;
}

/** Non-throwing permission check for conditional rendering. */
export async function can(permission: PermissionName): Promise<boolean> {
  const user = await getCurrentUser();
  return hasPermission(user, permission);
}

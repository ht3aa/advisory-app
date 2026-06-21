import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requirePermission, can } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { RolesTable } from "@/features/roles/roles-table";

export const metadata: Metadata = { title: "الأدوار والصلاحيات" };

export default async function RolesPage() {
  await requirePermission("roles.view");
  const [canCreate, canUpdate, canDelete] = await Promise.all([
    can("roles.create"),
    can("roles.update"),
    can("roles.delete"),
  ]);

  const roles = await prisma.role.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { permissions: true, users: true } },
    },
  });

  const rows = roles.map((r) => ({
    id: r.id,
    name: r.name,
    label: r.label,
    description: r.description,
    isSystem: r.isSystem,
    permissionCount: r._count.permissions,
    userCount: r._count.users,
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="الأدوار والصلاحيات"
        description="عرّف الأدوار وامنحها صلاحيات الوصول."
        actions={
          canCreate && (
            <Button asChild>
              <Link href="/admin/roles/new">
                <Plus className="size-4" />
                دور جديد
              </Link>
            </Button>
          )
        }
      />

      <RolesTable data={rows} canUpdate={canUpdate} canDelete={canDelete} />
    </div>
  );
}

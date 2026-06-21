import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requirePermission, can } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { UsersTable } from "@/features/users/users-table";

export const metadata: Metadata = { title: "المستخدمون" };

export default async function UsersPage() {
  const current = await requirePermission("users.view");
  const [canCreate, canUpdate, canDelete] = await Promise.all([
    can("users.create"),
    can("users.update"),
    can("users.delete"),
  ]);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { roles: { select: { label: true } } },
  });

  const rows = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    isActive: u.isActive,
    roles: u.roles,
    createdAt: formatDate(u.createdAt),
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="المستخدمون"
        description="إدارة حسابات الموظفين وأدوارهم."
        actions={
          canCreate && (
            <Button asChild>
              <Link href="/admin/users/new">
                <Plus className="size-4" />
                مستخدم جديد
              </Link>
            </Button>
          )
        }
      />

      <UsersTable
        data={rows}
        canUpdate={canUpdate}
        canDelete={canDelete}
        currentUserId={current.id}
      />
    </div>
  );
}

import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { PageHeader } from "@/components/admin/page-header";
import { RoleForm } from "@/features/roles/role-form";

export const metadata: Metadata = { title: "دور جديد" };

export default async function NewRolePage() {
  await requirePermission("roles.create");

  const permissions = await prisma.permission.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, label: true, group: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="دور جديد"
        description="حدد اسم الدور وصلاحياته."
        breadcrumbs={[
          { label: "الأدوار", href: "/admin/roles" },
          { label: "جديد" },
        ]}
      />
      <RoleForm mode="create" permissions={permissions} />
    </div>
  );
}

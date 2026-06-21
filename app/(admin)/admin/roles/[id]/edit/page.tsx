import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { PageHeader } from "@/components/admin/page-header";
import { RoleForm } from "@/features/roles/role-form";

export const metadata: Metadata = { title: "تعديل دور" };

export default async function EditRolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("roles.update");
  const { id } = await params;

  const [role, permissions] = await Promise.all([
    prisma.role.findUnique({
      where: { id },
      include: { permissions: { select: { id: true } } },
    }),
    prisma.permission.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, label: true, group: true },
    }),
  ]);

  if (!role) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="تعديل الدور"
        description={role.label}
        breadcrumbs={[
          { label: "الأدوار", href: "/admin/roles" },
          { label: "تعديل" },
        ]}
      />
      <RoleForm
        mode="edit"
        roleId={role.id}
        isSystem={role.isSystem}
        permissions={permissions}
        defaultValues={{
          name: role.name,
          label: role.label,
          description: role.description ?? "",
          permissionIds: role.permissions.map((p) => p.id),
        }}
      />
    </div>
  );
}

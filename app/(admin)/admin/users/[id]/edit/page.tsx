import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { PageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/features/users/user-form";

export const metadata: Metadata = { title: "تعديل مستخدم" };

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("users.update");
  const { id } = await params;

  const [user, roles] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
      include: { roles: { select: { id: true } } },
    }),
    prisma.role.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, label: true },
    }),
  ]);

  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="تعديل المستخدم"
        description={user.name}
        breadcrumbs={[
          { label: "المستخدمون", href: "/admin/users" },
          { label: "تعديل" },
        ]}
      />
      <UserForm
        mode="edit"
        userId={user.id}
        roles={roles}
        defaultValues={{
          name: user.name,
          email: user.email,
          isActive: user.isActive,
          roleIds: user.roles.map((r) => r.id),
        }}
      />
    </div>
  );
}

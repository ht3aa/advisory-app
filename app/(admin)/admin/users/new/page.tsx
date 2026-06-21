import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { PageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/features/users/user-form";

export const metadata: Metadata = { title: "مستخدم جديد" };

export default async function NewUserPage() {
  await requirePermission("users.create");

  const roles = await prisma.role.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, label: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="مستخدم جديد"
        description="أضف حساب موظف وعيّن أدواره."
        breadcrumbs={[
          { label: "المستخدمون", href: "/admin/users" },
          { label: "جديد" },
        ]}
      />
      <UserForm mode="create" roles={roles} />
    </div>
  );
}

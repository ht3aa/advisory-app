"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { roleSchema, type RoleInput } from "./schema";

export type ActionResult = { error?: string; success?: string };

export async function createRoleAction(
  input: RoleInput
): Promise<ActionResult> {
  await requirePermission("roles.create");

  const parsed = roleSchema.safeParse(input);
  if (!parsed.success) return { error: "البيانات المدخلة غير صحيحة." };

  const { name, label, description, permissionIds } = parsed.data;

  try {
    await prisma.role.create({
      data: {
        name,
        label,
        description: description || null,
        permissions: { connect: permissionIds.map((id) => ({ id })) },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "هذا المعرّف مستخدم بالفعل." };
    }
    throw error;
  }

  revalidatePath("/admin/roles");
  redirect("/admin/roles");
}

export async function updateRoleAction(
  id: string,
  input: RoleInput
): Promise<ActionResult> {
  await requirePermission("roles.update");

  const parsed = roleSchema.safeParse(input);
  if (!parsed.success) return { error: "البيانات المدخلة غير صحيحة." };

  const { name, label, description, permissionIds } = parsed.data;

  const existing = await prisma.role.findUnique({
    where: { id },
    select: { isSystem: true, name: true },
  });
  if (!existing) return { error: "الدور غير موجود." };

  try {
    await prisma.role.update({
      where: { id },
      data: {
        // System roles keep their immutable identifier.
        name: existing.isSystem ? existing.name : name,
        label,
        description: description || null,
        permissions: { set: permissionIds.map((pid) => ({ id: pid })) },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "هذا المعرّف مستخدم بالفعل." };
    }
    throw error;
  }

  revalidatePath("/admin/roles");
  redirect("/admin/roles");
}

export async function deleteRoleAction(id: string): Promise<ActionResult> {
  await requirePermission("roles.delete");

  const role = await prisma.role.findUnique({
    where: { id },
    select: { isSystem: true, _count: { select: { users: true } } },
  });
  if (!role) return { error: "الدور غير موجود." };
  if (role.isSystem) return { error: "لا يمكن حذف دور نظامي." };
  if (role._count.users > 0) {
    return { error: "لا يمكن حذف دور مُسند إلى مستخدمين." };
  }

  await prisma.role.delete({ where: { id } });

  revalidatePath("/admin/roles");
  return { success: "تم حذف الدور." };
}

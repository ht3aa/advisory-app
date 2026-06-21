"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateInput,
  type UserUpdateInput,
} from "./schema";

export type ActionResult = { error?: string; success?: string };

export async function createUserAction(
  input: UserCreateInput
): Promise<ActionResult> {
  await requirePermission("users.create");

  const parsed = userCreateSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "البيانات المدخلة غير صحيحة." };
  }

  const { name, email, password, isActive, roleIds } = parsed.data;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        isActive,
        passwordHash: await bcrypt.hash(password, 12),
        roles: { connect: roleIds.map((id) => ({ id })) },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "هذا البريد الإلكتروني مستخدم بالفعل." };
    }
    throw error;
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUserAction(
  id: string,
  input: UserUpdateInput
): Promise<ActionResult> {
  await requirePermission("users.update");

  const parsed = userUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "البيانات المدخلة غير صحيحة." };
  }

  const { name, email, password, isActive, roleIds } = parsed.data;

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        isActive,
        roles: { set: roleIds.map((rid) => ({ id: rid })) },
        ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "هذا البريد الإلكتروني مستخدم بالفعل." };
    }
    throw error;
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function toggleUserActiveAction(
  id: string
): Promise<ActionResult> {
  const current = await requirePermission("users.update");

  if (current.id === id) {
    return { error: "لا يمكنك تعطيل حسابك الخاص." };
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { isActive: true },
  });
  if (!user) return { error: "المستخدم غير موجود." };

  await prisma.user.update({
    where: { id },
    data: { isActive: !user.isActive },
  });

  revalidatePath("/admin/users");
  return { success: user.isActive ? "تم تعطيل المستخدم." : "تم تفعيل المستخدم." };
}

export async function deleteUserAction(id: string): Promise<ActionResult> {
  const current = await requirePermission("users.delete");

  if (current.id === id) {
    return { error: "لا يمكنك حذف حسابك الخاص." };
  }

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin/users");
  return { success: "تم حذف المستخدم." };
}

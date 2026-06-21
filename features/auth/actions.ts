"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type LoginState =
  | {
      error?: string;
      fieldErrors?: { email?: string[]; password?: string[] };
    }
  | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "بيانات الدخول غير صحيحة أو الحساب غير مفعّل." };
    }
    // Re-throw redirect (NEXT_REDIRECT) and other framework errors.
    throw error;
  }

  return undefined;
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

const DEMO_USER = {
  name: "مستخدم تجريبي",
  email: "a@a.com",
  password: "password",
} as const;

export async function createDemoUserAction(): Promise<{
  error?: string;
  success?: string;
}> {
  const superAdmin = await prisma.role.findUnique({
    where: { name: "super-admin" },
    select: { id: true },
  });

  const passwordHash = await bcrypt.hash(DEMO_USER.password, 12);

  await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: {
      name: DEMO_USER.name,
      passwordHash,
      isActive: true,
      roles: superAdmin ? { set: [{ id: superAdmin.id }] } : undefined,
    },
    create: {
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      passwordHash,
      isActive: true,
      roles: superAdmin ? { connect: { id: superAdmin.id } } : undefined,
    },
  });

  return {
    success: `تم إنشاء المستخدم: ${DEMO_USER.email}`,
  };
}

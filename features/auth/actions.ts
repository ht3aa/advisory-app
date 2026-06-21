"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/lib/auth";

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

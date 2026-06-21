"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  TextField,
  SwitchField,
  SubmitButton,
  CheckboxField,
} from "@/components/admin/form-kit";
import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateInput,
  type UserUpdateInput,
} from "./schema";
import { createUserAction, updateUserAction } from "./actions";

type RoleOption = { id: string; label: string; name: string };

export function UserForm({
  mode,
  roles,
  userId,
  defaultValues,
}: {
  mode: "create" | "edit";
  roles: RoleOption[];
  userId?: string;
  defaultValues?: Partial<UserCreateInput>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<UserCreateInput>({
    resolver: zodResolver(
      mode === "create" ? userCreateSchema : userUpdateSchema
    ),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      password: "",
      isActive: defaultValues?.isActive ?? true,
      roleIds: defaultValues?.roleIds ?? [],
    },
  });

  function onSubmit(values: UserCreateInput) {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createUserAction(values)
          : await updateUserAction(userId!, values as UserUpdateInput);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-2xl flex-col gap-6"
      >
        <Card className="gap-5 p-6">
          <TextField<UserCreateInput>
            name="name"
            label="الاسم الكامل"
            required
            placeholder="الاسم"
          />
          <TextField<UserCreateInput>
            name="email"
            label="البريد الإلكتروني"
            type="email"
            dir="ltr"
            required
            placeholder="user@syndicate.iq"
          />
          <TextField<UserCreateInput>
            name="password"
            label={
              mode === "create"
                ? "كلمة المرور"
                : "كلمة المرور (اتركها فارغة للإبقاء عليها)"
            }
            type="password"
            dir="ltr"
            required={mode === "create"}
            placeholder="••••••••"
          />
          <SwitchField<UserCreateInput>
            name="isActive"
            label="الحساب مفعّل"
            description="يمكن للمستخدمين المفعّلين فقط تسجيل الدخول."
          />
        </Card>

        <Card className="gap-4 p-6">
          <div>
            <Label>الأدوار</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              تُحدّد الأدوار صلاحيات المستخدم في النظام.
            </p>
          </div>
          <Controller
            control={form.control}
            name="roleIds"
            render={({ field }) => (
              <div className="grid gap-2 sm:grid-cols-2">
                {roles.map((role) => {
                  const checked = field.value?.includes(role.id) ?? false;
                  return (
                    <CheckboxField
                      key={role.id}
                      id={`role-${role.id}`}
                      label={role.label}
                      checked={checked}
                      onCheckedChange={(c) => {
                        const next = new Set(field.value ?? []);
                        if (c) next.add(role.id);
                        else next.delete(role.id);
                        field.onChange(Array.from(next));
                      }}
                    />
                  );
                })}
              </div>
            )}
          />
        </Card>

        <div className="flex items-center gap-2">
          <SubmitButton pending={pending}>
            {mode === "create" ? "إنشاء المستخدم" : "حفظ التغييرات"}
          </SubmitButton>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/users")}
            disabled={pending}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

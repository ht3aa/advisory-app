"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  PERMISSION_GROUPS,
  type PermissionGroup,
} from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField, SubmitButton } from "@/components/admin/form-kit";
import { roleSchema, type RoleInput } from "./schema";
import { createRoleAction, updateRoleAction } from "./actions";

type PermissionOption = {
  id: string;
  name: string;
  label: string;
  group: string;
};

export function RoleForm({
  mode,
  roleId,
  isSystem = false,
  permissions,
  defaultValues,
}: {
  mode: "create" | "edit";
  roleId?: string;
  isSystem?: boolean;
  permissions: PermissionOption[];
  defaultValues?: Partial<RoleInput>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<RoleInput>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      label: defaultValues?.label ?? "",
      description: defaultValues?.description ?? "",
      permissionIds: defaultValues?.permissionIds ?? [],
    },
  });

  const grouped = Object.keys(PERMISSION_GROUPS).map((group) => ({
    group: group as PermissionGroup,
    label: PERMISSION_GROUPS[group as PermissionGroup],
    items: permissions.filter((p) => p.group === group),
  }));

  function onSubmit(values: RoleInput) {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createRoleAction(values)
          : await updateRoleAction(roleId!, values);
      if (result?.error) toast.error(result.error);
    });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-3xl flex-col gap-6"
      >
        <Card className="grid gap-5 p-6 sm:grid-cols-2">
          <TextField<RoleInput>
            name="label"
            label="الاسم المعروض"
            required
            placeholder="مثال: مستشار"
          />
          <TextField<RoleInput>
            name="name"
            label="المعرّف (إنجليزي)"
            required
            dir="ltr"
            placeholder="consultant"
            description={
              isSystem ? "دور نظامي — لا يمكن تغيير المعرّف." : undefined
            }
          />
          <TextField<RoleInput>
            name="description"
            label="الوصف"
            placeholder="وصف مختصر للدور"
            className="sm:col-span-2"
          />
        </Card>

        <Card className="gap-5 p-6">
          <div>
            <Label>الصلاحيات</Label>
            <p className="mt-1 text-xs text-muted-foreground">
              اختر الصلاحيات الممنوحة لهذا الدور.
            </p>
          </div>

          <Controller
            control={form.control}
            name="permissionIds"
            render={({ field }) => {
              const selected = new Set(field.value ?? []);
              const toggle = (id: string, checked: boolean) => {
                const next = new Set(selected);
                if (checked) next.add(id);
                else next.delete(id);
                field.onChange(Array.from(next));
              };
              const toggleGroup = (ids: string[], checked: boolean) => {
                const next = new Set(selected);
                ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
                field.onChange(Array.from(next));
              };

              return (
                <div className="flex flex-col gap-5">
                  {grouped.map((g) => {
                    if (g.items.length === 0) return null;
                    const ids = g.items.map((i) => i.id);
                    const allChecked = ids.every((id) => selected.has(id));
                    return (
                      <div
                        key={g.group}
                        className="rounded-lg border bg-muted/20 p-4"
                      >
                        <label className="flex cursor-pointer items-center gap-2.5 pb-3">
                          <Checkbox
                            checked={allChecked}
                            onCheckedChange={(c) => toggleGroup(ids, !!c)}
                          />
                          <span className="text-sm font-semibold">
                            {g.label}
                          </span>
                        </label>
                        <div className="grid gap-2 ps-1 sm:grid-cols-2">
                          {g.items.map((p) => (
                            <label
                              key={p.id}
                              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-background"
                            >
                              <Checkbox
                                checked={selected.has(p.id)}
                                onCheckedChange={(c) => toggle(p.id, !!c)}
                              />
                              <span className="text-sm">{p.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        </Card>

        <div className="flex items-center gap-2">
          <SubmitButton pending={pending}>
            {mode === "create" ? "إنشاء الدور" : "حفظ التغييرات"}
          </SubmitButton>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/roles")}
            disabled={pending}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

import { z } from "zod";

export const roleSchema = z.object({
  name: z
    .string()
    .min(2, "المعرّف مطلوب")
    .regex(/^[a-z0-9-]+$/, "أحرف إنجليزية صغيرة وأرقام وشرطات فقط"),
  label: z.string().min(2, "الاسم المعروض مطلوب"),
  description: z.string().max(255).optional().or(z.literal("")),
  permissionIds: z.array(z.string()),
});

export type RoleInput = z.infer<typeof roleSchema>;

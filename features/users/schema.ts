import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  isActive: z.boolean(),
  roleIds: z.array(z.string()),
});

export const userUpdateSchema = userCreateSchema.extend({
  // Empty string means "keep current password".
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .or(z.literal("")),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

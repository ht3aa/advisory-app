import { z } from "zod";

export const requestSubmitSchema = z.object({
  fullName: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().max(30).optional().or(z.literal("")),
  organization: z.string().max(120).optional().or(z.literal("")),
  serviceKey: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "الموضوع مطلوب"),
  message: z.string().min(10, "يرجى كتابة تفاصيل كافية (10 أحرف على الأقل)"),
});

export type RequestSubmitInput = z.infer<typeof requestSubmitSchema>;

export const answerSchema = z.object({
  body: z.string().min(2, "نص الرد مطلوب"),
});

export type AnswerInput = z.infer<typeof answerSchema>;

export const REQUEST_STATUSES = [
  "NEW",
  "IN_REVIEW",
  "ANSWERED",
  "CLOSED",
] as const;

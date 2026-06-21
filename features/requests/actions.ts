"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/dal";
import { sendRequestAnswer } from "@/lib/mail";
import {
  requestSubmitSchema,
  answerSchema,
  REQUEST_STATUSES,
} from "./schema";

export type ActionResult = { error?: string; success?: string };

function generateReferenceNo() {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AO-${ymd}-${rand}`;
}

export type SubmitState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  referenceNo?: string;
};

/** Public action — no auth required. */
export async function submitRequestAction(
  _prev: SubmitState | undefined,
  formData: FormData
): Promise<SubmitState> {
  const parsed = requestSubmitSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    organization: formData.get("organization"),
    serviceKey: formData.get("serviceKey"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  // Retry once on the unlikely referenceNo collision.
  let referenceNo = generateReferenceNo();
  for (let attempt = 0; attempt < 3; attempt++) {
    const exists = await prisma.consultantRequest.findUnique({
      where: { referenceNo },
      select: { id: true },
    });
    if (!exists) break;
    referenceNo = generateReferenceNo();
  }

  await prisma.consultantRequest.create({
    data: {
      referenceNo,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      serviceKey: data.serviceKey || null,
      subject: data.subject,
      message: data.message,
    },
  });

  revalidatePath("/admin/requests");
  return { referenceNo };
}

export async function assignRequestAction(
  id: string,
  assignedToId: string | null
): Promise<ActionResult> {
  await requirePermission("requests.assign");

  const request = await prisma.consultantRequest.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!request) return { error: "الطلب غير موجود." };

  await prisma.consultantRequest.update({
    where: { id },
    data: {
      assignedToId,
      // Move a new request into review when it gets an owner.
      status:
        assignedToId && request.status === "NEW"
          ? "IN_REVIEW"
          : request.status,
    },
  });

  revalidatePath(`/admin/requests/${id}`);
  revalidatePath("/admin/requests");
  return { success: assignedToId ? "تم إسناد الطلب." : "تم إلغاء الإسناد." };
}

export async function updateStatusAction(
  id: string,
  status: string
): Promise<ActionResult> {
  await requirePermission("requests.answer");

  if (!REQUEST_STATUSES.includes(status as (typeof REQUEST_STATUSES)[number])) {
    return { error: "حالة غير صالحة." };
  }

  await prisma.consultantRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/admin/requests/${id}`);
  revalidatePath("/admin/requests");
  return { success: "تم تحديث الحالة." };
}

export async function answerRequestAction(
  id: string,
  body: string
): Promise<ActionResult> {
  const current = await requirePermission("requests.answer");

  const parsed = answerSchema.safeParse({ body });
  if (!parsed.success) return { error: "نص الرد مطلوب." };

  const request = await prisma.consultantRequest.findUnique({
    where: { id },
    select: {
      email: true,
      fullName: true,
      subject: true,
      referenceNo: true,
    },
  });
  if (!request) return { error: "الطلب غير موجود." };

  const mailResult = await sendRequestAnswer({
    to: request.email,
    requesterName: request.fullName,
    referenceNo: request.referenceNo,
    subject: request.subject,
    answer: parsed.data.body,
  });

  await prisma.$transaction([
    prisma.requestResponse.create({
      data: {
        requestId: id,
        authorId: current.id,
        body: parsed.data.body,
        emailedAt: mailResult.ok ? new Date() : null,
      },
    }),
    prisma.consultantRequest.update({
      where: { id },
      data: { status: "ANSWERED" },
    }),
  ]);

  revalidatePath(`/admin/requests/${id}`);
  revalidatePath("/admin/requests");
  return { success: "تم إرسال الرد وإشعار مقدّم الطلب عبر البريد." };
}

export async function deleteRequestAction(id: string): Promise<ActionResult> {
  await requirePermission("requests.delete");

  await prisma.consultantRequest.delete({ where: { id } });

  revalidatePath("/admin/requests");
  return { success: "تم حذف الطلب." };
}

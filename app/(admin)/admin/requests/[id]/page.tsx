import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requirePermission, can } from "@/lib/dal";
import { formatDateTime } from "@/lib/format";
import { services } from "@/features/services/services.data";
import { PageHeader } from "@/components/admin/page-header";
import {
  AnswerPanel,
  type RequestDetail,
} from "@/features/requests/answer-panel";
import type { RequestStatus } from "@/components/admin/status-badge";

export const metadata: Metadata = { title: "معالجة طلب" };

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("requests.view");
  const { id } = await params;

  const [canAssign, canAnswer, request, staff] = await Promise.all([
    can("requests.assign"),
    can("requests.answer"),
    prisma.consultantRequest.findUnique({
      where: { id },
      include: {
        responses: {
          orderBy: { createdAt: "asc" },
          include: { author: { select: { name: true } } },
        },
      },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!request) notFound();

  const detail: RequestDetail = {
    id: request.id,
    referenceNo: request.referenceNo,
    fullName: request.fullName,
    email: request.email,
    phone: request.phone,
    organization: request.organization,
    serviceTitle: request.serviceKey
      ? services.find((s) => s.id === request.serviceKey)?.title ?? "خدمة غير محددة"
      : "خدمة غير محددة",
    subject: request.subject,
    message: request.message,
    status: request.status as RequestStatus,
    assignedToId: request.assignedToId,
    createdAt: formatDateTime(request.createdAt),
    responses: request.responses.map((r) => ({
      id: r.id,
      body: r.body,
      authorName: r.author?.name ?? "مستخدم محذوف",
      emailedAt: r.emailedAt ? formatDateTime(r.emailedAt) : null,
      createdAt: formatDateTime(r.createdAt),
    })),
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`الطلب ${request.referenceNo}`}
        description="مراجعة الطلب وإسناده والرد عليه."
        breadcrumbs={[
          { label: "طلبات الاستشارة", href: "/admin/requests" },
          { label: request.referenceNo },
        ]}
      />
      <AnswerPanel
        request={detail}
        staff={staff}
        canAssign={canAssign}
        canAnswer={canAnswer}
      />
    </div>
  );
}

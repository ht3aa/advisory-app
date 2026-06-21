import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { requirePermission, can } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { RequestsTable } from "@/features/requests/requests-table";
import type { RequestStatus } from "@/components/admin/status-badge";

export const metadata: Metadata = { title: "طلبات الاستشارة" };

export default async function RequestsPage() {
  await requirePermission("requests.view");
  const [canAnswer, canDelete] = await Promise.all([
    can("requests.answer"),
    can("requests.delete"),
  ]);

  const requests = await prisma.consultantRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignedTo: { select: { name: true } } },
  });

  const rows = requests.map((r) => ({
    id: r.id,
    referenceNo: r.referenceNo,
    fullName: r.fullName,
    email: r.email,
    serviceKey: r.serviceKey,
    subject: r.subject,
    status: r.status as RequestStatus,
    assignedToName: r.assignedTo?.name ?? null,
    createdAt: formatDate(r.createdAt),
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="طلبات الاستشارة"
        description="جميع طلبات الاستشارة الواردة من الموقع."
      />
      <RequestsTable data={rows} canAnswer={canAnswer} canDelete={canDelete} />
    </div>
  );
}

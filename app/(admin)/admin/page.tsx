import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Inbox,
  ShieldCheck,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/dal";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { Card } from "@/components/ui/card";
import { StatusBadge, type RequestStatus } from "@/components/admin/status-badge";

export const metadata: Metadata = { title: "لوحة التحكم" };

export default async function DashboardPage() {
  const user = await requireUser();
  const [canRequests, canUsers, canRoles] = await Promise.all([
    can("requests.view"),
    can("users.view"),
    can("roles.view"),
  ]);

  const [statusCounts, totalRequests, recent, userCount, roleCount] =
    await Promise.all([
      canRequests
        ? prisma.consultantRequest.groupBy({
            by: ["status"],
            _count: { _all: true },
          })
        : Promise.resolve([]),
      canRequests ? prisma.consultantRequest.count() : Promise.resolve(0),
      canRequests
        ? prisma.consultantRequest.findMany({
            orderBy: { createdAt: "desc" },
            take: 6,
            include: { assignedTo: { select: { name: true } } },
          })
        : Promise.resolve([]),
      canUsers ? prisma.user.count() : Promise.resolve(0),
      canRoles ? prisma.role.count() : Promise.resolve(0),
    ]);

  const countFor = (status: RequestStatus) =>
    statusCounts.find((s) => s.status === status)?._count._all ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`مرحبًا، ${user.name}`}
        description="نظرة عامة على نشاط المكتب الاستشاري."
      />

      {canRequests && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="إجمالي الطلبات"
            value={totalRequests}
            icon={ClipboardList}
            accent
          />
          <StatCard label="جديدة" value={countFor("NEW")} icon={Inbox} />
          <StatCard
            label="قيد المراجعة"
            value={countFor("IN_REVIEW")}
            icon={Clock}
          />
          <StatCard
            label="تمت الإجابة"
            value={countFor("ANSWERED")}
            icon={CheckCircle2}
          />
        </div>
      )}

      {(canUsers || canRoles) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {canUsers && (
            <StatCard label="المستخدمون" value={userCount} icon={Users} />
          )}
          {canRoles && (
            <StatCard label="الأدوار" value={roleCount} icon={ShieldCheck} />
          )}
        </div>
      )}

      {canRequests && (
        <Card className="gap-0 p-0">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="font-semibold text-foreground">أحدث الطلبات</h2>
            <Link
              href="/admin/requests"
              className="text-sm text-primary hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              لا توجد طلبات بعد.
            </p>
          ) : (
            <ul className="divide-y">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/admin/requests/${r.id}`}
                    className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {r.subject}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.fullName} · {formatDate(r.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="label-mono hidden text-muted-foreground sm:inline">
                        {r.referenceNo}
                      </span>
                      <StatusBadge status={r.status as RequestStatus} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {!canRequests && !canUsers && !canRoles && (
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            لا توجد لديك صلاحيات لعرض البيانات. تواصل مع مدير النظام.
          </p>
        </Card>
      )}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Inbox } from "lucide-react";

import { DataTable } from "@/components/admin/data-table";
import { EmptyState } from "@/components/admin/empty-state";
import { getRequestColumns, type RequestRow } from "./columns";

export function RequestsTable({
  data,
  canAnswer,
  canDelete,
}: {
  data: RequestRow[];
  canAnswer: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();

  const columns = useMemo(
    () => getRequestColumns({ canAnswer, canDelete }),
    [canAnswer, canDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="بحث في الطلبات..."
      onRowClick={(row) => router.push(`/admin/requests/${row.id}`)}
      emptyState={
        <EmptyState
          icon={Inbox}
          title="لا توجد طلبات"
          description="ستظهر طلبات الاستشارة الواردة هنا."
        />
      }
    />
  );
}

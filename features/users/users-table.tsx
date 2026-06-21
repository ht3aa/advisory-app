"use client";

import { useMemo } from "react";
import { Users } from "lucide-react";

import { DataTable } from "@/components/admin/data-table";
import { EmptyState } from "@/components/admin/empty-state";
import { getUserColumns, type UserRow } from "./columns";

export function UsersTable({
  data,
  canUpdate,
  canDelete,
  currentUserId,
}: {
  data: UserRow[];
  canUpdate: boolean;
  canDelete: boolean;
  currentUserId: string;
}) {
  const columns = useMemo(
    () => getUserColumns({ canUpdate, canDelete, currentUserId }),
    [canUpdate, canDelete, currentUserId]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="بحث عن مستخدم..."
      emptyState={
        <EmptyState
          icon={Users}
          title="لا يوجد مستخدمون"
          description="ابدأ بإضافة مستخدم جديد لإدارة النظام."
        />
      }
    />
  );
}

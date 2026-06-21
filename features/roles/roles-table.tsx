"use client";

import { useMemo } from "react";
import { ShieldCheck } from "lucide-react";

import { DataTable } from "@/components/admin/data-table";
import { EmptyState } from "@/components/admin/empty-state";
import { getRoleColumns, type RoleRow } from "./columns";

export function RolesTable({
  data,
  canUpdate,
  canDelete,
}: {
  data: RoleRow[];
  canUpdate: boolean;
  canDelete: boolean;
}) {
  const columns = useMemo(
    () => getRoleColumns({ canUpdate, canDelete }),
    [canUpdate, canDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="بحث عن دور..."
      emptyState={
        <EmptyState
          icon={ShieldCheck}
          title="لا توجد أدوار"
          description="أنشئ دورًا جديدًا وحدد صلاحياته."
        />
      }
    />
  );
}

"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deleteRoleAction } from "./actions";

export type RoleRow = {
  id: string;
  name: string;
  label: string;
  description: string | null;
  isSystem: boolean;
  permissionCount: number;
  userCount: number;
};

export function getRoleColumns(opts: {
  canUpdate: boolean;
  canDelete: boolean;
}): ColumnDef<RoleRow>[] {
  return [
    {
      accessorKey: "label",
      header: "الدور",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-foreground">
            {row.original.label}
            {row.original.isSystem && (
              <Badge variant="outline" className="text-[10px]">
                نظامي
              </Badge>
            )}
          </span>
          <span dir="ltr" className="text-xs text-muted-foreground">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "الوصف",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.description || "—"}
        </span>
      ),
    },
    {
      accessorKey: "permissionCount",
      header: "الصلاحيات",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.permissionCount}</Badge>
      ),
    },
    {
      accessorKey: "userCount",
      header: "المستخدمون",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.userCount}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <RoleRowActions role={row.original} {...opts} />,
    },
  ];
}

function RoleRowActions({
  role,
  canUpdate,
  canDelete,
}: {
  role: RoleRow;
  canUpdate: boolean;
  canDelete: boolean;
}) {
  if (!canUpdate && !canDelete) return null;
  const deletable = canDelete && !role.isSystem && role.userCount === 0;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canUpdate && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/roles/${role.id}/edit`}>
                <Pencil className="size-4" />
                تعديل
              </Link>
            </DropdownMenuItem>
          )}
          {deletable && (
            <>
              <DropdownMenuSeparator />
              <ConfirmDialog
                title="حذف الدور"
                description={`سيتم حذف دور "${role.label}" نهائيًا.`}
                confirmLabel="حذف"
                onConfirm={() => deleteRoleAction(role.id)}
                trigger={
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </DropdownMenuItem>
                }
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

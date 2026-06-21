"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import {
  deleteUserAction,
  toggleUserActiveAction,
} from "./actions";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  roles: { label: string }[];
  createdAt: string;
};

export function getUserColumns(opts: {
  canUpdate: boolean;
  canDelete: boolean;
  currentUserId: string;
}): ColumnDef<UserRow>[] {
  return [
    {
      accessorKey: "name",
      header: "الاسم",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
      cell: ({ row }) => (
        <span dir="ltr" className="text-muted-foreground">
          {row.original.email}
        </span>
      ),
    },
    {
      id: "roles",
      header: "الأدوار",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.roles.length > 0 ? (
            row.original.roles.map((r, i) => (
              <Badge key={i} variant="secondary">
                {r.label}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "الحالة",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant="accent">مفعّل</Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            معطّل
          </Badge>
        ),
    },
    {
      accessorKey: "createdAt",
      header: "تاريخ الإنشاء",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.createdAt}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <UserRowActions user={row.original} {...opts} />
      ),
    },
  ];
}

function UserRowActions({
  user,
  canUpdate,
  canDelete,
  currentUserId,
}: {
  user: UserRow;
  canUpdate: boolean;
  canDelete: boolean;
  currentUserId: string;
}) {
  const isSelf = user.id === currentUserId;

  if (!canUpdate && !canDelete) return null;

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
            <>
              <DropdownMenuItem asChild>
                <Link href={`/admin/users/${user.id}/edit`}>
                  <Pencil className="size-4" />
                  تعديل
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isSelf}
                onSelect={async () => {
                  const res = await toggleUserActiveAction(user.id);
                  if (res?.error) toast.error(res.error);
                  else if (res?.success) toast.success(res.success);
                }}
              >
                <Power className="size-4" />
                {user.isActive ? "تعطيل" : "تفعيل"}
              </DropdownMenuItem>
            </>
          )}
          {canDelete && !isSelf && (
            <>
              <DropdownMenuSeparator />
              <ConfirmDialog
                title="حذف المستخدم"
                description={`سيتم حذف "${user.name}" نهائيًا.`}
                confirmLabel="حذف"
                onConfirm={() => deleteUserAction(user.id)}
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

"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  MessageSquareReply,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  StatusBadge,
  type RequestStatus,
} from "@/components/admin/status-badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { services } from "@/features/services/services.data";
import { deleteRequestAction } from "./actions";

const serviceTitle = (key: string | null) =>
  key ? services.find((s) => s.id === key)?.title ?? "—" : "—";

export type RequestRow = {
  id: string;
  referenceNo: string;
  fullName: string;
  email: string;
  serviceKey: string | null;
  subject: string;
  status: RequestStatus;
  assignedToName: string | null;
  createdAt: string;
};

export function getRequestColumns(opts: {
  canAnswer: boolean;
  canDelete: boolean;
}): ColumnDef<RequestRow>[] {
  return [
    {
      accessorKey: "referenceNo",
      header: "الرقم المرجعي",
      cell: ({ row }) => (
        <Link
          href={`/admin/requests/${row.original.id}`}
          onClick={(e) => e.stopPropagation()}
          className="label-mono text-primary hover:underline"
        >
          {row.original.referenceNo}
        </Link>
      ),
    },
    {
      accessorKey: "subject",
      header: "الموضوع",
      cell: ({ row }) => (
        <div className="flex max-w-xs flex-col">
          <span className="truncate font-medium text-foreground">
            {row.original.subject}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {serviceTitle(row.original.serviceKey)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "fullName",
      header: "مقدّم الطلب",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm text-foreground">{row.original.fullName}</span>
          <span dir="ltr" className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "الحالة",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "assigned",
      header: "المسؤول",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.assignedToName ?? "غير مُسند"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "التاريخ",
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
        <div
          className="flex items-center justify-end gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {opts.canAnswer && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/requests/${row.original.id}#answer`}>
                <MessageSquareReply className="size-4" />
                الرد
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/requests/${row.original.id}`}>
                  <Eye className="size-4" />
                  عرض ومعالجة
                </Link>
              </DropdownMenuItem>
              {opts.canDelete && (
                <>
                  <DropdownMenuSeparator />
                  <ConfirmDialog
                    title="حذف الطلب"
                    description={`سيتم حذف الطلب "${row.original.referenceNo}" نهائيًا.`}
                    confirmLabel="حذف"
                    onConfirm={() => deleteRequestAction(row.original.id)}
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
      ),
    },
  ];
}

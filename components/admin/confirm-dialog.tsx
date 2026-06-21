"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type ActionResult = void | { error?: string; success?: string };

export function ConfirmDialog({
  trigger,
  title = "تأكيد الإجراء",
  description = "هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.",
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  destructive = true,
  onConfirm,
}: {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => Promise<ActionResult>;
}) {
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if (result && "error" in result && result.error) {
        toast.error(result.error);
        return;
      }
      if (result && "success" in result && result.success) {
        toast.success(result.success);
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={pending}
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            {confirmLabel}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={pending}>
              {cancelLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

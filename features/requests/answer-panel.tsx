"use client";

import { useState, useTransition } from "react";
import {
  CalendarDays,
  Loader2,
  Mail,
  MailCheck,
  Phone,
  Send,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StatusBadge,
  REQUEST_STATUS_META,
  type RequestStatus,
} from "@/components/admin/status-badge";
import {
  assignRequestAction,
  answerRequestAction,
  updateStatusAction,
} from "./actions";

const UNASSIGNED = "__none__";

export type RequestDetail = {
  id: string;
  referenceNo: string;
  fullName: string;
  email: string;
  phone: string | null;
  organization: string | null;
  serviceTitle: string;
  subject: string;
  message: string;
  status: RequestStatus;
  assignedToId: string | null;
  createdAt: string;
  responses: {
    id: string;
    body: string;
    authorName: string;
    emailedAt: string | null;
    createdAt: string;
  }[];
};

export function AnswerPanel({
  request,
  staff,
  canAssign,
  canAnswer,
}: {
  request: RequestDetail;
  staff: { id: string; name: string }[];
  canAssign: boolean;
  canAnswer: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [answer, setAnswer] = useState("");

  function handleAssign(value: string) {
    startTransition(async () => {
      const res = await assignRequestAction(
        request.id,
        value === UNASSIGNED ? null : value
      );
      if (res?.error) toast.error(res.error);
      else if (res?.success) toast.success(res.success);
    });
  }

  function handleStatus(value: string) {
    startTransition(async () => {
      const res = await updateStatusAction(request.id, value);
      if (res?.error) toast.error(res.error);
      else if (res?.success) toast.success(res.success);
    });
  }

  function handleAnswer() {
    if (!answer.trim()) {
      toast.error("الرجاء كتابة نص الرد.");
      return;
    }
    startTransition(async () => {
      const res = await answerRequestAction(request.id, answer);
      if (res?.error) {
        toast.error(res.error);
      } else if (res?.success) {
        toast.success(res.success);
        setAnswer("");
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-6">
        <Card className="gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {request.subject}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {request.serviceTitle}
              </p>
            </div>
            <StatusBadge status={request.status} />
          </div>
          <Separator />
          <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
            {request.message}
          </p>
        </Card>

        <Card className="gap-4 p-6">
          <h3 className="font-semibold text-foreground">الردود</h3>
          {request.responses.length === 0 ? (
            <p className="text-sm text-muted-foreground">لا توجد ردود بعد.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {request.responses.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border bg-muted/20 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <User className="size-3.5" />
                      {r.authorName}
                    </span>
                    <span>{r.createdAt}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                    {r.body}
                  </p>
                  {r.emailedAt && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-ips-green">
                      <MailCheck className="size-3.5" />
                      أُرسل عبر البريد · {r.emailedAt}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          {canAnswer && (
            <>
              <Separator />
              <div id="answer" className="flex scroll-mt-24 flex-col gap-3">
                <Label htmlFor="answer">كتابة رد</Label>
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                  placeholder="اكتب ردك على الطلب..."
                  disabled={pending}
                />
                <Button
                  onClick={handleAnswer}
                  disabled={pending}
                  className="w-full sm:w-auto"
                >
                  {pending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  إرسال الرد وإشعار مقدّم الطلب
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="gap-4 p-6">
          <h3 className="font-semibold text-foreground">بيانات مقدّم الطلب</h3>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <User className="size-4 text-muted-foreground" />
              <span className="text-foreground">{request.fullName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 text-muted-foreground" />
              <span dir="ltr" className="text-foreground">
                {request.email}
              </span>
            </div>
            {request.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-muted-foreground" />
                <span dir="ltr" className="text-foreground">
                  {request.phone}
                </span>
              </div>
            )}
            {request.organization && (
              <div className="text-muted-foreground">
                الجهة: {request.organization}
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">{request.createdAt}</span>
            </div>
            <div className="label-mono pt-1 text-muted-foreground">
              {request.referenceNo}
            </div>
          </dl>
        </Card>

        <Card className="gap-5 p-6">
          <h3 className="font-semibold text-foreground">المعالجة</h3>

          <div className="flex flex-col gap-2">
            <Label>الحالة</Label>
            <Select
              defaultValue={request.status}
              onValueChange={handleStatus}
              disabled={!canAnswer || pending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.keys(REQUEST_STATUS_META) as RequestStatus[]
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {REQUEST_STATUS_META[s].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>المسؤول</Label>
            <Select
              defaultValue={request.assignedToId ?? UNASSIGNED}
              onValueChange={handleAssign}
              disabled={!canAssign || pending}
            >
              <SelectTrigger>
                <SelectValue placeholder="غير مُسند" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UNASSIGNED}>غير مُسند</SelectItem>
                {staff.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </div>
  );
}

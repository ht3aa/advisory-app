"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { services } from "@/features/services/services.data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitRequestAction, type SubmitState } from "./actions";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-xs text-destructive">{messages[0]}</p>;
}

export function SubmitForm({ defaultServiceKey }: { defaultServiceKey?: string }) {
  const [state, action, pending] = useActionState<
    SubmitState | undefined,
    FormData
  >(submitRequestAction, undefined);

  if (state?.referenceNo) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-card p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            تم استلام طلبك بنجاح
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            سيتواصل معك فريق المكتب الاستشاري عبر البريد الإلكتروني. يرجى الاحتفاظ
            بالرقم المرجعي:
          </p>
          <p className="label-mono mt-4 inline-block rounded-md border border-border bg-muted px-4 py-2 text-base text-foreground">
            {state.referenceNo}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">العودة إلى الموقع</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      {state?.error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">الاسم الكامل *</Label>
          <Input id="fullName" name="fullName" placeholder="الاسم" />
          <FieldError messages={state?.fieldErrors?.fullName} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            placeholder="you@example.com"
          />
          <FieldError messages={state?.fieldErrors?.email} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input id="phone" name="phone" dir="ltr" placeholder="07XXXXXXXXX" />
          <FieldError messages={state?.fieldErrors?.phone} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="organization">الجهة / المؤسسة</Label>
          <Input
            id="organization"
            name="organization"
            placeholder="اسم الجهة"
          />
          <FieldError messages={state?.fieldErrors?.organization} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="serviceKey">الخدمة المطلوبة</Label>
        <select
          id="serviceKey"
          name="serviceKey"
          defaultValue={defaultServiceKey ?? ""}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30"
        >
          <option value="">— اختر الخدمة —</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">الموضوع *</Label>
        <Input id="subject" name="subject" placeholder="موضوع الاستشارة" />
        <FieldError messages={state?.fieldErrors?.subject} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">تفاصيل الطلب *</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="اشرح طلبك أو القضية التقنية بالتفصيل..."
        />
        <FieldError messages={state?.fieldErrors?.message} />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        إرسال الطلب
      </Button>
    </form>
  );
}

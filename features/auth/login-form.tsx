"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "./actions";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined
  );

  return (
    <form action={action} className="flex flex-col gap-5">
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}

      {state?.error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="admin@syndicate.iq"
          aria-invalid={!!state?.fieldErrors?.email}
        />
        {state?.fieldErrors?.email && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          dir="ltr"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={!!state?.fieldErrors?.password}
        />
        {state?.fieldErrors?.password && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.password[0]}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LogIn className="size-4" />
        )}
        تسجيل الدخول
      </Button>
    </form>
  );
}

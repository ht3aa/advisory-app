"use client";

import { useState, useTransition } from "react";
import { Loader2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createDemoUserAction } from "@/features/auth/actions";

export function CreateDemoUserButton() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>();

  function handleClick() {
    setMessage(undefined);
    startTransition(async () => {
      const result = await createDemoUserAction();
      if (result.error) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      if (result.success) {
        setMessage({ type: "success", text: result.success });
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        size="lg"
        variant="outline"
        disabled={pending}
        onClick={handleClick}
        className="border-ips-white/25 bg-transparent text-ips-white hover:border-ips-white/40 hover:bg-ips-white/10 hover:text-ips-white"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <UserPlus className="size-4" />
        )}
        إنشاء مستخدم تجريبي
      </Button>
      {message ? (
        <p
          className={
            message.type === "success"
              ? "text-sm text-ips-emerald"
              : "text-sm text-red-300"
          }
        >
          {message.text}
        </p>
      ) : null}
    </div>
  );
}

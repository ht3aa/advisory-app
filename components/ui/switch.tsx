"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-150 ease-ips outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-ips-emerald data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-ips-white shadow-sm ring-0 transition-transform duration-150 ease-ips",
          // Direction-aware travel: correct in RTL (default) and LTR
          "data-[state=unchecked]:translate-x-0",
          "ltr:data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

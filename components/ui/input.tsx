import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-[var(--radius-ips)] border border-input bg-background px-3 py-1 text-sm transition-[color,border-color,box-shadow] duration-150 ease-ips outline-none",
        "placeholder:text-muted-foreground selection:bg-ips-emerald/25",
        "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "hover:border-ips-gray/60",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  );
}

export { Input };

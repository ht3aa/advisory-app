import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-[var(--radius-ips)] border border-input bg-background px-3 py-2 text-sm leading-relaxed transition-[color,border-color,box-shadow] duration-150 ease-ips outline-none",
        "placeholder:text-muted-foreground selection:bg-ips-emerald/25 field-sizing-content",
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

export { Textarea };

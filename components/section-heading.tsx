import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="label-mono flex items-center gap-2 text-primary">
          <span aria-hidden className="font-mono text-base leading-none">
            /
          </span>
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-h2 text-foreground">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-balance text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

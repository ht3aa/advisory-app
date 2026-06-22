import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

type MessageContentProps = {
  content: string;
  variant: "user" | "assistant";
};

export function MessageContent({ content, variant }: MessageContentProps) {
  if (variant === "user") {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        h1: ({ children }) => (
          <p className="mb-2 mt-3 text-sm font-semibold first:mt-0">{children}</p>
        ),
        h2: ({ children }) => (
          <p className="mb-2 mt-3 text-sm font-semibold first:mt-0">{children}</p>
        ),
        h3: ({ children }) => (
          <p className="mb-1.5 mt-2.5 text-sm font-semibold first:mt-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        ol: ({ children }) => (
          <ol className="my-2 list-decimal space-y-1.5 ps-4">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1.5 ps-4">{children}</ul>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary underline underline-offset-2 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded bg-background/60 px-1 py-0.5 font-mono text-[0.8125rem]">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function messageBubbleClass(role: "user" | "assistant") {
  return cn(
    "max-w-[95%] rounded-[var(--radius-lg)] px-3 py-2.5 text-sm",
    role === "user"
      ? "ms-auto bg-ips-green text-ips-white"
      : "me-auto bg-secondary text-foreground"
  );
}

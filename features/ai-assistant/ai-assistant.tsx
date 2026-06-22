"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  MessageContent,
  messageBubbleClass,
} from "@/features/ai-assistant/message-content";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE =
  "مرحبًا! أنا مساعد المكتب الاستشاري. يمكنني الإجابة عن خدماتنا، منهجيتنا، وكيفية طلب استشارة. كيف يمكنني مساعدتك؟";

const PUBLIC_PATHS = ["/", "/request"];

function isPublicPath(pathname: string) {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some(
    (path) => path !== "/" && (pathname === path || pathname.startsWith(`${path}/`))
  );
}

function createId() {
  return crypto.randomUUID();
}

export function AiAssistantGate() {
  const pathname = usePathname();

  if (!isPublicPath(pathname)) return null;

  return <AiAssistant />;
}

function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: createId(), role: "assistant", content: WELCOME_MESSAGE },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "فشل إرسال الرسالة.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.message ?? "عذرًا، لم أتمكن من الرد.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 z-50 flex flex-col items-end gap-3 start-5">
      {open && (
        <div
          role="dialog"
          aria-label="المساعد الذكي"
          className="flex w-[min(100vw-2.5rem,26rem)] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-background shadow-2xl"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border bg-ips-green px-4 py-3 text-ips-white">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-[var(--radius-ips)] bg-ips-white/15">
                <Bot className="size-5 text-ips-emerald" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold">المساعد الذكي</p>
                <p className="text-xs text-ips-white/70">المكتب الاستشاري</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 text-ips-white hover:bg-ips-white/10 hover:text-ips-white"
              onClick={() => setOpen(false)}
              aria-label="إغلاق المحادثة"
            >
              <X className="size-4" />
            </Button>
          </header>

          <div
            ref={listRef}
            className="flex max-h-96 min-h-64 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={messageBubbleClass(message.role)}
              >
                <MessageContent
                  content={message.content}
                  variant={message.role}
                />
              </div>
            ))}
            {loading && (
              <div className="me-auto flex items-center gap-2 rounded-[var(--radius-lg)] bg-secondary px-3 py-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                جاري الكتابة...
              </div>
            )}
          </div>

          <div className="border-t border-border px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="اكتب سؤالك هنا..."
                disabled={loading}
                className="min-h-10 flex-1 resize-none rounded-[var(--radius-ips)] border border-input bg-background px-3 py-2 text-sm leading-relaxed outline-none transition-[border-color,box-shadow] duration-150 ease-ips placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:opacity-50"
              />
              <Button
                type="button"
                size="icon"
                variant="accent"
                onClick={() => void sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="إرسال"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              للطلبات الرسمية{" "}
              <Link href="/request" className="text-primary underline-offset-2 hover:underline">
                اطلب استشارة
              </Link>
            </p>
          </div>
        </div>
      )}

      <Button
        type="button"
        size="lg"
        variant="accent"
        className="size-14 rounded-full shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "إغلاق المساعد الذكي" : "فتح المساعد الذكي"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </div>
  );
}

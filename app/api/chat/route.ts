import { NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { getAssistantSystemPrompt } from "@/lib/ai-assistant/system-prompt";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "خدمة المساعد غير مهيأة حاليًا. يرجى المحاولة لاحقًا." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "صيغة الرسائل غير صالحة." }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 800,
      messages: [
        { role: "system", content: getAssistantSystemPrompt() },
        ...parsed.data.messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return Response.json(
        { error: "لم نتمكن من توليد رد. يرجى المحاولة مرة أخرى." },
        { status: 502 }
      );
    }

    return Response.json({ message: reply });
  } catch {
    return Response.json(
      { error: "حدث خطأ أثناء التواصل مع المساعد. يرجى المحاولة لاحقًا." },
      { status: 502 }
    );
  }
}

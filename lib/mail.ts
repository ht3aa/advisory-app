import "server-only";

/**
 * Email delivery is stubbed for now — no provider is wired up. The function
 * logs the payload and returns success so the rest of the flow (status change,
 * emailedAt timestamp, toast) works end-to-end. Swap the body for a real
 * provider (Resend / SMTP / SES) later.
 */
export async function sendRequestAnswer(args: {
  to: string;
  requesterName: string;
  referenceNo: string;
  subject: string;
  answer: string;
}): Promise<{ ok: boolean }> {
  console.log("[mail:stub] sendRequestAnswer", {
    to: args.to,
    referenceNo: args.referenceNo,
    subject: args.subject,
    preview: args.answer.slice(0, 80),
  });
  return { ok: true };
}

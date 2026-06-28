// Lightweight liveness/readiness probe for the ALB target group + k8s probes.
// No auth, no DB dependency — reflects process liveness only, so a DB blip does
// not cycle the pod. Always dynamic so it is never statically cached.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" }, { status: 200 });
}

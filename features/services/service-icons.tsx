import type { ComponentType, ReactNode, SVGProps } from "react";

/**
 * Brand line-icon set for the ten advisory services.
 *
 * Seeded by the OpenAI model (see `scripts/generate-service-icons.ts` →
 * `service-icons.generated.json`) and curated to the brand's line-art standard:
 * 24×24 grid, stroke="currentColor", 1.75 weight, round caps/joins — so each
 * icon inherits the service-card's green → white hover with zero extra styling.
 */
export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>;

function Icon({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** 01 — Software & systems consulting: a laptop with a code glyph. */
export function SoftwareConsultingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="11.5" rx="1.6" />
      <path d="M2.5 19.5h19" />
      <path d="M10 8.2 7.7 10.7 10 13.2" />
      <path d="M13.4 8.2 12 13.2" />
    </Icon>
  );
}

/** 02 — Digital government: a columned building with a dome and a node. */
export function DigitalGovernmentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="4.4" r="1.1" />
      <path d="M12 8.4V6" />
      <path d="M7 11a5 5 0 0 1 10 0" />
      <path d="M6 11h12" />
      <path d="M8 11.4v5.6" />
      <path d="M12 11.4v5.6" />
      <path d="M16 11.4v5.6" />
      <path d="M5.5 20h13" />
      <path d="M6.5 17h11" />
    </Icon>
  );
}

/** 03 — Audit & QA: a clipboard with a checkmark and a magnifier. */
export function AuditQaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M9 4H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6" />
      <path d="M14.5 4H15a2 2 0 0 1 2 2v3.5" />
      <rect x="9" y="2.6" width="5" height="3.2" rx="1" />
      <path d="M7.5 10h6" />
      <path d="M7.5 13h3.5" />
      <circle cx="16.5" cy="16.5" r="3.3" />
      <path d="m19 19 2 2" />
    </Icon>
  );
}

/** 04 — Feasibility studies: a document with a bar chart. */
export function FeasibilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
      <path d="M13 3v6h6" />
      <path d="M8.5 17.5h7" />
      <path d="M9.5 17.5v-2.5" />
      <path d="M12 17.5v-4.5" />
      <path d="M14.5 17.5v-3.5" />
    </Icon>
  );
}

/** 05 — Data & infrastructure: a stacked database cylinder. */
export function DataInfrastructureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </Icon>
  );
}

/** 06 — Cybersecurity: a shield enclosing a padlock. */
export function CybersecurityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 2.5 5 5.3V11c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V5.3z" />
      <rect x="9.3" y="11.2" width="5.4" height="4.3" rx="0.9" />
      <path d="M10.4 11.2v-1.3a1.6 1.6 0 0 1 3.2 0v1.3" />
    </Icon>
  );
}

/** 07 — Tenders & contracts: a document with a signature. */
export function TendersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 10h4" />
      <path d="M8 13h8" />
      <path d="M8 17c1-1.3 2-1.3 3 0s2 1.3 3 0" />
    </Icon>
  );
}

/** 08 — Project supervision: a hard hat. */
export function SupervisionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5 16a7 7 0 0 1 14 0" />
      <path d="M12 9V16" />
      <path d="M8.8 16v-4.6" />
      <path d="M15.2 16v-4.6" />
      <rect x="3" y="16" width="18" height="2.8" rx="1" />
    </Icon>
  );
}

/** 09 — Expert witness: the scales of justice. */
export function ExpertWitnessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.5v17" />
      <path d="M7.5 20.5h9" />
      <path d="M4 7.5h2.5c2 0 4.5-1 5.5-1.8 1 .8 3.5 1.8 5.5 1.8H20" />
      <path d="M5 7.5 2.5 14.5a3.5 3 0 0 0 5 0z" />
      <path d="M19 7.5 16.5 14.5a3.5 3 0 0 0 5 0z" />
    </Icon>
  );
}

/** 10 — Training & capacity: a presentation board with a graduation cap. */
export function TrainingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="11" rx="1.6" />
      <path d="M12 15v2.5" />
      <path d="M8.5 20.5 12 17.5l3.5 3" />
      <path d="M7.5 8.8 12 7l4.5 1.8L12 10.6z" />
      <path d="M16.5 8.9v2.6" />
    </Icon>
  );
}

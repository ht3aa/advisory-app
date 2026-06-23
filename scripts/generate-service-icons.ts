/**
 * Generates a cohesive set of brand line-art SVG icons for the ten advisory
 * services, using the OpenAI model. Run with the API key loaded from .env:
 *
 *   npx tsx --env-file=.env scripts/generate-service-icons.ts
 *
 * Output: features/services/service-icons.generated.json  (id -> inner SVG markup)
 * The icons are authored on a 24×24 grid, stroke="currentColor", fill="none",
 * so they drop straight into the existing service-card hover (green → white).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import OpenAI from "openai";

type IconBrief = {
  id: string;
  labelEn: string;
  concept: string;
};

const ICONS: IconBrief[] = [
  {
    id: "systems-consulting",
    labelEn: "Software Consulting",
    concept:
      "a laptop / code window with a slash-code glyph — independent software & systems consulting",
  },
  {
    id: "digital-transformation",
    labelEn: "Digital Government",
    concept:
      "a classical government building (columns + dome) paired with a digital node — e-government & digital transformation",
  },
  {
    id: "audit-qa",
    labelEn: "Audit & QA",
    concept:
      "a checklist / clipboard with a magnifier and a checkmark — systems audit, quality & security review",
  },
  {
    id: "feasibility",
    labelEn: "Feasibility Studies",
    concept:
      "a document with a small bar chart and pie slice — technical feasibility studies (risk / cost / return)",
  },
  {
    id: "infrastructure",
    labelEn: "Data & Infrastructure",
    concept:
      "stacked database cylinders linked to network nodes — databases, networks & infrastructure",
  },
  {
    id: "cybersecurity",
    labelEn: "Cybersecurity",
    concept:
      "a shield with a padlock and circuit traces — cybersecurity & information protection",
  },
  {
    id: "tenders",
    labelEn: "Tenders & Contracts",
    concept:
      "a formal document / scroll with a pen nib writing — technical specifications for tenders & contracts",
  },
  {
    id: "supervision",
    labelEn: "Project Supervision",
    concept:
      "a hard hat / safety helmet with a small check — technical supervision of project execution",
  },
  {
    id: "expert-witness",
    labelEn: "Expert Witness",
    concept:
      "balanced scales of justice — independent technical expert testimony for courts",
  },
  {
    id: "training",
    labelEn: "Training & Capacity",
    concept:
      "a presentation board / easel with a graduation cap — professional training & capacity building",
  },
];

const SYSTEM = `You are a senior icon designer producing a UNIFIED line-icon set for a premium brand.
Brand style (match exactly):
- 24×24 viewBox grid, like Lucide / Feather icons.
- Stroke-only line art. Every shape uses stroke="currentColor", fill="none".
- stroke-width="1.75", stroke-linecap="round", stroke-linejoin="round".
- Clean geometric construction, generous negative space, ~1.5–2px padding inside the 24 grid.
- Consistent visual weight across the whole set; no solid fills, no gradients, no text, no shadows.
- The brand mark is a hexagon with a 60° "/" slash. Where it reads naturally, you MAY use a small hexagon or slash accent, but never force it.
Return STRICT JSON only.`;

function buildUserPrompt() {
  const list = ICONS.map(
    (i) => `- "${i.id}" (${i.labelEn}): ${i.concept}`
  ).join("\n");
  return `Design these ten icons as one cohesive set:
${list}

Output a single JSON object whose keys are the exact ids above and whose values are STRINGS containing ONLY the inner SVG markup (the children that go inside <svg viewBox="0 0 24 24">…</svg>).
Rules for each value:
- Use only <path>, <circle>, <rect>, <line>, <polyline>, <polygon> elements.
- Do NOT include the <svg> wrapper, width/height, xmlns, <title>, comments, or attributes other than geometry + stroke-related ones.
- Do NOT set stroke/fill/stroke-width on individual elements (they inherit from the svg). Only set fill="none" is unnecessary — omit it.
- Keep each icon to a tasteful number of strokes (roughly 3–9 elements).
Return ONLY the JSON object, no markdown fences.`;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing. Run with: npx tsx --env-file=.env scripts/generate-service-icons.ts"
    );
  }

  const model = process.env.ICON_MODEL ?? "gpt-4o";
  const openai = new OpenAI({ apiKey });

  console.log(`Requesting icon set from ${model}…`);
  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: buildUserPrompt() },
    ],
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) throw new Error("Model returned an empty response.");

  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Could not parse model JSON. Raw:\n${raw}`);
  }

  const allowed = /^<(path|circle|rect|line|polyline|polygon)\b/;
  const result: Record<string, string> = {};
  for (const { id } of ICONS) {
    const body = parsed[id]?.trim();
    if (!body) {
      console.warn(`!! Missing icon for "${id}"`);
      continue;
    }
    const firstTag = body.match(/<\s*([a-z]+)/i)?.[0] ?? "";
    if (!allowed.test(firstTag.replace(/\s/g, ""))) {
      console.warn(`?? "${id}" starts with unexpected markup: ${firstTag}`);
    }
    result[id] = body;
  }

  const outPath = resolve(
    process.cwd(),
    "features/services/service-icons.generated.json"
  );
  writeFileSync(outPath, JSON.stringify(result, null, 2) + "\n", "utf8");
  console.log(`Wrote ${Object.keys(result).length} icons → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Generates ten individual, transparent-background PNG icons for the advisory
 * services using OpenAI's image model (gpt-image-2). One API call per icon, all
 * sharing an identical style brief so the set stays cohesive.
 *
 *   npx tsx --env-file=.env scripts/generate-service-icon-pngs.ts
 *
 * Output: public/generated/icons/<id>.png
 *
 * Docs: https://developers.openai.com/api/docs/models/gpt-image-2
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import OpenAI from "openai";

type IconBrief = { id: string; subject: string };

/** Shared visual language — keeps all ten renders on-brand and consistent. */
const STYLE = [
  "A single 3D rendered app icon, three-quarter isometric view, centered.",
  "Material: glossy plastic and brushed silver metal.",
  "Strict brand palette: deep Iraqi green (#0a5c36), digital emerald (#18c07a), white and silver only.",
  "Each icon includes one small emerald hexagon accent floating beside the object.",
  "Soft studio lighting, gentle contact shadow, smooth bevels, crisp and modern.",
  "Fully TRANSPARENT background (alpha), no scene, no ground plane, no frame, no text, no words, no labels.",
  "Consistent scale and consistent style across the whole set, professional fintech/enterprise icon look.",
].join(" ");

const ICONS: IconBrief[] = [
  {
    id: "systems-consulting",
    subject:
      "an open laptop displaying green code lines and a code </> glyph on its screen",
  },
  {
    id: "digital-transformation",
    subject:
      "a classical government building with a green dome, columns and a small flag",
  },
  {
    id: "audit-qa",
    subject:
      "a clipboard with a checklist of green checkmarks and a magnifying glass with a checkmark",
  },
  {
    id: "feasibility",
    subject:
      "a white document sheet showing a small green bar chart, a pie chart and a rising trend line",
  },
  {
    id: "infrastructure",
    subject:
      "a stack of database server discs connected to small network node cubes",
  },
  {
    id: "cybersecurity",
    subject:
      "a shield with a green padlock at its center and subtle circuit traces",
  },
  {
    id: "tenders",
    subject: "a formal contract document scroll with a signature and a pen",
  },
  {
    id: "supervision",
    subject: "a construction safety hard hat helmet with a small green checkmark",
  },
  {
    id: "expert-witness",
    subject: "balanced scales of justice in silver and green",
  },
  {
    id: "training",
    subject:
      "a presentation board on an easel with a graduation cap and a small chart",
  },
];

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing. Run: npx tsx --env-file=.env scripts/generate-service-icon-pngs.ts"
    );
  }

  const model = process.env.IMAGE_MODEL ?? "gpt-image-2";
  const openai = new OpenAI({ apiKey });

  const outDir = resolve(process.cwd(), "public/generated/icons");
  mkdirSync(outDir, { recursive: true });

  for (const [i, icon] of ICONS.entries()) {
    const prompt = `${STYLE}\n\nThe icon depicts: ${icon.subject}.`;
    process.stdout.write(
      `[${i + 1}/${ICONS.length}] ${icon.id} … generating with ${model}\n`
    );

    try {
      const res = await openai.images.generate({
        model,
        prompt,
        size: "1024x1024",
        background: "transparent",
        quality: "high",
        n: 1,
      });

      const item = res.data?.[0];
      const b64 = item?.b64_json;
      if (!b64) {
        console.warn(`  !! No image data returned for ${icon.id}`);
        continue;
      }

      const outPath = resolve(outDir, `${icon.id}.png`);
      writeFileSync(outPath, Buffer.from(b64, "base64"));
      console.log(`  ✓ saved ${outPath}`);
    } catch (err) {
      console.error(`  ✗ failed ${icon.id}:`, (err as Error).message);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

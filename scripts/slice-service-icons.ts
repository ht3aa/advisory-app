/**
 * Slices the transparent 10-icon sheet into ten individual square PNGs.
 *
 *   npx tsx scripts/slice-service-icons.ts
 *
 * Strategy: the icons sit in a 5×2 grid but are clustered in a middle band, so
 * a naive even grid fails. Instead we read the alpha channel and segment by
 * projection — find the 5 column bands (gaps along x) and the 2 row bands (gaps
 * along y), intersect them, tighten to each icon's alpha box, square it, and
 * export at 512×512 → public/generated/icons/<id>.png
 */
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

// The "transparent" sheet actually has a painted checkerboard (opaque), so we
// segment the clean white-background sheet by non-white "ink" pixels instead.
const SHEET = "public/generated/advisory-service-icons-white.png";
const OUT_DIR = "public/generated/icons";
const COLS = 5;
const ROWS = 2;
const OUT_SIZE = 512;
const INK = 36; // a channel must be this far below 255 to count as ink
const MIN_SIZE = 40; // ignore specks smaller than this (px)
const MAX_GAP_FILL = 10; // bridge tiny internal gaps (px)
const PAD_RATIO = 0.1; // breathing room around each icon

// Row-major order, matching the sheet layout → service ids.
const IDS = [
  "systems-consulting",
  "digital-transformation",
  "audit-qa",
  "feasibility",
  "infrastructure",
  "cybersecurity",
  "tenders",
  "supervision",
  "expert-witness",
  "training",
];

type Span = { start: number; end: number };

function groups(has: boolean[], minSize: number, maxGapFill: number): Span[] {
  const res: Span[] = [];
  let start = -1;
  let lastTrue = -1;
  for (let i = 0; i < has.length; i++) {
    if (has[i]) {
      if (start < 0) start = i;
      lastTrue = i;
    } else if (start >= 0 && i - lastTrue > maxGapFill) {
      res.push({ start, end: lastTrue });
      start = -1;
    }
  }
  if (start >= 0) res.push({ start, end: lastTrue });
  return res.filter((g) => g.end - g.start + 1 >= minSize);
}

/** Largest-N spans by length, returned in original order. */
function topSpans(spans: Span[], n: number): Span[] {
  return [...spans]
    .sort((a, b) => b.end - b.start - (a.end - a.start))
    .slice(0, n)
    .sort((a, b) => a.start - b.start);
}

async function main() {
  const sheetPath = resolve(process.cwd(), SHEET);
  const outDir = resolve(process.cwd(), OUT_DIR);
  mkdirSync(outDir, { recursive: true });

  const { data, info } = await sharp(sheetPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const ch = info.channels;
  console.log(`Sheet ${W}×${H} (${ch}ch)`);

  const solid = (x: number, y: number) => {
    const i = (y * W + x) * ch;
    return 255 - Math.min(data[i], data[i + 1], data[i + 2]) > INK;
  };

  // Column bands — project over full height.
  const colHas = new Array<boolean>(W).fill(false);
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      if (solid(x, y)) {
        colHas[x] = true;
        break;
      }
    }
  }
  const columns = topSpans(groups(colHas, MIN_SIZE, MAX_GAP_FILL), COLS);

  // Row bands — project over full width.
  const rowHas = new Array<boolean>(H).fill(false);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (solid(x, y)) {
        rowHas[y] = true;
        break;
      }
    }
  }
  const rows = topSpans(groups(rowHas, MIN_SIZE, MAX_GAP_FILL), ROWS);

  console.log(
    `Detected ${columns.length} columns, ${rows.length} rows`
  );
  if (columns.length !== COLS || rows.length !== ROWS) {
    throw new Error(
      `Expected ${COLS}×${ROWS} bands but found ${columns.length}×${rows.length}. ` +
        `Adjust ALPHA_THRESHOLD / MAX_GAP_FILL.`
    );
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const id = IDS[r * COLS + c];
      const colSpan = columns[c];
      const rowSpan = rows[r];

      // Tighten to the icon's alpha box inside this column×row rectangle.
      let minX = colSpan.end;
      let maxX = colSpan.start;
      let minY = rowSpan.end;
      let maxY = rowSpan.start;
      for (let y = rowSpan.start; y <= rowSpan.end; y++) {
        for (let x = colSpan.start; x <= colSpan.end; x++) {
          if (solid(x, y)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < minX || maxY < minY) {
        console.warn(`  !! no pixels for ${id}`);
        continue;
      }

      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      const pad = Math.round(Math.max(bw, bh) * PAD_RATIO);
      const left = Math.max(0, minX - pad);
      const top = Math.max(0, minY - pad);
      const right = Math.min(W, maxX + pad + 1);
      const bottom = Math.min(H, maxY + pad + 1);

      const outPath = resolve(outDir, `${id}.png`);
      await sharp(sheetPath)
        .ensureAlpha()
        .extract({ left, top, width: right - left, height: bottom - top })
        .resize(OUT_SIZE, OUT_SIZE, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .png()
        .toFile(outPath);

      console.log(`  ✓ ${id}  (${right - left}×${bottom - top})`);
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

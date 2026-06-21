# Brand Implementation — IPS Advisory Office

Interface rebuild against the official **Brand Identity System (Vol. 01, v1.0)**.
Routing, data fetching, server/client boundaries, API contracts, async params,
and the RBAC/auth flow are unchanged — only look, feel, and motion.

Stack: Next.js 16.2.9 (App Router, Turbopack) · React 19 · Tailwind CSS v4
(`@theme`, no config file) · shadcn/ui + Radix · lucide-react.

---

## 1. Token reference

All tokens live in `app/globals.css`. No raw hex or magic spacing in components —
only utilities and `var(--…)`.

### Palette (`@theme` → `bg-/text-/border-ips-*`)

| Token | Hex | Role |
| --- | --- | --- |
| `--color-ips-green` | `#0A5C36` | Deep Iraqi Green — institutional surface, primary |
| `--color-ips-emerald` | `#18C07A` | Digital Emerald — **scalpel**: primary CTA + focus only |
| `--color-ips-ink` | `#0B0F0D` | Ink Black — footer, deepest surface |
| `--color-ips-white` | `#FFFFFF` | Space |
| `--color-ips-silver` | `#C7CFCA` | Borders, dividers, zebra |
| `--color-ips-gray` | `#8C968F` | Muted text, captions |
| `--color-ips-green-deep` | `#073F25` | Derived deep green — hero/CTA canvas, hovers |

Composition discipline: **60% white/space · 25% green · 10% ink · 5% emerald**.
Tints are `color-mix`/opacity of these tokens (e.g. `bg-ips-green/8`), never new hex.
Gradients use v4 syntax (`bg-linear-to-*`).

Legacy `brand-*` utilities (`bg-brand-emerald`, `text-brand-bright`, …) are kept as
aliases mapped onto the `ips-*` palette, so nothing breaks; new code uses `ips-*`.

The shadcn semantic bridge (`--primary`, `--accent`, `--muted`, `--ring`, `--sidebar*`,
etc.) remains, re-pointed at the palette. `--ring` is now **emerald**.

### Typography (`next/font`, self-hosted, no FOUT)

`app/layout.tsx` loads **IBM Plex Sans** (Latin), **IBM Plex Sans Arabic**, **IBM Plex
Mono** → CSS vars `--font-plex-sans/-arabic/-mono`.

- `--font-sans` = Plex Sans → Plex Arabic fallback (Latin renders Plex Sans, Arabic
  renders Plex Arabic per-glyph).
- Weights **300 / 400 / 500 / 600 only — never 700+** (faux-bold eliminated).
- Fluid scale (`clamp`): `text-display` (~84/H1) · `text-h1` (~52) · `text-h2` (~42) ·
  `text-h3` · `text-lead` (~19 body) · `label` (14 mono).

Mono-for-data is a brand signature, applied to **numerals/IDs/timestamps/Latin labels**
via `.numeral` (tabular) and `.label-mono` (uppercase, tracked). **Arabic labels stay in
sans** — uppercasing/letter-spacing mangles Arabic shaping (deliberate bilingual call).

### Shape · motion · focus

- `--radius-ips: 6px` (→ `rounded-[var(--radius-ips)]`), scale `sm/md/lg/xl` retained.
- `--ease-ips: cubic-bezier(.2,.8,.2,1)` (→ `ease-ips`) · `--duration-micro: 150ms` ·
  `--duration-settle: 1200ms`. One curve, settle never bounce.
- Global focus: `*:focus-visible` → `0 0 0 3px color-mix(oklch, emerald 45%)`. Every
  interactive element has a visible emerald focus state.
- `prefers-reduced-motion` globally zeroes transitions, animations, and view transitions.

---

## 2. Brand signatures

| Asset | File | Notes |
| --- | --- | --- |
| **The Mark** | `components/brand/mark.tsx` | Hexagon (Round City) + central 60° slash. `currentColor`, 1:1 locked, stroke 6.25%. `variant`: `primary / reversed / black / white / silver / mono` (guideline /23). Slash never recoloured; no gradient/shadow/rotation. Server-safe. |
| **Logo wrappers** | `components/brand/logo.tsx` | `LogoMark` + `Wordmark` now consume `Mark` (back-compat exports kept). |
| **Hex-network** | `components/brand/hex-field.tsx` | SVG lattice + emerald active nodes for dark-green surfaces. Opacity **clamped ≤ 8%** (default 6%, per /27). Server-safe. |
| **Motion** | `next.config.ts` + `globals.css` | `experimental.viewTransition: true`; route-change crossfade + `ips-hero` group on `--ease-ips`; one-time `.ips-build` settle (~1.2s, /39) on hero/mark. All reduced-motion safe. |

> **Mark geometry note:** the brief said "octagon"; the brand book (p.14
> `HEXAGON HEIGHT:WIDTH 1:1.155`, p.38 "HEXAGONAL NETWORK") and the existing code are
> **hexagon**. The book wins — the mark is a hexagon.

---

## 3. Component inventory (rebuilt against tokens)

**Primitives** (`components/ui/`)
- `button` — `rounded-ips`, `ease-ips`, emerald focus, no generic shadow. Variants:
  `default` (green), **`accent` (emerald CTA — the scalpel)**, `outline` (green), `secondary`, `ghost`, `destructive`, `link`. States: default/hover/active/focus/disabled.
- `input`, `textarea`, `select` (trigger + native) — silver border, hover gray, emerald focus ring, RTL-aware, no shadow.
- `card` — 6px radius, border-defined (no shadow).
- `badge` — `default / secondary / outline / accent (emerald tonal) / level (green tonal)`.
- `table` — silver-tint zebra (`nth-child(even)`), soft `border/60`, calm green hover.
- `switch` — **emerald track**; thumb travel is **direction-aware** (`ltr:` / `rtl:`),
  fixing the previously RTL-hardcoded transform.

**Admin / app**
- `stat-card` → **Data Card** (guideline /21): big `.numeral`, sans label, optional trend
  (▲/▼), `accent` = dark-green feature variant with hex field.
- `status-badge` → brand ladder, **no default palette**: NEW = emerald tonal · IN_REVIEW =
  green tonal · ANSWERED = green filled · CLOSED = silver outline, each with a status dot.
- `app-sidebar`, `page-header`, `form-kit`, `data-table`, `empty-state` → tokenised, ≤600 weights.

**Removed brand violations:** default `blue-/amber-/emerald-*` (status-badge, users column,
submit-form success, answer-panel), all `font-bold` (700), all `bg-gradient-to-*` (→ `bg-linear`),
`shadow-xs` on cards/inputs, the ad-hoc `.bg-hex` utility (→ `HexField`).

**Page surfaces:** hero, login, CTA (deep-green canvas + `HexField` + display type),
footer (ink + hex), services (hairline grid + mono captions), process (green mono-numeral
badges), sectors/about (mono stats, border-hover), request & login forms.

**Icons:** lucide only, one outline language, default `strokeWidth` (no mixing).

---

## 4. RTL / bilingual

- `<html dir="rtl" lang="ar">` (Arabic-first). Layout already RTL; the rebuild removed the
  remaining **physical** properties (`left-*`, `right-*`, hardcoded thumb transform) in favour
  of **logical** ones (`ms/me`, `ps/pe`, `start/end`, `inset-inline`, `text-start/end`).
- The Mark and direction-neutral icons are **not** mirrored. Directional arrows
  (`ArrowLeft` = forward, `ArrowRight` = back) are already RTL-correct.
- Arabic renders in **IBM Plex Sans Arabic**; Latin/data in Plex Sans / Plex Mono.
- The switch and underline accents are written for both directions (`ltr:`/`rtl:` variants),
  so a future locale toggle mirrors cleanly.

---

## 5. Verified (next dev, Turbopack, :3000)

Light + dark surfaces, LTR-safe RTL: landing (hero/services/process/sectors/CTA/footer),
`/request` form, `/login`, `/admin` dashboard (data cards + feature tile + chips),
`/admin/requests` (table), `/admin/users` (accent badge). All routes 200, no lint/compile
errors. Screenshots captured per phase.

---

## 6. Open decisions (for you)

1. **Bilingual toggle (AR ⇄ EN).** Everything is now logical-property-clean and Plex Sans is
   loaded, so a toggle is low-effort — but real locale switching needs routing work
   (`[locale]` segment or cookie + `dir/lang` swap), a **logic change** I left out by default.
   Want it wired up?
2. **Dark mode.** `.dark` tokens exist but are never activated (public/admin are light; the
   sidebar/heroes are independently dark). Add a global theme toggle, or leave as-is?
3. **Added surfaces.** I did not add `loading.tsx` / `error.tsx` / `not-found.tsx`. Want
   branded versions (dark-green 404, skeletons on `--ease-ips`)?
4. **Dev-only note:** the Next dev-tools "Issue" badge is the cross-origin HMR warning /
   browser-automation `data-cursor-ref` injection — not in app code. Add
   `allowedDevOrigins` to silence it if desired.
5. **Auth/data:** the local `dev.db` was reseeded (admin `admin@syndicate.iq`). A stale
   session cookie against a fresh DB caused a one-time `/admin ↔ /login` redirect loop;
   resolved by re-seeding + fresh login. No code change.

# Design Rebuild Plan — IPS Advisory Office

> Interface-layer rebuild. Preserve all routing, data fetching, server/client
> boundaries, API contracts, and state. Change how it **looks, feels, and moves** —
> not what it does.

---

## Phase 0 — Audit (findings)

### Stack & wiring (confirmed)

| Concern | Finding | Status |
| --- | --- | --- |
| Next.js | `16.2.9`, App Router, Turbopack dev | ✓ |
| React | `19.2.4` (App Router uses React canary internally → `ViewTransition` available) | ✓ |
| Tailwind | v4 via `@import "tailwindcss"` in `app/globals.css`; `@tailwindcss/postcss` in `postcss.config.mjs`; **no `tailwind.config.js`** | ✓ on-spec |
| UI kit | shadcn/ui "new-york" + lucide-react + CVA + `clsx`/`tailwind-merge` | ✓ |
| Primitives | Radix (accordion, checkbox, dialog, dropdown, select, slot, switch) + `sonner` + `@tanstack/react-table` + `react-hook-form` + `zod` | ✓ |
| Data/auth | Prisma v6 + SQLite; NextAuth v5 beta; RBAC roles/permissions; `proxy.ts` (Next 16 renamed middleware) optimistic gate; `lib/dal.ts` is `server-only`, memoized via `cache()` | ✓ preserve |
| `AGENTS.md` | Points at bundled docs in `node_modules/next/dist/docs/`. Consulted: `view-transitions`, `13-fonts`, `11-css`. | ✓ |

### App Router tree

```
app/
  layout.tsx                      RSC · <html lang="ar" dir="rtl"> · Plex Arabic+Mono · metadata(ar)
  page.tsx                        RSC · landing (Header + 7 feature sections + Footer)
  globals.css                     token layer (shadcn :root hex + @theme inline + brand tokens)
  (public)/request/page.tsx       RSC · awaits searchParams: Promise<{service?}>  ✓
  (auth)/login/page.tsx           RSC · awaits searchParams: Promise<{callbackUrl?}> ✓
  (admin)/admin/layout.tsx        RSC · requireUser() → <AdminShell>
  (admin)/admin/page.tsx          RSC · dashboard (prisma groupBy/count)
  (admin)/admin/requests/        list + [id] detail
  (admin)/admin/users/           list + new + [id]/edit
  (admin)/admin/roles/           list + new + [id]/edit
  api/auth/[...nextauth]/route.ts
```

- **Client islands** (`"use client"`): `site-header`, `admin-shell`, `app-sidebar`, `data-table`, every `columns.tsx`, `answer-panel`, `user-menu`, `form-kit`, `confirm-dialog`, all forms, and all Radix wrappers (`select`, `switch`, `dialog`, `sheet`, `dropdown-menu`, `accordion`, `sonner`).
- **Async params**: handled correctly today (every `searchParams`/`params` is `await`ed). **Must not regress.**
- **Missing surfaces** (opportunity, no logic): no `loading.tsx`, `error.tsx`, or `not-found.tsx` anywhere.

### Design-debt inventory (high-impact)

1. **Default Tailwind palette leaking** (worst offender): `components/admin/status-badge.tsx` uses `bg-blue-50/text-blue-700`, `bg-amber-50/700`, `bg-emerald-50/700`. Raw `emerald-50/600` also in `submit-form.tsx` and `answer-panel.tsx`. → exactly the "no default blue / no generic" violation.
2. **Fonts incomplete**: only **IBM Plex Sans _Arabic_** + **Mono** are loaded; **no Latin IBM Plex Sans**. `--font-sans` = Plex Arabic. Weights include **700** (spec: never ≥700). `font-bold` used in hero, footer, stat-card, page-header, section-heading, login, submit-form.
3. **Mono-for-data signature underused**: `StatCard` value and About `Stat` are `font-bold` _sans_, not `font-mono`. The "big mono numeral" institutional tell is missing on the key tiles.
4. **v3 gradient syntax**: `bg-gradient-to-bl`/`-l` in hero, login, cta, process → v4 `bg-linear-to-*`.
5. **Generic shadows**: `shadow-xs/sm/md/lg` on cards, inputs, buttons, sector hover → spec says no generic card shadows; prefer borders + tints + emerald hairlines.
6. **Radius drift**: `rounded-md/lg/xl/2xl/full` mixed → anchor a disciplined scale on `--radius-ips` (6px).
7. **Hex pattern is a CSS utility** (`.bg-hex`/`.bg-hex-ink`), not a reusable SVG component; ≤8% opacity enforced ad hoc (currently 0.05–0.07).
8. **Mark**: `LogoMark` exists (octagon + 60° slash; octagon stroke 4/64 = 6.25% ✓) but has **no `variant`** (primary/reversed/mono); `Wordmark` uses `font-bold`.
9. **Motion**: no `--ease-ips`; no View Transitions; ad-hoc `animate-bounce` without `motion-reduce` guard.
10. **Focus**: ring-based, color/opacity inconsistent (`ring/30` vs `ring/40`) → unify to one emerald focus-visible token.
11. **RTL**: strong logical-property usage already (`ps/pe`, `ms/me`, `text-start`, `start/end-*`). Physical leftovers in hero/services/cta (`left-*`, `right-*`, `-translate-x-*` on switch). Directional arrows are used semantically (back/forward) and must stay correct.
12. **No locale strategy**: Arabic-only RTL with English mono accents; no `[locale]`/i18n. Bilingual toggle = routing change → **open decision**, not done unprompted.

### Behavior to preserve (do NOT touch)

Async `params`/`searchParams` awaiting · server actions + `useActionState`/`useTransition` · RSC/client boundaries · `proxy.ts` gate + `matcher` · DAL `server-only` + RBAC · TanStack table / Radix / sonner / RHF wiring.

---

## Composition discipline

`~60% white/space · 25% green · 10% ink · 5% emerald`. Emerald is a scalpel:
the single primary action + focus rings. Green = dark institutional surfaces
(hero, sidebar, feature cards, CTA). Derive tints with
`color-mix(in oklch, var(--color-ips-green), white X%)`. v4 gradients only
(`bg-linear-to-*`). Every spacing a multiple of 8px; every radius `--radius-ips`;
every color a token; every interactive element a visible emerald focus state.

---

## Phased plan

### Phase 1 — Token layer (`app/globals.css`)
- Add canonical brand tokens in `@theme`: `--color-ips-green/emerald/ink/white/silver/gray` (mapped onto existing `--brand-*` so nothing breaks), keep shadcn semantic bridge.
- Shape & motion tokens: keep `--radius` (6px) as `--radius-ips`; add `--ease-ips: cubic-bezier(.2,.8,.2,1)`.
- Re-theme status surfaces and remove default-palette leakage (no `blue-*`/`amber-*`/raw `emerald-*`).

### Phase 1b — Fonts + type + focus
- `app/layout.tsx`: add **IBM Plex Sans** (Latin) alongside Plex Arabic + Mono; expose `--font-plex-sans/-arabic/-mono`. Drop weight `700` → keep `300/400/500/600`.
- `@theme`: `--font-sans` = Plex Sans → Arabic fallback; `--font-arabic`; `--font-mono`.
- Fluid scale with `clamp()` (Display→Label) + utilities. Mono for labels/metrics/IDs/timestamps.
- Global `*:focus-visible` emerald ring (`box-shadow: 0 0 0 3px color-mix(in oklch, emerald 45%, transparent)`). Verify WCAG AA+.

### Phase 2 — Brand signatures
- `components/brand/mark.tsx`: Server-safe inline SVG, `currentColor`, 1:1, `variant` = primary/reversed/mono. Refactor `logo.tsx` to consume it (keep `LogoMark`/`Wordmark` exports for back-compat).
- `components/brand/hex-field.tsx`: SVG hex-lattice background component with built-in ≤8% opacity cap + occasional active nodes; replace `.bg-hex` usages.
- Motion: enable `experimental.viewTransition` in `next.config.ts`; React `<ViewTransition>` on hero/mark + `<Link transitionTypes>`; `--ease-ips`; all wrapped in `prefers-reduced-motion`.

### Phase 3 — Component system
Buttons · inputs/forms (silver border, emerald focus, RTL-aware) · **data cards** (mono numeral, mono uppercase label, dark-green feature variant) · status chips (Active filled / Level tonal / Pending outline) · toggles & progress · nav/sidebar · tables (mono numeric cols, silver-tint zebra). Lock lucide `strokeWidth`. Every state complete: default/hover/active/focus/disabled/loading.

### Phase 4 — Page surfaces + RTL
Apply per route on 8px rhythm with real hierarchy; dark-green hero moments sparingly (hex only there); mobile-first @380 + 1440 grid; container queries where they beat breakpoints. Convert remaining physical props to logical; verify Arabic renders in Plex Arabic; keep mark + neutral icons un-mirrored.

### Finish
`BRAND-IMPLEMENTATION.md`: token reference · component inventory · RTL notes · open decisions.

---

## Reconciliation with official Brand Identity System (Vol. 01, v1.0)

The brand PDF was supplied mid-build. It **confirms** the palette (`0A5C36 / 0B0F0D / FFFFFF / 18C07A / C7CFCA / 8C968F`), the `60% space · 25% green · 10% ink · 5% emerald` ratio, 8px grid, 6px radius, emerald focus, WCAG AA+, the type scale (`84 / 42 / 19 / 14`, IBM Plex Sans + Sans Arabic + Mono, weights ≤600), the hexagonal-network pattern at 6% on green, and the `~1.2s build → settle` motion.

One correction it forces:

- **The mark is a HEXAGON, not an octagon.** Page 14 states `HEXAGON HEIGHT:WIDTH 1:1.155`; page 38 names the pattern "HEXAGONAL NETWORK"; the existing code mark was already a hexagon. The brief's "octagon of four chevrons" is superseded by the brand book. `Mark` is the hexagon + 60° slash (construction circle, chevron interval 90°, slash 60°, stroke 6.25%, aspect 1:1 locked).
- **Mark variants** follow page 23: `primary` (green/white) · `reversed` (white/green) · `black` · `white` (knockout) · `silver`, all single-tone (slash always matches the mark — never recoloured).

## Open decisions (for the user)

1. **Bilingual toggle (AR ⇄ EN)**: real locale switching needs routing work (`[locale]` segment or cookie + `dir/lang` swap) — a logic change. Proposed: keep Arabic-first RTL now, make everything logical-property-clean + load Latin Plex Sans so a future toggle is trivial. Implement full i18n only on request.
2. **Dark mode**: `.dark` tokens exist but are never activated (admin sidebar is independently dark). Keep as-is (light public/admin + dark sidebar/heroes) unless a global theme toggle is wanted.
3. **Added UI surfaces**: propose adding `loading.tsx` / `error.tsx` / `not-found.tsx` for polish (no logic). Confirm if undesired.

# CLAUDE.md — conventions for The House Of Brides

## Project
Marketing site for two bridal getting-ready apartments (Netanya, Shoresh). Hebrew-first RTL, English later under `/en/`. Astro + React islands + Tailwind v4 on Vercel; Supabase Postgres + Auth. The full plan is in `docs/ARCHITECTURE.md`; read it before structural changes.

## Git
- `main` is protected. Never commit to it directly; open a PR.
- Branch names: `feat/<area>-<short>`, `fix/<short>`, `chore/<short>`, `docs/<short>`.
- Conventional commits: `feat(availability): ...`, `fix(admin): ...`, `docs: ...`, `chore: ...`.
- One feature per PR, squash-merge. Every PR links its Vercel preview URL.
- Never commit secrets. `.env.example` lists keys only. Real values live in Vercel and Supabase.
- Never commit original photos. Only web masters (≤ 2400 px, ≤ 500 KB) go into `src/assets/images/`.

## Code rules
- No hardcoded UI strings in components; everything goes through `src/i18n/`. Content (facts, FAQ, packages) lives in typed files under `src/content/`.
- RTL first: logical Tailwind utilities only (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `border-s`). Never `ml/mr/pl/pr/left/right`. Wrap phone numbers, dates and prices in `<bdi>` or `dir="ltr"`.
- Dates are `YYYY-MM-DD` strings end to end; "today" is computed in `Asia/Jerusalem`. Never `new Date('2027-06-14')` in the browser.
- Public API responses never include notes, block kinds, names or ids from `availability_blocks`.
- Service-role Supabase key is server-only. Admin writes use the user's session; RLS enforces `is_admin()`.
- Every image has `width`/`height`; the hero is eager with `fetchpriority="high"`, everything else lazy.
- Motion: opacity + small translate, 300–500 ms, always respect `prefers-reduced-motion`.

## Before every commit
`pnpm lint && pnpm check && pnpm build` and the Playwright smoke test. For UI changes, capture screenshots at 390 px and 1280 px with `scripts/screenshots.ts` and review them.

## Database
Migrations are SQL files in `supabase/migrations/` and are the source of truth. Apply with the Supabase MCP `apply_migration`, then run `get_advisors` and regenerate `src/lib/db/database.types.ts`. After launch, test every migration inside `begin; ... rollback;` first.

## Design contract
Filled in after the design canvas is approved (fonts, palette, spacing scale, section order). Until then, follow the patterns in `docs/research/design-inspiration.md`.

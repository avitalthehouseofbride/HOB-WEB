# The House Of Brides — Architecture & Project Base Plan

## Context

Avital runs two bridal getting-ready apartments (Netanya and Shoresh) and needs one simple, photo-first site under the brand "The House Of Brides". Visitors see each apartment (facts, gallery, Q&A), a read-only availability calendar per apartment, and a contact page. An admin area lets the owner track inquiries and block/unblock dates. No payments on the site.

The repo `avitalthehouseofbride/HOB-WEB` is empty (no commits). Work goes on branch `claude/optimistic-darwin-i4tzw2`. The uploaded Hebrew research doc recommends Astro on Cloudflare; the decisions below keep its product thinking (site map, page order, calendar rules, data model, a11y/RTL/privacy guidance) but swap the hosting to what is actually connected to this session.

**Decisions already made with Avital (this session):**
- Hosting: **Vercel**. Database + auth: **Supabase** (new project in **eu-central-1 Frankfurt**; the existing Tokyo project is not used).
- Language: **Hebrew first, RTL, at `/`**; English-ready under `/en/…` later. No hardcoded UI strings.
- Apartments: **`netanya`** and **`shoresh`**.

---

## 1. Tech stack

**Astro + React islands + Tailwind CSS v4, deployed on Vercel, data in Supabase Postgres.**

Why Astro over Next.js: the site is ~95% static photo pages; Astro ships zero client JS by default and only the calendar, lightbox, inquiry form and admin calendar become React islands. Built-in `i18n` routing gives `/` = Hebrew and `/en/` later with no library. The few dynamic routes (availability JSON, inquiry submit, admin) use the Vercel adapter with per-route `prerender = false` plus **Astro Actions** (typed server functions, Zod-validated). `@supabase/ssr` works with Astro cookies in middleware.

Packages (latest on the registry today, 2026-09-14; pin exact versions at install):

| Purpose | Package(s) |
|---|---|
| Framework | `astro` 7.x, `@astrojs/react` 6.x, `@astrojs/vercel` 11.x, `@astrojs/sitemap` |
| UI | `react`/`react-dom` 19.x, `tailwindcss` 4.x via `@tailwindcss/vite` |
| Data / auth | `@supabase/supabase-js` 2.x, `@supabase/ssr` 0.12.x |
| Validation | `zod` 4.x |
| Calendar / dates | `react-day-picker` 9.x (RTL + keyboard a11y, `he` locale), `date-fns` 4.x, `@date-fns/tz` |
| Email (optional) | `resend` (no-op when key missing) |
| Fonts | `@fontsource/frank-ruhl-libre`, `@fontsource/heebo` (2 weights each, hebrew+latin subsets) |
| Dev | `typescript` (5.x if 7.x trips `astro check`), `@playwright/test` 1.63, `eslint` 9 + `eslint-plugin-astro` + `typescript-eslint`, `prettier` + `prettier-plugin-astro`, `vitest` |

Not used: no CMS, no ORM, no form/state library, no Cloudflare. Content (facts, FAQ, packages, timeline) lives in typed TS/Markdown files in the repo.

### 1b. Design-ready additions (the site has to sell, so design gets first-class tooling)

| Need | Choice | Why |
|---|---|---|
| Mockups before code | **Claude Design canvas** (the `design` skill in this session) | Home + apartment page artboards at mobile and desktop; Avital tweaks type, spacing and images visually and approves before any component is written |
| Motion | **`motion` 13** (vanilla API in `.astro`, `motion/react` in islands) | Scroll-reveal, hover, image parallax-lite, staggered galleries; 5 KB core; honours `prefers-reduced-motion`. GSAP stays in reserve only if a specific effect needs it. One library, not two |
| Page transitions | **Astro View Transitions** (`ClientRouter`, built in) | Cross-fade between home → apartment, shared-element hero morph; feels like an app with no SPA cost |
| Smooth scroll | **`lenis` 1.x**, opt-in, off on reduced-motion | The "expensive site" feel; verified against RTL and keyboard focus before enabling |
| Gallery / lightbox | **PhotoSwipe 5** | Framework-agnostic, pinch/swipe, keyboard, RTL-safe, works from a static `.astro` gallery with no React |
| Images | Astro `<Picture>` + `sharp`, AVIF/WebP, art-directed crops (vertical hero on mobile), blur-up placeholders, `width`/`height` on everything | Photography is the product; zero layout shift, sharp on retina, fast on 4G |
| Typography | Fluid type scale with `clamp()` in Tailwind `@theme`; variable fonts via `@fontsource-variable/*` | Editorial hierarchy that scales from 320 px to 1920 px; Hebrew serif/sans candidates below, decided in the mockup phase |
| Design tokens | CSS variables in `@theme`; per-property accent via `data-property="netanya|shoresh"` on `<body>` | One brand, two personalities, switched by one attribute |
| Icons | `astro-icon` with one thin-line set (Lucide or Phosphor Thin) | Consistent weight; no icon fonts |
| Long-form pages | `@astrojs/mdx` | Legal, about/story pages with components inside prose |

Hebrew font candidates (all on the registry as `@fontsource[-variable]/…`): serif **Frank Ruhl Libre**, David Libre, Noto Serif Hebrew (variable); sans **Heebo** (variable), Assistant (variable), Miriam Libre; display Suez One, Secular One. Final pairing is chosen on the design canvas against real photos.

## 1c. Design direction and inspiration (researched this session)

Note: the sandbox cannot open external sites directly (network proxy), so these were confirmed via search indexes, not screenshots. Avital should open the shortlist on her phone and mark 3–4 favourites before the mockup phase.

**International references to study (what to take from each):**

| Site | Take |
|---|---|
| reschio.com | The benchmark. One still full-bleed hero, wordmark only, CTA lives in the header. Large light serif headlines, sans only for small tracked labels. 120–160 px section rhythm, asymmetric image+text splits |
| aman.com | Slim persistent header: wordmark + one "Reserve"-style action. Near-monochrome sand/stone/ink palette; photos carry all colour |
| mountjuliet.ie/weddings, casacook.com | The two-property fork: two identical cards (4:5 photo, name, one line of character, one capacity number) right under the hero |
| euridge.uk, fogoislandinn.ca | Identical property-page skeleton for both apartments; honest "rates & inclusions" page; rooms named by their light/orientation |
| thyme.co.uk, fighousela.com | A plain-voice "good to know" facts/FAQ page: hours, what is included, parking, access |
| heckfieldplace.com | Muted olive/ochre accent used only for links and labels; one-line "aspect" per room |
| passalacqua.it | Lightbox behaviour to copy: swipe, arrow keys, caption, ESC, scroll position preserved |
| palazzosogni.com (Awwwards SOTD 2026) | Section-by-section reveal on scroll; sticky "contact" pill appears after the hero leaves the viewport. Avoid its preloader/custom cursor |
| belarosa-chalet.ch | Facts as numbers with units inline ("110 m², 3 stations, up to 12 guests") |
| sondaven.com | Typographic confidence and art-directed mobile crops; take the look, never the WebGL/scroll-jacking |
| brindamourstudios.com/getting-ready-suite | The closest product comparable: sells the photographs the bride will get (light, neutral tones, calm morning), not the furniture |

**Israeli references for Hebrew RTL type and layout:** pereh.co.il (two locations, one brand, stone/light narrative), thenorman.com (understated luxury spacing), ronitfarm.com (large Hebrew display type, full-bleed gallery), lihihod.com ("book appointment" CTA pattern), galialahav.com (photo rhythm; English only).

**Israeli competitor scan, what it means for us:**
- Competitors are Wix/WordPress/Shopix templates with cream+gold or blush, Hollywood-mirror hero shots, and the same openers ("יוקרתי", "חלומי", "מפנק", "נוף עוצר נשימה"). A custom editorial RTL build with real Hebrew typography will look visibly different.
- Almost nobody publishes the facts brides ask on WhatsApp: hours, number of makeup/hair stations, max companions, parking, elevator, ממ"ד (only one site), sleeping yes/no, price from, cancellation (nobody). A scannable facts strip under each apartment hero beats most of the market on its own.
- No standalone competitor has a verified public availability calendar. Calendar + WhatsApp prefill is a genuine first in the category.
- Search page 1 is owned by directories (mit4mit, Save A Date, urbanbridesmag, hayokra) and hotel chains; the Jerusalem-hills segment is thin (Hagit in Shoeva, Blanco). Shoresh has an SEO opening; listings on those directories are part of launch.
- Worth borrowing: Bride-day's "סדר יום" timeline page, Hagit's calm concrete tone.

**Design patterns we commit to:**
1. One still hero, no carousel, no video, no preloader. If a headline, one short serif line.
2. Header = wordmark + 3 links + one CTA ("בדקי זמינות"). Turns solid on scroll.
3. Two-property fork immediately under the home hero.
4. Identical apartment-page skeleton: hero → 3-line character → facts rows (numbers first, tabular numerals, thin rules) → curated gallery in a detail/room/detail rhythm → how the day looks → included list → calendar → form → trust → FAQ/location → other apartment.
5. Editorial type scale: serif display roughly 56–96 px light, body 18–20 px, measure ≤ 65 ch, sans for labels/nav only.
6. Generous rhythm: 96–160 px between sections on desktop, 64–96 px on mobile; asymmetric 5/7 splits, not centred stacks.
7. Motion budget: opacity + 8–12 px translate, 300–500 ms, reduced-motion respected.
8. Mobile sticky WhatsApp pill after the hero; hidden while the lightbox or keyboard is open.
9. Trust block next to the CTA: real facts, 2–3 short bride quotes, a response-time promise.

**Typography decision path:** start with Frank Ruhl Libre (display, light weight at large sizes) + Heebo (labels, numerals). Test David Libre for display and Assistant for labels on the design canvas against real photos. For the future English version, pair a Latin serif such as Cormorant Garamond via `unicode-range` so each script loads only its own file.

**Design workflow before code:** (1) Avital marks favourites from the shortlist and shares 10–20 real photos or the photographer's contact sheet. (2) Claude builds a design canvas (home + one apartment page, mobile + desktop, two type pairings, two accent treatments). (3) Avital edits/approves on the canvas. (4) Only then Phase 1 components are written against the approved artboards.

## 2. Repository structure

```
HOB-WEB/
├── .github/workflows/ci.yml          # install → lint → astro check → build → playwright smoke
├── .github/workflows/keepalive.yml   # cron every 3 days: pings Supabase so free tier never pauses
├── .github/pull_request_template.md
├── public/                           # favicon, robots.txt, og images
├── src/
│   ├── assets/images/{brand,netanya,shoresh}/   # web masters ≤2400px ≤500KB; originals stay in Drive
│   ├── components/
│   │   ├── ui/         Button, Section, Card, Badge (.astro)
│   │   ├── layout/     Header, Footer, SkipLink
│   │   ├── property/   Hero, KeyFacts, Gallery (+ Lightbox.tsx island), Timeline, Amenities, Packages, Reviews, Faq, Location, OtherApartment
│   │   ├── availability/AvailabilityCalendar.tsx   # public island
│   │   ├── inquiry/    InquiryForm.tsx, whatsapp.ts
│   │   └── admin/      AdminCalendar.tsx, BlockForm.tsx, InquiryTable.astro
│   ├── content/        typed data, one file per locale: properties/netanya.he.ts, shoresh.he.ts, home.he.ts, faq.he.ts, legal/*.he.md, types.ts
│   ├── i18n/           he.ts, en.ts (UI strings), index.ts (t(), getLocale), config.ts (locales + dir)
│   ├── layouts/Base.astro            # <html lang dir>, fonts, meta, skip link
│   ├── lib/
│   │   ├── supabase/{server.ts, admin.ts}   # SSR cookie client / service-role client (server only)
│   │   ├── db/database.types.ts             # generated from Supabase
│   │   ├── dates.ts, availability.ts, schemas.ts, spam.ts, email.ts, env.ts
│   ├── actions/index.ts              # inquiry.submit, admin.login/logout, admin.block*, admin.inquiryStatus
│   ├── middleware.ts                 # Supabase session + /admin guard
│   ├── pages/
│   │   ├── index, netanya, shoresh, contact, privacy, accessibility, terms, 404 (.astro, prerendered)
│   │   ├── api/availability/[slug].json.ts      # on-demand, cached
│   │   ├── admin/{login, index, [slug], inquiries}.astro   # SSR, noindex, no-store
│   │   └── en/                        # placeholder proving routing/dir switch (Phase 2)
│   └── styles/global.css             # Tailwind v4 @theme tokens + fonts
├── supabase/migrations/0001_init.sql, 0002_availability.sql, 0003_inquiries_audit.sql ; seed.sql
├── scripts/screenshots.ts            # Playwright captures at 390 & 1280 → scratchpad (Claude reviews PNGs)
├── scripts/prepare-images.ts         # sharp resize of a photo batch into src/assets/images
├── tests/e2e/smoke.spec.ts, tests/unit/{dates,availability}.test.ts
├── astro.config.mjs, tsconfig.json, eslint.config.js, .prettierrc, playwright.config.ts
├── package.json, pnpm-lock.yaml, .nvmrc (22), .gitignore, .env.example, README.md, CLAUDE.md
```

## 3. Pages and routes

| Route | Type | Notes |
|---|---|---|
| `/` | static | Hero (one image, no carousel) → two equal apartment cards → how to choose → why it works → real moments → check-a-date (pick property+date → form/WhatsApp) → FAQ |
| `/netanya`, `/shoresh` | static + islands | Hero → key facts → curated gallery (12–18, lightbox) → how the day looks → everything in the apartment → packages → availability calendar → inquiry form (property+date prefilled) → reviews → FAQ + location → link to the other apartment |
| `/contact` | static + island | Form (property optional), WhatsApp, phone, response-time promise |
| `/privacy`, `/accessibility`, `/terms` | static (markdown) | Terms state clearly: calendar is informational, an inquiry does not reserve a date |
| `/api/availability/[slug].json` | on-demand GET, public | `{property, from, to, updatedAt, days:[{date, status:'available'|'unavailable'}]}`; ranges only, never notes/kind; `s-maxage=300` |
| Action `inquiry.submit` | POST, public | Zod-validated, spam-checked, inserted via service role, email best-effort |
| `/admin/login` + Actions `admin.login/logout` | SSR | Supabase email+password |
| `/admin` → `/admin/[slug]` | SSR, admin only | Tabs per property; block a day, block a range, unblock, private note, kind; expired holds shown greyed |
| `/admin/inquiries` + Action `admin.inquiryStatus` | SSR, admin only | List/filter, status new → contacted → closed |
| Actions `admin.blockCreate/Update/Delete` | POST, admin only | Overlap error (Postgres 23P01) surfaced as a friendly Hebrew message; audit row written in same action |
| `/en/…` | static | Same hierarchy, `lang=en dir=ltr`, visible switch, no geo auto-redirect (Phase 2 skeleton, content later) |

Calendar rules (from the doc, kept): public shows only available/unavailable, 12–15 months ahead, two months on desktop / one on mobile, status by text+icon not color alone, each day a real button with an accessible name, "last updated" stamp. Clicking an available day prefills the form and the WhatsApp link, never changes the calendar. Mobile gets a sticky bottom "check availability on WhatsApp" button.

## 4. Data model and security (Supabase)

Tables: `properties(id, slug, display_name_he, display_name_en, active)`, `availability_blocks(id, property_id, start_date DATE, end_date DATE inclusive, kind enum booked|blocked|hold, private_note, hold_expires_at, created_by, created_at, updated_at)`, `inquiries(id, property_id, wedding_date DATE, name, phone, venue, companions, message, status enum new|contacted|closed, locale, ip_hash, email_sent, created_at, updated_at)`, `audit_log(id, actor_email, action, entity, entity_id, payload jsonb, created_at)`, `admin_allowlist(email)`.

Key rules:
- Dates are `DATE` (YYYY-MM-DD), never timestamps. "Today" is computed in `Asia/Jerusalem` on server and in SQL. Never `new Date('2027-06-14')` in the browser.
- Overlap prevention in one place: `EXCLUDE USING gist (property_id WITH =, daterange(start_date, end_date, '[]') WITH &&)` via `btree_gist`.
- RLS on every table. **`anon` gets no table access at all.** Public reads go through one `security definer` RPC `public_availability(slug)` that returns only `(start_date, end_date)` within the public window. Inquiries are inserted only server-side with the service-role key (never exposed to the browser). Admin writes use the user's cookie session and RLS `is_admin()` (email in `admin_allowlist`).
- Admin auth: Supabase Auth email+password, sign-ups disabled, one user created manually, middleware also checks `ADMIN_EMAIL`. `/admin/*` gets `Cache-Control: no-store` and `X-Robots-Tag: noindex`.
- Spam: honeypot + minimum time-to-submit + server rate limit per hashed IP at launch; Cloudflare Turnstile wired behind optional env keys, enabled only if spam appears.
- Migrations are SQL files in `supabase/migrations/` (source of truth), applied with the Supabase MCP `apply_migration`; `get_advisors` after each; `generate_typescript_types` regenerates `database.types.ts`.

## 5. Git practices

- `main` is protected (PR + green CI required, no force-push). Feature branches `feat/<area>-<short>`, `fix/…`, `chore/…`; the current `claude/optimistic-darwin-i4tzw2` carries Phase 0 and is opened as the first PR.
- Conventional commits (`feat(availability): …`), one feature per PR, squash-merge.
- Secrets never in the repo: `.env.example` lists keys only (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `PUBLIC_SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, `RESEND_API_KEY?`, `INQUIRY_NOTIFY_EMAIL?`, `PUBLIC_TURNSTILE_SITE_KEY?`, `TURNSTILE_SECRET_KEY?`, `IP_HASH_SALT`). Real values live in Vercel env + Supabase dashboard.
- CI on every PR: `pnpm install --frozen-lockfile` → `eslint` → `astro check` → `astro build` → Playwright smoke (Chromium). A CI check also fails if any image in `src/assets` exceeds 800KB.
- `CLAUDE.md` records these conventions so every future session follows them.

## 6. How we verify work from the cloud (no laptop)

1. **Inside the sandbox:** run `pnpm dev` in the background, then `scripts/screenshots.ts` captures pages at 390px and 1280px with Playwright (Chromium is preinstalled). Claude reads the PNGs and iterates. `astro check`, `eslint`, and the smoke test run before every commit.
2. **Preview URL for Avital:** link the GitHub repo to a Vercel project so every branch push builds a preview URL she can open on her phone. Claude checks build logs and fetches the page through the Vercel MCP. Preview deployment protection is turned off for previews so no Vercel login is needed. *One-time manual step for Avital:* install the Vercel GitHub App on the `avitalthehouseofbride` account (Vercel dashboard → Add New Project → Import from GitHub). Until then, Claude can push ad-hoc previews from the sandbox with the Vercel MCP `deploy_to_vercel`, so nothing is blocked.
3. **Database:** one Supabase project (free tier has no branching). Pre-launch data is disposable, so migrations apply directly; after launch, every migration is tested first with `execute_sql` inside `begin; … rollback;`.

## 7. Phased roadmap

| Phase | Deliverables | Gate to pass |
|---|---|---|
| **0 – Bootstrap** (first implementation step after this plan) | Astro scaffold (React, Vercel adapter, Tailwind v4, i18n config, fonts), ESLint/Prettier/Playwright/Vitest, `scripts/screenshots.ts`, `.env.example`, `.gitignore`, README, CLAUDE.md, CI + PR template, placeholder home page in Hebrew RTL; Supabase project `hob-web` in eu-central-1 + `0001_init.sql` (extensions, enums, properties, allowlist, `is_admin`, seed); Vercel project + env vars; first commit and push; open PR | CI green; preview URL renders the placeholder; `list_tables` shows two seeded properties; screenshots reviewed |
| **0.5 – Design mockups** (no site code) | Design canvas with Home + one apartment page at mobile and desktop, two type pairings, two accent treatments, using Avital's favourites from the shortlist and real photos where available | Avital approves the artboards; chosen fonts, palette, spacing scale and section order are written into `CLAUDE.md` as the design contract |
| **1 – Design system, Home, Netanya** | `@theme` tokens from the approved artboards (starting point: cream `F5F1E8`, ink `1E1D1A`, stone `B9AEA1`, Netanya sea-blue accent, Shoresh olive accent), fluid type scale, Base layout, header/footer, Home, `/netanya` with all sections, Gallery + PhotoSwipe lightbox, scroll-reveal motion, view transitions | Screenshots at 390/1280 match the artboards with no horizontal overflow; Avital approves on phone; Lighthouse perf/a11y ≥ 90 |
| **2 – Shoresh, contact, legal, i18n** | `/shoresh` from the same components + data file, `/contact`, legal pages, `en.ts` skeleton + `/en/` placeholder, sitemap, OG meta | All routes in smoke test; CI grep finds no Hebrew literals inside components |
| **3 – Availability + inquiries** | `0002_availability.sql` + RPC, public API, `AvailabilityCalendar` island, click → prefilled form + WhatsApp, `0003_inquiries_audit.sql`, inquiry Action, spam checks, email | Block inserted via SQL appears sanitized in the API; keyboard-only walkthrough; test inquiry lands in the table; rate limit verified |
| **4 – Admin** | Auth user, login page, middleware, `/admin/[slug]` calendar with day/range block, unblock, note, kind; `/admin/inquiries` with status; audit log | Login from phone on preview; overlap gives friendly error; anon REST call to tables is denied; `get_advisors` clean |
| **5 – Launch** | a11y pass (axe, focus order, contrast, reduced motion), SEO (titles, JSON-LD, hreflang prep), real photo pipeline, hero/font preload, LCP < 2.5s, domain on Vercel, Resend domain verified, keepalive cron | Lighthouse mobile ≥ 90 all categories on production; Avital sign-off; tag `v1.0.0` |

## 8. Risks and notes

- **Vercel Hobby is for non-commercial use.** A business site needs Pro (about $20/month) by launch. Build and preview on Hobby; upgrade in Phase 5.
- **Supabase free tier pauses after ~7 days without activity.** The keepalive cron plus real traffic prevents it; upgrade if it ever bites.
- **Vercel Git linking needs a manual GitHub App install** (see §6). Ad-hoc MCP deploys cover the gap.
- **RTL:** logical Tailwind utilities only (`ms-`, `pe-`, `text-start`); phone numbers, dates and prices wrapped in `<bdi>`/`dir="ltr"`; directional icons flip with `rtl:rotate-180`; test `/en` early.
- **Images:** originals never enter git; Astro `<Picture>` builds AVIF/WebP with `srcset`; hero is eager with `fetchpriority="high"`, everything else lazy.
- **Content still to collect from Avital** (from the doc's decision list): per-apartment facts (hours, capacity, stations, bathrooms, parking, elevator, safe room, sleeping), packages and whether prices appear, public address vs area only, WhatsApp number, 3–5 linkable reviews, 12–18 photos per apartment. Placeholders are used until then; none of this blocks Phases 0–2.

## 9. Immediately after approval

Execute Phase 0 on branch `claude/optimistic-darwin-i4tzw2`: scaffold, tooling, CI, docs, placeholder home, create the Frankfurt Supabase project and first migration, link Vercel, commit with conventional messages, push, and open the first PR with the preview link. In parallel, Avital reviews the inspiration shortlist and gathers photos so Phase 0.5 (design canvas) can start right after.

# The House Of Brides

Website for two bridal getting-ready apartments in Israel, Netanya and Shoresh, under one brand.

Status: planning complete, code not started. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) first.

## What the site does

- Hebrew-first (RTL) marketing site, English-ready under `/en/`.
- One page per apartment: facts, curated gallery, how the day looks, packages, FAQ, location.
- A public read-only availability calendar per apartment. Picking a date prefills the inquiry form and a WhatsApp message. No booking, no payments on the site.
- Contact page and inquiry form.
- A private admin area for the owner: block/unblock dates and track inquiries.

## Stack (decided)

Astro + React islands + Tailwind CSS v4, hosted on Vercel, data and auth in Supabase (Postgres, eu-central-1).

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): stack, structure, data model, security, routes, verification loop, roadmap.
- [docs/research/design-inspiration.md](docs/research/design-inspiration.md): sites to study, patterns we commit to, type pairings.
- [docs/research/competitor-scan-il.md](docs/research/competitor-scan-il.md): Israeli competitors, what they show and hide, how we differentiate.
- [docs/research/planning-research-he.docx](docs/research/planning-research-he.docx): the original Hebrew planning study.

## Working in this repo

See [CLAUDE.md](CLAUDE.md) for branch, commit and review conventions.

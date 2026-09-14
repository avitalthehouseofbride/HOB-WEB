# Database

Migrations in `migrations/` are the source of truth for the Supabase schema.
Apply them in order with the Supabase MCP `apply_migration` (or `supabase db push` locally),
then run the security and performance advisors and regenerate `src/lib/db/database.types.ts`.

After launch, test every migration inside `begin; ... rollback;` before applying it.

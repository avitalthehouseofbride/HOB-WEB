-- 0001_init: extensions, enums, properties, admin allowlist, is_admin(), seed.
-- Availability blocks, inquiries and audit log arrive in later migrations.

create extension if not exists btree_gist;

create type public.block_kind as enum ('booked', 'blocked', 'hold');
create type public.inquiry_status as enum ('new', 'contacted', 'closed');

create table public.properties (
  id smallint primary key,
  slug text unique not null check (slug ~ '^[a-z]+$'),
  display_name_he text not null,
  display_name_en text,
  active boolean not null default true
);

-- Emails allowed into the admin area. Seeded manually; never exposed to the client.
create table public.admin_allowlist (
  email text primary key check (email = lower(email))
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_allowlist
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, service_role;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Row level security: anon gets nothing on base tables. Public reads go through
-- security-definer RPCs added in later migrations.
alter table public.properties enable row level security;
alter table public.admin_allowlist enable row level security;

create policy "admins read properties"
  on public.properties for select
  to authenticated
  using (public.is_admin());

revoke all on all tables in schema public from anon;
alter default privileges in schema public revoke all on tables from anon;

insert into public.properties (id, slug, display_name_he, display_name_en) values
  (1, 'netanya', 'נתניה', 'Netanya'),
  (2, 'shoresh', 'שורש', 'Shoresh');

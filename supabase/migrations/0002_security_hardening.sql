-- 0002_security_hardening: address Supabase advisor findings from 0001.

-- Extensions live in the dedicated `extensions` schema, not `public`.
drop extension if exists btree_gist;
create extension if not exists btree_gist schema extensions;

-- Trigger functions get a fixed search_path.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- is_admin() is only for RLS checks by signed-in users and the server role.
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;

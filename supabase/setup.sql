-- KRYPTROZ whitelist schema. Run in the Supabase SQL Editor as an owner.
-- This is a fresh-install script. Use a migration for an existing table.

create table public.whitelist (
  id bigint generated always as identity primary key,
  handle text not null constraint whitelist_handle_format
    check (handle ~ '^@?[A-Za-z0-9_]{1,15}$'),
  post_link text constraint whitelist_post_link_format
    check (post_link is null or (length(post_link) <= 500 and post_link ~* '^https://(www\.)?(x\.com|twitter\.com)/[^[:space:]]+$')),
  comment_link text constraint whitelist_comment_link_format
    check (comment_link is null or (length(comment_link) <= 500 and comment_link ~* '^https://(www\.)?(x\.com|twitter\.com)/[^[:space:]]+$')),
  wallet text not null unique constraint whitelist_wallet_format
    check (wallet ~ '^0x[0-9a-f]{40}$'),
  quests text constraint whitelist_quests_format
    check (quests is null or quests ~ '^(follow|like|rt|comment|post|discord)(, (follow|like|rt|comment|post|discord))*$'),
  created_at timestamptz not null default now()
);

alter table public.whitelist enable row level security;

-- Start from no API access, then grant only the columns required by the form.
revoke all on table public.whitelist from public, anon, authenticated;
revoke all on sequence public.whitelist_id_seq from public, anon, authenticated;
grant insert (handle, post_link, comment_link, wallet, quests)
  on table public.whitelist to anon;
grant usage on sequence public.whitelist_id_seq to anon;

create policy "anon insert validated whitelist entry"
  on public.whitelist for insert to anon
  with check (
    length(handle) <= 16 and
    length(wallet) = 42 and
    length(coalesce(quests, '')) <= 60
  );

-- Expose only an aggregate, never whitelist rows. The empty search_path and
-- schema-qualified relation prevent object-shadowing in this definer function.
create or replace function public.whitelist_count()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(*) from public.whitelist
$$;

revoke all on function public.whitelist_count() from public, anon, authenticated;
grant execute on function public.whitelist_count() to anon;

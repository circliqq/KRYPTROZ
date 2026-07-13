import { createClient } from '@supabase/supabase-js'

// These values are intentionally injected at build time. Only use a Supabase
// publishable/anon key here; a service-role or secret key must never reach Vite.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  ''

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null

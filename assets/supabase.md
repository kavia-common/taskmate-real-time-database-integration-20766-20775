# Supabase Configuration for TaskMate

Status: Verified and applied via automated configuration.

## Database Schema (Verified)

Table: public.tasks
Columns:
- id: uuid (Primary Key, Default: gen_random_uuid(), NOT NULL) ✅
- title: text (NOT NULL) ✅
- description: text (NOT NULL) ✅
- created_at: timestamptz (Default: now(), NOT NULL) ✅

## Real-time Configuration (Verified)

- Real-time enabled via Supabase Realtime service.
- REPLICA IDENTITY is set to FULL on public.tasks to ensure complete row change payloads.
  SQL applied:
  - ALTER TABLE IF EXISTS public.tasks REPLICA IDENTITY FULL;

## Row Level Security (RLS) Policies (Applied Idempotently)

RLS enabled on public.tasks:
- ALTER TABLE IF EXISTS public.tasks ENABLE ROW LEVEL SECURITY;

Policies (created only if missing):
1) "Allow public read access"
   - FOR SELECT USING (true)

2) "Allow public insert access"
   - FOR INSERT WITH CHECK (true)

3) "Allow public update access"
   - FOR UPDATE USING (true)

4) "Allow public delete access"
   - FOR DELETE USING (true)

Note: These permissive public policies are intended for demo/dev. For production, restrict using auth.uid() based checks.

## Environment Variables (Frontend)

Required in react_frontend/.env:
- REACT_APP_SUPABASE_URL: Your Supabase project URL (e.g., https://YOUR_PROJECT_ID.supabase.co)
- REACT_APP_SUPABASE_KEY: Your Supabase anon/public key

Current container env present:
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_KEY

No additional Supabase secrets are required beyond the anon/public key for this frontend-only use case.

## Frontend Integration (Verified)

- Supabase client module exists at src/lib/supabaseClient.js and is imported as:
  import { getSupabaseClient } from '../lib/supabaseClient';
- Task service uses the client and realtime channels for CRUD + subscriptions.

Auth redirect utilities and getURL helpers are not required for this scope (no auth flows). If you add auth later, implement dynamic redirect handling as per guidelines.

## Troubleshooting

- If you see: "Supabase environment variables are not set..." at runtime:
  - Ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY exist in react_frontend/.env
  - Restart dev server after changing env values

- If realtime events don’t appear:
  - Confirm REPLICA IDENTITY FULL on tasks (already applied)
  - Ensure RLS policies allow relevant operations
  - Check browser console for network errors

## Audit Log

Applied SQL (idempotent):
- ENABLE RLS on public.tasks
- CREATE policies if missing: read/insert/update/delete (USING/with check true)
- ALTER TABLE public.tasks REPLICA IDENTITY FULL

Last verification: Current session

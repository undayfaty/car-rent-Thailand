-- Seed script for creating mock users with specific roles
-- Run this in the Supabase Dashboard -> SQL Editor
-- Password for ALL accounts: password123

-- Step 1: Insert into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES
  ('00000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'admin@carrent.com',    crypt('password123', gen_salt('bf')), now(), '{"first_name":"Admin","last_name":"Super"}'::jsonb,    now(), now(), 'authenticated', 'authenticated'),
  ('00000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'staff@carrent.com',    crypt('password123', gen_salt('bf')), now(), '{"first_name":"Staff","last_name":"Member"}'::jsonb,   now(), now(), 'authenticated', 'authenticated'),
  ('00000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'driver@carrent.com',   crypt('password123', gen_salt('bf')), now(), '{"first_name":"Driver","last_name":"Pro"}'::jsonb,     now(), now(), 'authenticated', 'authenticated'),
  ('00000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'customer@carrent.com', crypt('password123', gen_salt('bf')), now(), '{"first_name":"Customer","last_name":"Vip"}'::jsonb,   now(), now(), 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Insert into auth.identities
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  ('20000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001', '{"sub":"00000001-0000-0000-0000-000000000001","email":"admin@carrent.com"}'::jsonb,    'email', now(), now(), now()),
  ('20000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000002', '{"sub":"00000001-0000-0000-0000-000000000002","email":"staff@carrent.com"}'::jsonb,    'email', now(), now(), now()),
  ('20000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000003', '{"sub":"00000001-0000-0000-0000-000000000003","email":"driver@carrent.com"}'::jsonb,   'email', now(), now(), now()),
  ('20000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000004', '{"sub":"00000001-0000-0000-0000-000000000004","email":"customer@carrent.com"}'::jsonb, 'email', now(), now(), now())
ON CONFLICT (id) DO NOTHING;

-- Step 3: Insert into public.profiles
INSERT INTO public.profiles (id, first_name, last_name, role)
VALUES
  ('00000001-0000-0000-0000-000000000001', 'Admin',    'Super',  'admin'),
  ('00000001-0000-0000-0000-000000000002', 'Staff',    'Member', 'staff'),
  ('00000001-0000-0000-0000-000000000003', 'Driver',   'Pro',    'driver'),
  ('00000001-0000-0000-0000-000000000004', 'Customer', 'Vip',    'customer')
ON CONFLICT (id) DO UPDATE
  SET role = EXCLUDED.role,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name;

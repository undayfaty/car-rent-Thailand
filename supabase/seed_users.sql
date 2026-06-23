-- Seed script for creating mock users with specific roles
-- Run this in the Supabase Dashboard -> SQL Editor

DO $$
DECLARE
  admin_uid uuid := gen_random_uuid();
  staff_uid uuid := gen_random_uuid();
  driver_uid uuid := gen_random_uuid();
  customer_uid uuid := gen_random_uuid();
BEGIN
  -- 1. Insert into auth.users (Supabase Authentication)
  -- The password for all accounts will be: password123
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
  )
  VALUES 
    (admin_uid, '00000000-0000-0000-0000-000000000000', 'admin@carrent.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Admin", "last_name": "User"}', now(), now(), 'authenticated', 'authenticated'),
    (staff_uid, '00000000-0000-0000-0000-000000000000', 'staff@carrent.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Staff", "last_name": "User"}', now(), now(), 'authenticated', 'authenticated'),
    (driver_uid, '00000000-0000-0000-0000-000000000000', 'driver@carrent.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Driver", "last_name": "User"}', now(), now(), 'authenticated', 'authenticated'),
    (customer_uid, '00000000-0000-0000-0000-000000000000', 'customer@carrent.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Customer", "last_name": "User"}', now(), now(), 'authenticated', 'authenticated');

  -- 2. Insert into auth.identities (Required for Supabase Auth to allow email logins)
  INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), admin_uid, format('{"sub":"%s","email":"%s"}', admin_uid::text, 'admin@carrent.com')::jsonb, 'email', now(), now(), now()),
    (gen_random_uuid(), staff_uid, format('{"sub":"%s","email":"%s"}', staff_uid::text, 'staff@carrent.com')::jsonb, 'email', now(), now(), now()),
    (gen_random_uuid(), driver_uid, format('{"sub":"%s","email":"%s"}', driver_uid::text, 'driver@carrent.com')::jsonb, 'email', now(), now(), now()),
    (gen_random_uuid(), customer_uid, format('{"sub":"%s","email":"%s"}', customer_uid::text, 'customer@carrent.com')::jsonb, 'email', now(), now(), now());

  -- 3. Insert or Update public.profiles (Assigning our custom Roles)
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES
    (admin_uid, 'Admin', 'Super', 'admin'),
    (staff_uid, 'Staff', 'Member', 'staff'),
    (driver_uid, 'Driver', 'Pro', 'driver'),
    (customer_uid, 'Customer', 'Vip', 'customer')
  ON CONFLICT (id) DO UPDATE 
  SET role = EXCLUDED.role, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name;

END $$;

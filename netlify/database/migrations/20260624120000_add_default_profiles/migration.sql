INSERT INTO public.profiles (id, first_name, last_name, role, status)
VALUES
  ('00000001-0000-0000-0000-000000000001', 'Admin',    'Super',  'admin',    'approved'),
  ('00000001-0000-0000-0000-000000000002', 'Staff',    'Member', 'staff',    'approved'),
  ('00000001-0000-0000-0000-000000000003', 'Driver',   'Pro',    'driver',   'approved'),
  ('00000001-0000-0000-0000-000000000004', 'Customer', 'Vip',    'customer', 'approved')
ON CONFLICT (id) DO UPDATE
  SET role       = EXCLUDED.role,
      first_name = EXCLUDED.first_name,
      last_name  = EXCLUDED.last_name,
      status     = EXCLUDED.status;

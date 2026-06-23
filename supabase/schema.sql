-- Create roles enum
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'driver', 'customer');
CREATE TYPE user_group AS ENUM ('thai_tourism', 'thai_company', 'foreign_tourism', 'foreign_business');
CREATE TYPE doc_type AS ENUM ('id_card', 'passport', 'driver_license', 'other');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE vehicle_type AS ENUM ('suv', 'van_12_seat', 'camry');
CREATE TYPE booking_status AS ENUM ('draft', 'pending_approval', 'approved', 'partial_paid', 'full_paid', 'completed', 'cancelled');
CREATE TYPE payment_type AS ENUM ('deposit', 'final_payment', 'full_payment');

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  line_id TEXT,
  whatsapp TEXT,
  wechat TEXT,
  role user_role DEFAULT 'customer',
  customer_group user_group,
  status approval_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Documents table
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  type doc_type NOT NULL,
  file_url TEXT NOT NULL,
  status approval_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type vehicle_type NOT NULL,
  license_plate TEXT UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id),
  base_price_daily NUMERIC NOT NULL,
  base_price_with_gas NUMERIC NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  with_gas BOOLEAN DEFAULT false,
  has_driver_overtime BOOLEAN DEFAULT false,
  overtime_hours INTEGER DEFAULT 0,
  has_child_seat BOOLEAN DEFAULT false,
  child_seat_days INTEGER DEFAULT 0,
  base_rental_fee NUMERIC NOT NULL,
  overtime_fee NUMERIC DEFAULT 0,
  child_seat_fee NUMERIC DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total_price NUMERIC NOT NULL,
  status booking_status DEFAULT 'pending_approval',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Invoices table
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) NOT NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  total_amount NUMERIC NOT NULL,
  tax_amount NUMERIC DEFAULT 0,
  paid_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'unpaid', -- unpaid, partial, paid
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Payments table
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.invoices(id) NOT NULL,
  amount NUMERIC NOT NULL,
  slip_url TEXT,
  status approval_status DEFAULT 'pending',
  verified_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

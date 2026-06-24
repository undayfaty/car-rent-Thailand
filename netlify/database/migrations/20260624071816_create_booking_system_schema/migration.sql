CREATE TYPE "approval_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "booking_status" AS ENUM('draft', 'pending_approval', 'approved', 'partial_paid', 'full_paid', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "doc_type" AS ENUM('id_card', 'passport', 'driver_license', 'other');--> statement-breakpoint
CREATE TYPE "payment_type" AS ENUM('deposit', 'final_payment', 'full_payment');--> statement-breakpoint
CREATE TYPE "user_group" AS ENUM('thai_tourism', 'thai_company', 'foreign_tourism', 'foreign_business');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('admin', 'staff', 'driver', 'customer');--> statement-breakpoint
CREATE TYPE "vehicle_type" AS ENUM('suv', 'van_12_seat', 'camry');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"total_days" integer NOT NULL,
	"with_gas" boolean DEFAULT false,
	"has_driver_overtime" boolean DEFAULT false,
	"overtime_hours" integer DEFAULT 0,
	"has_child_seat" boolean DEFAULT false,
	"child_seat_days" integer DEFAULT 0,
	"base_rental_fee" numeric NOT NULL,
	"overtime_fee" numeric DEFAULT '0',
	"child_seat_fee" numeric DEFAULT '0',
	"tax_amount" numeric DEFAULT '0',
	"total_price" numeric NOT NULL,
	"status" "booking_status" DEFAULT 'pending_approval'::"booking_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"type" "doc_type" NOT NULL,
	"file_url" text NOT NULL,
	"status" "approval_status" DEFAULT 'pending'::"approval_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"booking_id" uuid NOT NULL,
	"invoice_number" text NOT NULL UNIQUE,
	"total_amount" numeric NOT NULL,
	"tax_amount" numeric DEFAULT '0',
	"paid_amount" numeric DEFAULT '0',
	"status" text DEFAULT 'unpaid',
	"due_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"amount" numeric NOT NULL,
	"slip_url" text,
	"status" "approval_status" DEFAULT 'pending'::"approval_status",
	"verified_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" text,
	"last_name" text,
	"phone" text,
	"line_id" text,
	"whatsapp" text,
	"wechat" text,
	"role" "user_role" DEFAULT 'customer'::"user_role",
	"customer_group" "user_group",
	"status" "approval_status" DEFAULT 'pending'::"approval_status",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" "vehicle_type" NOT NULL,
	"license_plate" text NOT NULL UNIQUE,
	"driver_id" uuid,
	"base_price_daily" numeric NOT NULL,
	"base_price_with_gas" numeric NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_profiles_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id");--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_profiles_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_verified_by_profiles_id_fkey" FOREIGN KEY ("verified_by") REFERENCES "profiles"("id");--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driver_id_profiles_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "profiles"("id");
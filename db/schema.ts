import {
  pgTable,
  pgEnum,
  uuid,
  text,
  numeric,
  boolean,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "staff",
  "driver",
  "customer",
]);

export const userGroupEnum = pgEnum("user_group", [
  "thai_tourism",
  "thai_company",
  "foreign_tourism",
  "foreign_business",
]);

export const docTypeEnum = pgEnum("doc_type", [
  "id_card",
  "passport",
  "driver_license",
  "other",
]);

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
]);

export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "suv",
  "van_12_seat",
  "camry",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "draft",
  "pending_approval",
  "approved",
  "partial_paid",
  "full_paid",
  "completed",
  "cancelled",
]);

export const paymentTypeEnum = pgEnum("payment_type", [
  "deposit",
  "final_payment",
  "full_payment",
]);

// Profiles table (replaces Supabase auth.users extension)
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  lineId: text("line_id"),
  whatsapp: text("whatsapp"),
  wechat: text("wechat"),
  role: userRoleEnum("role").default("customer"),
  customerGroup: userGroupEnum("customer_group"),
  status: approvalStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Documents table
export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  type: docTypeEnum("type").notNull(),
  fileUrl: text("file_url").notNull(),
  status: approvalStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: vehicleTypeEnum("type").notNull(),
  licensePlate: text("license_plate").unique().notNull(),
  driverId: uuid("driver_id").references(() => profiles.id),
  basePriceDaily: numeric("base_price_daily").notNull(),
  basePriceWithGas: numeric("base_price_with_gas").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id),
  vehicleId: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  withGas: boolean("with_gas").default(false),
  hasDriverOvertime: boolean("has_driver_overtime").default(false),
  overtimeHours: integer("overtime_hours").default(0),
  hasChildSeat: boolean("has_child_seat").default(false),
  childSeatDays: integer("child_seat_days").default(0),
  baseRentalFee: numeric("base_rental_fee").notNull(),
  overtimeFee: numeric("overtime_fee").default("0"),
  childSeatFee: numeric("child_seat_fee").default("0"),
  taxAmount: numeric("tax_amount").default("0"),
  totalPrice: numeric("total_price").notNull(),
  status: bookingStatusEnum("status").default("pending_approval"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id),
  invoiceNumber: text("invoice_number").unique().notNull(),
  totalAmount: numeric("total_amount").notNull(),
  taxAmount: numeric("tax_amount").default("0"),
  paidAmount: numeric("paid_amount").default("0"),
  status: text("status").default("unpaid"), // unpaid | partial | paid
  dueDate: date("due_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Payments table
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id")
    .notNull()
    .references(() => invoices.id),
  amount: numeric("amount").notNull(),
  slipUrl: text("slip_url"),
  status: approvalStatusEnum("status").default("pending"),
  verifiedBy: uuid("verified_by").references(() => profiles.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

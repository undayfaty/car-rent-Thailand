"use client";

import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, TrendingDown, Clock, Car, Users, Wallet, AlertCircle,
  CheckCircle, ArrowUpRight, ArrowRight, Zap, BarChart3, CircleDollarSign, Baby,
  MapPin, Award, Calendar, CreditCard, CheckSquare, FileText
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/client";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from "recharts";

/* ─────────────────────────────────────────── */
/* MOCK DATA                                   */
/* ─────────────────────────────────────────── */
type Period = "today" | "month" | "year";

// Admin Data
const ADMIN_KPI = { revenue: 125000, other: 15400, ot: 12400, babySeat: 3000, growth: 12.5 };
const ADMIN_CHART_DATA = [
  { name: 'จ.', revenue: 45000, expense: 24000 },
  { name: 'อ.', revenue: 30000, expense: 13980 },
  { name: 'พ.', revenue: 20000, expense: 9800 },
  { name: 'พฤ.', revenue: 27800, expense: 13908 },
  { name: 'ศ.', revenue: 68900, expense: 24800 },
  { name: 'ส.', revenue: 83900, expense: 28800 },
  { name: 'อา.', revenue: 94900, expense: 34300 },
];

// Staff Data
const STAFF_KPI = { pendingBookings: 12, newCustomers: 5, slipCheck: 8, support: 3 };
const STAFF_CHART_DATA = [
  { name: 'จ.', bookings: 12, canceled: 1 },
  { name: 'อ.', bookings: 19, canceled: 2 },
  { name: 'พ.', bookings: 15, canceled: 0 },
  { name: 'พฤ.', bookings: 22, canceled: 1 },
  { name: 'ศ.', bookings: 38, canceled: 3 },
  { name: 'ส.', bookings: 45, canceled: 5 },
  { name: 'อา.', bookings: 52, canceled: 2 },
];

// Driver Data
const DRIVER_KPI = { trips: 14, distance: 1250, ot: 3500, rating: 4.9 };
const DRIVER_CHART_DATA = [
  { name: 'จ.', base: 1000, ot: 200 },
  { name: 'อ.', base: 1000, ot: 500 },
  { name: 'พ.', base: 1000, ot: 0 },
  { name: 'พฤ.', base: 1000, ot: 400 },
  { name: 'ศ.', base: 1000, ot: 800 },
  { name: 'ส.', base: 1500, ot: 1200 },
  { name: 'อา.', base: 1500, ot: 1500 },
];

// Shared Data
const RECENT_BOOKINGS = [
  { id: "BK001", customer: "สมหญิง รักดี", vehicle: "Alphard", status: "pending", amount: 15000 },
  { id: "BK002", customer: "John Smith", vehicle: "Staria", status: "confirmed", amount: 14000 },
  { id: "BK003", customer: "บริษัท เอบีซี", vehicle: "Camry", status: "in_progress", amount: 7500 },
  { id: "BK004", customer: "Li Wei", vehicle: "VIP Van", status: "completed", amount: 25000 },
];

/* ─────────────────────────────────────────── */
/* HELPERS                                     */
/* ─────────────────────────────────────────── */
function AnimatedNumber({ target, prefix = "" }: { target: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrent(0);
    const duration = 900;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target]);

  return <span>{prefix}{current.toLocaleString()}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending:     { label: "รอดำเนินการ", className: "text-t-orange bg-t-orange/15 border border-t-orange/30" },
    confirmed:   { label: "ยืนยันแล้ว", className: "text-t-accent bg-t-accent/15 border border-t-accent/30" },
    in_progress: { label: "กำลังเดินทาง", className: "text-t-blue bg-t-blue/15 border border-t-blue/30" },
    completed:   { label: "เสร็จสิ้น", className: "text-t-green bg-t-green/15 border border-t-green/30" },
    on_trip:     { label: "กำลังวิ่งงาน", className: "text-t-blue bg-t-blue/15 border border-t-blue/30" },
    available:   { label: "ว่าง", className: "text-t-green bg-t-green/15 border border-t-green/30" },
    maintenance: { label: "ซ่อมบำรุง", className: "text-t-orange bg-t-orange/15 border border-t-orange/30" },
  };
  const s = map[status] ?? { label: status, className: "text-t-muted bg-t-muted/15" };
  return (
    <span className={`text-[10px] font-black tracking-wider px-2 py-0.5 rounded-sm ${s.className}`}>
      {s.label.toUpperCase()}
    </span>
  );
}

function KpiCard({
  label, value, icon: Icon, colorKey, growth, delay = 0, suffix = ""
}: {
  label: string; value: number; icon: React.ElementType; colorKey: "accent" | "blue" | "orange" | "pink" | "green"; growth?: number; delay?: number; suffix?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const colorMap = {
    accent: { strip: "bg-t-accent", text: "text-t-accent", bg: "bg-t-accent/15", glow: "shadow-[0_0_15px_rgba(254,240,138,0.1)]" },
    blue: { strip: "bg-t-blue", text: "text-t-blue", bg: "bg-t-blue/15", glow: "shadow-[0_0_15px_rgba(186,230,253,0.1)]" },
    orange: { strip: "bg-t-orange", text: "text-t-orange", bg: "bg-t-orange/15", glow: "shadow-[0_0_15px_rgba(254,215,170,0.1)]" },
    pink: { strip: "bg-t-pink", text: "text-t-pink", bg: "bg-t-pink/15", glow: "shadow-[0_0_15px_rgba(251,207,232,0.1)]" },
    green: { strip: "bg-t-green", text: "text-t-green", bg: "bg-t-green/15", glow: "shadow-[0_0_15px_rgba(167,243,208,0.1)]" },
  }[colorKey];

  return (
    <div
      className={`relative overflow-hidden p-5 flex flex-col gap-4 transition-all duration-300 cursor-default group bg-t-card border border-t-border rounded-sm ${colorMap.glow}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${colorMap.strip}`} />
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-0.5 text-t-muted">
          {label}
        </p>
        <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 rounded-sm ${colorMap.bg}`}>
          <Icon className={`w-4 h-4 ${colorMap.text}`} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-black tracking-tight leading-none text-t-text">
          <AnimatedNumber target={value} />{suffix}
        </p>
      </div>
      {growth !== undefined && (
        <div className="flex items-center gap-1.5">
          {growth >= 0 ? <TrendingUp className="w-3 h-3 text-t-green" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
          <span className={`text-xs font-bold ${growth >= 0 ? "text-t-green" : "text-red-400"}`}>
            {growth >= 0 ? "+" : ""}{growth}%
          </span>
          <span className="text-[10px] text-t-muted opacity-80">vs เดือนก่อน</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* CUSTOM TOOLTIP FOR RECHARTS                 */
/* ─────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-t-card border border-t-border p-3 rounded-sm shadow-xl">
        <p className="text-t-text font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ─────────────────────────────────────────── */
/* VIEWS: ADMIN                                */
/* ─────────────────────────────────────────── */
function AdminView() {
  const d = ADMIN_KPI;
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="รายรับทั้งหมด" value={d.revenue} icon={CircleDollarSign} colorKey="accent" growth={d.growth} delay={0} suffix=" ฿" />
        <KpiCard label="รายได้อื่นๆ" value={d.other} icon={BarChart3} colorKey="blue" delay={80} suffix=" ฿" />
        <KpiCard label="ค่าล่วงเวลาคนขับ" value={d.ot} icon={Clock} colorKey="orange" delay={160} suffix=" ฿" />
        <KpiCard label="ค่าเช่าอุปกรณ์เสริม" value={d.babySeat} icon={Baby} colorKey="pink" delay={240} suffix=" ฿" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2 bg-t-card border border-t-border rounded-sm shadow-sm p-5">
          <div className="mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-t-accent" />
            <h2 className="text-sm font-black text-t-text tracking-wide">ภาพรวมรายได้ vs ค่าใช้จ่าย (รายสัปดาห์)</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-t-border)" opacity={0.5} vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `฿${val/1000}k`} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-t-muted)', opacity: 0.1 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="revenue" name="รายรับ" fill="var(--color-t-green)" radius={[2, 2, 0, 0]} barSize={24} />
                <Bar dataKey="expense" name="ค่าใช้จ่าย" fill="var(--color-t-orange)" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-t-card border border-t-border rounded-sm shadow-sm p-0 flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-t-border">
            <span className="text-sm font-black text-t-text">รายการจองล่าสุด</span>
            <Link href="/dashboard/bookings" className="text-[10px] font-black text-t-muted hover:text-t-text flex items-center gap-1">
              ดูทั้งหมด <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {RECENT_BOOKINGS.map((b) => (
              <div key={b.id} className="flex flex-col gap-2 p-3 hover:bg-t-muted/5 transition-colors border-b border-t-border/50 last:border-0">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black text-t-text">{b.customer}</span>
                  <StatusBadge status={b.status} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-t-muted font-bold">
                  <span>{b.vehicle}</span>
                  <span className="text-t-text">฿{b.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────── */
/* VIEWS: STAFF                                */
/* ─────────────────────────────────────────── */
function StaffView() {
  const d = STAFF_KPI;
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="จองรอตรวจสอบ" value={d.pendingBookings} icon={Clock} colorKey="orange" delay={0} suffix=" รายการ" />
        <KpiCard label="ตรวจสลิปโอนเงิน" value={d.slipCheck} icon={Wallet} colorKey="blue" delay={80} suffix=" รายการ" />
        <KpiCard label="ลูกค้าสมัครใหม่" value={d.newCustomers} icon={Users} colorKey="accent" delay={160} suffix=" คน" />
        <KpiCard label="ข้อความจากลูกค้า" value={d.support} icon={AlertCircle} colorKey="pink" delay={240} suffix=" ข้อความ" />
      </div>

      <div className="bg-t-card border border-t-border rounded-sm shadow-sm p-5 mt-5">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-t-blue" />
          <h2 className="text-sm font-black text-t-text tracking-wide">แนวโน้มปริมาณการจอง (Booking Trends)</h2>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={STAFF_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-t-border)" opacity={0.5} vertical={false} />
              <XAxis dataKey="name" stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Line type="monotone" dataKey="bookings" name="จองสำเร็จ" stroke="var(--color-t-accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-t-accent)' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="canceled" name="ยกเลิก" stroke="var(--color-t-pink)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-t-pink)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────── */
/* VIEWS: DRIVER                               */
/* ─────────────────────────────────────────── */
function DriverView() {
  const d = DRIVER_KPI;
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="ทริปที่วิ่งเดือนนี้" value={d.trips} icon={MapPin} colorKey="blue" delay={0} suffix=" ทริป" />
        <KpiCard label="ค่า OT สะสม" value={d.ot} icon={CircleDollarSign} colorKey="green" delay={80} suffix=" ฿" />
        <KpiCard label="ระยะทางรวม" value={d.distance} icon={Car} colorKey="orange" delay={160} suffix=" km" />
        <KpiCard label="คะแนนความพึงพอใจ" value={d.rating} icon={Award} colorKey="accent" delay={240} />
      </div>

      <div className="bg-t-card border border-t-border rounded-sm shadow-sm p-5 mt-5">
        <div className="mb-6 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-t-green" />
          <h2 className="text-sm font-black text-t-text tracking-wide">รายได้ค่าเบี้ยเลี้ยงและค่าล่วงเวลา (OT) รายวัน</h2>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DRIVER_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-t-border)" opacity={0.5} vertical={false} />
              <XAxis dataKey="name" stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-t-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-t-muted)', opacity: 0.1 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Bar dataKey="base" stackId="a" name="เบี้ยเลี้ยง" fill="var(--color-t-blue)" radius={[0, 0, 0, 0]} barSize={32} />
              <Bar dataKey="ot" stackId="a" name="ค่าล่วงเวลา (OT)" fill="var(--color-t-green)" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────── */
/* MAIN PAGE ORCHESTRATOR                      */
/* ─────────────────────────────────────────── */
export default function DashboardOverview() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchRole = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (data) setUserRole(data.role);
      } else {
        const match = document.cookie.match(/(?:^|; )mock_role=([^;]*)/);
        if (match) setUserRole(match[1]);
        else setUserRole("guest");
      }
    };
    fetchRole();
  }, []);

  if (!mounted || !userRole) {
    return <div className="p-10 flex items-center justify-center text-t-muted font-bold animate-pulse">กำลังโหลดข้อมูล Dashboard...</div>;
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-t-accent" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-t-muted">
              Live Overview / {userRole.toUpperCase()}
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-t-text">
            {userRole === 'admin' ? 'แดชบอร์ดสรุปผลประกอบการ' : 
             userRole === 'staff' ? 'ภาพรวมการปฏิบัติงานรายวัน' : 
             userRole === 'driver' ? 'ตารางงานและรายได้ของคุณ' : 'แดชบอร์ดสรุปภาพรวม'}
          </h1>
        </div>
      </div>

      {/* ── Dynamic View Based on Role ── */}
      {userRole === 'admin' && <AdminView />}
      {userRole === 'staff' && <StaffView />}
      {userRole === 'driver' && <DriverView />}
      {(userRole === 'guest' || userRole === 'customer') && (
        <div className="p-10 bg-t-card border border-t-border rounded text-center">
          <Car className="w-12 h-12 text-t-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-t-text mb-2">ยินดีต้อนรับสู่ระบบสมาชิก</h3>
          <p className="text-sm text-t-muted">ประวัติการจองและคะแนนสะสมของคุณจะแสดงที่นี่ในเร็วๆ นี้</p>
        </div>
      )}
    </div>
  );
}

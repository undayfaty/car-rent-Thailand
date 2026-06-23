"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/client";
import {
  LayoutDashboard,
  Users,
  CarFront,
  FileText,
  Settings,
  LogOut,
  Wallet,
  Bell,
  ChevronRight,
  Menu,
  X,
  Activity,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

type NavItem = { href: string; icon: LucideIcon; label: string; badge: string | null };
type NavGroup = { label: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "ADMIN",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "ภาพรวมระบบ", badge: null },
      { href: "/dashboard/settings", icon: Settings, label: "ตั้งค่าสิทธิ์", badge: null },
    ],
  },
  {
    label: "STAFF",
    items: [
      { href: "/dashboard/bookings", icon: FileText, label: "รายการจอง", badge: "5" },
      { href: "/dashboard/customers", icon: Users, label: "ลูกค้า & เอกสาร", badge: "2" },
      { href: "/dashboard/payments", icon: Wallet, label: "ตรวจสอบชำระเงิน", badge: "3" },
    ],
  },
  {
    label: "DRIVER",
    items: [
      { href: "/dashboard/vehicles", icon: CarFront, label: "จัดการรถ & คนขับ", badge: null },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Loading...");
  const [userInitial, setUserInitial] = useState<string>("-");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    const fetchUserRole = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('role, first_name').eq('id', user.id).single();
        if (data) {
          setUserRole(data.role);
          setUserName(data.first_name || "User");
          setUserInitial((data.first_name || "U")[0].toUpperCase());
        }
      } else {
        const match = document.cookie.match(/(?:^|; )mock_role=([^;]*)/);
        if (match) {
          const role = match[1];
          setUserRole(role);
          setUserName(role.charAt(0).toUpperCase() + role.slice(1));
          setUserInitial(role.charAt(0).toUpperCase());
        } else {
          setUserName("Guest");
          setUserInitial("G");
        }
      }
    };
    fetchUserRole();

    return () => clearInterval(interval);
  }, []);

  const currentLabel =
    NAV_GROUPS.flatMap((g) => g.items).find((item) => {
      const basePath = pathname.replace(/^\/[a-z]{2}/, "");
      return basePath === item.href || (item.href !== "/dashboard" && basePath.startsWith(item.href));
    })?.label ?? "Dashboard";

  const filteredNavGroups = NAV_GROUPS.filter(group => {
    if (!userRole) return false; // Hide until loaded
    if (userRole === 'admin') return true;
    if (userRole === 'staff' && group.label === 'STAFF') return true;
    if (userRole === 'driver' && group.label === 'DRIVER') return true;
    return false;
  });

  return (
    <div className="min-h-screen flex bg-t-bg text-t-text transition-colors duration-300">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR — Sharp Command Rail */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col bg-t-sidebar border-r border-t-border transition-all duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ width: "260px" }}
      >
        {/* Logo Zone */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-t-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-t-accent border border-surface-900/20 rounded shadow-sm">
              <Activity className="w-4 h-4 text-t-accent-fg" />
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-t-accent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [-webkit-text-stroke:0.5px_rgba(0,0,0,0.3)]">
                Car Rent
              </p>
              <p className="text-[10px] tracking-wider text-t-muted font-bold">
                COMMAND CENTER
              </p>
            </div>
          </div>
          <button
            aria-label="ปิดเมนู"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded text-t-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Clock */}
        {mounted && (
          <div className="px-5 py-3 border-b border-t-border">
            <p className="text-xs font-bold text-t-muted">เวลาปัจจุบัน</p>
            <p className="text-xl font-black tracking-widest text-t-accent drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [-webkit-text-stroke:0.5px_rgba(0,0,0,0.3)] mt-0.5">
              {time} น.
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {filteredNavGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 mb-2 text-[10px] font-black tracking-[0.2em] text-t-muted opacity-70">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const basePath = pathname.replace(/^\/[a-z]{2}/, "");
                  const isActive =
                    basePath === item.href ||
                    (item.href !== "/dashboard" && basePath.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 transition-all duration-150 group relative ${
                        isActive ? "bg-t-accent text-t-accent-fg" : "text-t-muted hover:text-t-text"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-t-accent-fg" />
                      )}
                      <item.icon
                        className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-t-accent-fg" : "text-t-muted group-hover:text-t-text"}`}
                      />
                      <span className="text-sm font-semibold flex-1">
                        {item.label}
                      </span>
                      {item.badge && !isActive && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 min-w-[18px] text-center bg-t-accent text-t-accent-fg">
                          {item.badge}
                        </span>
                      )}
                      {!isActive && (
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-t-accent" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-t-border">
          <button
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              document.cookie = "mock_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150 group text-t-muted hover:text-red-400"
          >
            <LogOut className="w-4 h-4 transition-colors" />
            <span className="text-sm font-semibold transition-colors">
              ออกจากระบบ
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-5 py-3 flex-shrink-0 bg-t-sidebar border-b border-t-border h-14">
          <div className="flex items-center gap-3">
            <button
              aria-label="เปิดเมนู"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-t-muted"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase text-t-muted opacity-50">/</span>
              <span className="text-sm font-bold text-t-text">{currentLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-t-muted hover:text-t-text transition-colors"
              aria-label="สลับธีม"
            >
              {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* Notification Bell */}
            <button aria-label="การแจ้งเตือน" className="relative p-2 transition-colors text-t-muted hover:text-t-text">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-t-accent rounded-full" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-7 h-7 flex items-center justify-center text-xs font-black transition-all bg-t-accent text-t-accent-fg">
                {userInitial}
              </div>
              <span className="text-xs font-semibold hidden sm:block text-t-muted group-hover:text-t-text">
                {userName}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-t-bg">
          <div
            className="p-5 md:p-7"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

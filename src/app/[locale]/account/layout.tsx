"use client";

import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import {
  FileText,
  Settings,
  LogOut,
  Car,
  ChevronRight,
  Menu,
  X,
  User,
} from "lucide-react";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/account/bookings", icon: FileText, label: "ประวัติการจอง" },
  { href: "/account/settings", icon: Settings, label: "ตั้งค่าบัญชีและเอกสาร" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLabel =
    NAV_ITEMS.find((item) => {
      const basePath = pathname.replace(/^\/[a-z]{2}/, "");
      return basePath.startsWith(item.href);
    })?.label ?? "บัญชีของฉัน";

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-out glass dark:glass-dark border-r border-surface-200 dark:border-surface-800 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ width: "280px" }}
      >
        {/* Logo Zone */}
        <div className="flex items-center justify-center p-6 border-b border-surface-200 dark:border-surface-800">
          <Logo />
        </div>

        {/* User Info (Mockup) */}
        <div className="p-6 border-b border-surface-200 dark:border-surface-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">สมชาย ลูกค้าดี</h2>
            <p className="text-sm text-surface-500">somchai@email.com</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-2 px-4 text-xs font-black text-surface-400 uppercase tracking-wider">เมนูหลัก</div>
          {NAV_ITEMS.map((item) => {
            const basePath = pathname.replace(/^\/[a-z]{2}/, "");
            const isActive = basePath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                    : "text-surface-600 dark:text-surface-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-8 mb-2 px-4 text-xs font-black text-surface-400 uppercase tracking-wider">ระบบ</div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
          >
            <Car className="w-5 h-5" /> กลับหน้าแรก
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-800">
          <form action="/actions/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 glass dark:glass-dark border-b border-surface-200 dark:border-surface-800 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-surface-500">
              <span>บัญชีของฉัน</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-600 dark:text-brand-400">{currentLabel}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

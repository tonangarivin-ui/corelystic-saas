"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  Users,
  Package,
  Tag,
  CreditCard,
  Target,
  BarChart2,
  Megaphone,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

const mainNav = [
  { label: "Dashboards", icon: LayoutGrid, active: true },
  { label: "Customers", icon: Users },
  { label: "Orders", icon: Package },
  { label: "Products", icon: Tag },
  { label: "Transactions", icon: CreditCard },
];

const growthNav = [
  { label: "Goals & Target", icon: Target },
  { label: "Sales Performance", icon: BarChart2 },
  { label: "Marketing", icon: Megaphone },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(true);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="relative w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-[15px] font-semibold text-slate-800 tracking-tight">
            Corelytic
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden lg:flex w-6 h-6 items-center justify-center rounded-md hover:bg-slate-100 text-slate-400"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${collapsed ? "-rotate-90" : "rotate-0"}`} />
        </button>
      </div>

      <nav className="flex-1 px-3 mt-2 overflow-y-auto">
        <p className={`text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2 ${collapsed ? "text-center" : "px-2"}`}>
          {collapsed ? "..." : "Main Navigation"}
        </p>
        <ul className="space-y-0.5">
          {mainNav.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                  item.active
                    ? "bg-active-lavender text-active-lavender-text"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>

        <p className={`text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-6 mb-2 ${collapsed ? "text-center" : "px-2"}`}>
          {collapsed ? "..." : "Growth Tools"}
        </p>
        <ul className="space-y-0.5">
          {growthNav.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-3 pb-4 space-y-1">
        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[14px] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <HelpCircle className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Help Center</span>}
        </a>
        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[14px] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </a>

        {!collapsed && (
          <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <button
              onClick={() => setProfileExpanded(!profileExpanded)}
              className="flex items-center gap-3 w-full text-left"
              aria-expanded={profileExpanded}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
                <Image
                  src="/assets/eugene-avatar.jpg"
                  alt="Eugene Lamar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-800 truncate">Eugene Lamar</p>
                <p className="text-[11px] text-slate-400 truncate">example@mail.com</p>
              </div>
              {profileExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
            </button>
            {profileExpanded && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Control Panel</span>
                <Link
                  href="/admin"
                  className="px-2 py-0.5 rounded-md bg-[#00C48C]/15 hover:bg-[#00C48C]/25 text-[#00A877] text-[11px] font-bold transition"
                >
                  Admin →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 transition-all duration-200 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {sidebarContent}
      </aside>
    </>
  );
}

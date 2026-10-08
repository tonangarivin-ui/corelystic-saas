"use client";

import { Search, Bell, Download, LayoutGrid } from "lucide-react";

export default function TopToolbar() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
      <nav className="flex items-center gap-2 text-[13px]">
        <LayoutGrid className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400">Dashboards</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium">Data</span>
      </nav>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-16 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
}

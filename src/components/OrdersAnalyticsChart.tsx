"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { monthlyAnalytics } from "@/data/mock-analytics";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-lg text-[13px]">
      <p className="font-semibold">${(payload[0].value / 1000).toFixed(0)},000</p>
      <p className="text-slate-400 text-[11px]">{label}</p>
    </div>
  );
}

export default function OrdersAnalyticsChart() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[16px] font-semibold text-slate-900">Orders Analytics</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
              Income
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              Expense
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1.5 text-[13px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors"
          >
            This Year
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-10 min-w-[120px]">
              {["This Year", "Last Year", "All Time"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilterOpen(false)}
                  className="w-full text-left px-3 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C48C" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00C48C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1e293b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00C48C"
              strokeWidth={2.5}
              fill="url(#incomeGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#00C48C", stroke: "#fff", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#1e293b"
              strokeWidth={2}
              fill="url(#expenseGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#1e293b", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

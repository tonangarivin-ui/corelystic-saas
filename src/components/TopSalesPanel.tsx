"use client";

import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { Info, ArrowRight } from "lucide-react";
import { topSalesData } from "@/data/mock-analytics";

export default function TopSalesPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 w-full lg:w-[340px] flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-semibold text-slate-900">Top Sales</h3>
          <Info className="w-4 h-4 text-slate-400" />
        </div>
        <button className="flex items-center gap-1 text-[13px] text-brand-green font-medium hover:underline">
          See Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[32px] font-bold text-slate-900 tracking-tight">
          {topSalesData.total.toLocaleString()}
        </span>
        <span className="text-[13px] font-semibold text-brand-green bg-emerald-50 px-2 py-0.5 rounded-full">
          {topSalesData.badge}
        </span>
      </div>

      <div className="h-[100px] mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topSalesData.barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C48C" />
                <stop offset="100%" stopColor="#00C48C" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <Bar dataKey="value" fill="url(#barGrad)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {topSalesData.categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <div>
                <p className="text-[13px] font-medium text-slate-800">{cat.name}</p>
                <p className="text-[12px] text-slate-400">{cat.sales} Sales</p>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-brand-green bg-emerald-50 px-2 py-0.5 rounded-full">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

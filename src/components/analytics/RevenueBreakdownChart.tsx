"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";

interface MonthlyPoint {
  month: string;
  income: number;
  expense: number;
  profit: number;
}

export default function RevenueBreakdownChart({
  data,
}: {
  data: MonthlyPoint[];
}) {
  const filter = "Full Year 2026";

  const formatYAxis = (v: number) => `$${(v / 1000).toFixed(0)}k`;

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Revenue &amp; P&amp;L Performance
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Gross revenue vs operational costs vs net retained earnings
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
              Income
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              Net Profit
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              Expense
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{filter}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="analyticsGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C48C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00C48C" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="analyticsPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl border border-slate-800 text-xs space-y-1">
                      <p className="font-bold text-slate-300 border-b border-slate-800 pb-1 mb-1">
                        {label} 2026
                      </p>
                      <p className="text-emerald-400 font-semibold">
                        Revenue: ${payload[0]?.value?.toLocaleString()}
                      </p>
                      <p className="text-purple-300 font-semibold">
                        Profit: ${payload[1]?.value?.toLocaleString()}
                      </p>
                      <p className="text-slate-400">
                        Expense: ${payload[2]?.value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00C48C"
              strokeWidth={2.5}
              fill="url(#analyticsGreen)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#7C3AED"
              strokeWidth={2.5}
              fill="url(#analyticsPurple)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#CBD5E1"
              strokeWidth={1.5}
              fill="transparent"
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

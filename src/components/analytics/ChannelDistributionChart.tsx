"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Info } from "lucide-react";

const channelData = [
  { name: "Online Storefront", value: 58, color: "#00C48C" },
  { name: "Mobile App Checkout", value: 26, color: "#7C3AED" },
  { name: "Social Commerce", value: 12, color: "#3B82F6" },
  { name: "Marketplaces (API)", value: 4, color: "#F59E0B" },
];

export default function ChannelDistributionChart() {
  return (
    <div className="w-full lg:w-[360px] bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-bold text-slate-900">
              Channel Volume
            </h3>
            <Info className="w-4 h-4 text-slate-300" />
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Top: Web 58%
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-2">
          Origin distribution across sales touchpoints
        </p>

        <div className="h-[180px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs shadow-md">
                        <span className="font-semibold">{payload[0].name}: </span>
                        <span>{payload[0].value}%</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-900">100%</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Share</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-100">
        {channelData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-slate-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

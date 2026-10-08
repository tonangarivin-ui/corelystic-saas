import { DollarSign, ClipboardCheck, Users, TrendingUp } from "lucide-react";
import { kpiData } from "@/data/mock-analytics";

const iconMap = {
  dollar: DollarSign,
  check: ClipboardCheck,
  users: Users,
} as const;

const gradientMap = {
  lavender: "from-kpi-lavender-from to-kpi-lavender-to",
  mint: "from-kpi-mint-from to-kpi-mint-to",
  blue: "from-kpi-blue-from to-kpi-blue-to",
} as const;

const iconBgMap = {
  lavender: "bg-violet-100 text-violet-600",
  mint: "bg-emerald-100 text-emerald-600",
  blue: "bg-blue-100 text-blue-600",
} as const;

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6">
      {kpiData.map((kpi) => {
        const Icon = iconMap[kpi.icon];
        return (
          <div
            key={kpi.label}
            className={`bg-gradient-to-br ${gradientMap[kpi.gradient]} rounded-2xl p-5 border border-white/60`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-slate-500 font-medium">{kpi.label}</p>
                <p className="text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                  {kpi.value}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgMap[kpi.gradient]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
              <span className="text-[12px] text-brand-green font-medium">{kpi.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

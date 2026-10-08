import { Target, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";
import type { Goal } from "@prisma/client";

export default function GoalsStats({ goals }: { goals: Goal[] }) {
  const total = goals.length;
  const completed = goals.filter((g) => g.status === "COMPLETED").length;
  const onTrack = goals.filter((g) => g.status === "ON_TRACK").length;
  const behind = goals.filter((g) => g.status === "BEHIND").length;

  const totalProgress =
    total > 0
      ? goals.reduce((acc, g) => {
          const pct = Math.min((g.currentVal / g.targetVal) * 100, 100);
          return acc + pct;
        }, 0) / total
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Overall Milestone Score
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {totalProgress.toFixed(1)}%
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            Weighted target velocity
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <Target className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Completed Goals
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {completed} of {total}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            100% quota achieved
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Pacing On Track
          </p>
          <p className="text-2xl font-bold text-slate-800">{onTrack}</p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Expected to hit deadline
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Needs Focus / Behind
          </p>
          <p className="text-2xl font-bold text-slate-800">{behind}</p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Action plan recommended
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

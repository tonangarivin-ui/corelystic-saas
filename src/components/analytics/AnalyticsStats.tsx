import { DollarSign, TrendingUp, Percent, ShoppingBag } from "lucide-react";

interface SummaryProps {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
  aov: number;
  totalOrders: number;
}

export default function AnalyticsStats({ summary }: { summary: SummaryProps }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            YTD Gross Revenue
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${summary.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            +18.4% YoY performance
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Net Operating Profit
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${summary.netProfit.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            After COGS &amp; fulfillment
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Operating Margin
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {summary.profitMargin.toFixed(1)}%
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Healthy SaaS benchmark
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <Percent className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Average Order Value (AOV)
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${summary.aov.toFixed(2)}
          </p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Across {summary.totalOrders} transactions
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <ShoppingBag className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

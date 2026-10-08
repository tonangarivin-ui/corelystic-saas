import { Megaphone, DollarSign, TrendingUp, Tag } from "lucide-react";
import type { Campaign } from "@prisma/client";

export default function MarketingStats({ campaigns }: { campaigns: Campaign[] }) {
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const roas = totalSpent > 0 ? (totalRevenue / totalSpent).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Attributed Revenue
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Tracked promo conversions
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Overall Blended ROAS
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {roas}x
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            Return on ad spend
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Coupon Redemptions
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {totalConversions.toLocaleString()} orders
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Discount code applications
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <Tag className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Marketing Ad Spend
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Deployed ad budget
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <Megaphone className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

import { Users, UserCheck, Award, DollarSign } from "lucide-react";
import type { Customer } from "@prisma/client";

export default function CustomersStats({ customers }: { customers: Customer[] }) {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active" || c.status === "VIP").length;
  const vipCustomers = customers.filter((c) => c.status === "VIP").length;
  const avgLTV =
    totalCustomers > 0
      ? customers.reduce((acc, c) => acc + c.totalSpent, 0) / totalCustomers
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Customers
          </p>
          <p className="text-2xl font-bold text-slate-800">{totalCustomers}</p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            Across 5+ countries
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Active Accounts
          </p>
          <p className="text-2xl font-bold text-slate-800">{activeCustomers}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            High retention rate
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            VIP Tier
          </p>
          <p className="text-2xl font-bold text-slate-800">{vipCustomers}</p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Top spenders (&gt;$500)
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Avg Customer LTV
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${avgLTV.toFixed(2)}
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Lifetime spend value
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

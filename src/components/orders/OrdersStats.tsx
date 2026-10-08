import { Package, CheckCircle2, Clock, DollarSign } from "lucide-react";
import type { Order } from "@prisma/client";

export default function OrdersStats({ orders }: { orders: Order[] }) {
  const totalCount = orders.length;
  const completedCount = orders.filter((o) => o.status === "COMPLETED").length;
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const totalVolume = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-slate-800">{totalCount}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            +12.4% this month
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Completed
          </p>
          <p className="text-2xl font-bold text-slate-800">{completedCount}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Fulfilled & Paid
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Pending Review
          </p>
          <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Awaiting Confirmation
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Gross Volume
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalVolume.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            All-time revenue
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

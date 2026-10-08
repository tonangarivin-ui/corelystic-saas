import { ArrowDownLeft, ArrowUpRight, RotateCcw, Percent } from "lucide-react";
import type { Transaction } from "@prisma/client";

export default function TransactionsStats({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const payments = transactions
    .filter((t) => t.type === "PAYMENT" && t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const payouts = transactions
    .filter((t) => t.type === "PAYOUT" && t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const refunds = transactions
    .filter((t) => t.type === "REFUND")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Inflow
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${payments.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Customer checkout volume
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <ArrowDownLeft className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Completed Payouts
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${payouts.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            Settled to merchant bank
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Refunds &amp; Disputes
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${refunds.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Low dispute rate (&lt;1%)
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <RotateCcw className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Gateway Fees
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalFees.toFixed(2)}
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Stripe &amp; PayPal interchange
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <Percent className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

import { Package, CheckCircle2, AlertTriangle, DollarSign } from "lucide-react";
import type { Product } from "@prisma/client";

export default function ProductsStats({ products }: { products: Product[] }) {
  const totalItems = products.length;
  const inStockCount = products.filter((p) => p.status === "IN_STOCK").length;
  const attentionCount = products.filter(
    (p) => p.status === "LOW_STOCK" || p.status === "OUT_OF_STOCK"
  ).length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 rounded-2xl border border-purple-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Catalog Items
          </p>
          <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
          <p className="text-xs text-purple-600 font-semibold mt-1">
            {totalStockUnits.toLocaleString()} units in inventory
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-700">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Healthy Stock
          </p>
          <p className="text-2xl font-bold text-slate-800">{inStockCount}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Ready for dispatch
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Needs Restock
          </p>
          <p className="text-2xl font-bold text-slate-800">{attentionCount}</p>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            Low or Zero stock
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Inventory Valuation
          </p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalValuation.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            Estimated market value
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

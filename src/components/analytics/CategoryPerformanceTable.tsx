import { Layers, TrendingUp } from "lucide-react";

interface CategoryData {
  category: string;
  revenue: number;
  itemsCount: number;
  stock: number;
}

export default function CategoryPerformanceTable({
  categories,
}: {
  categories: CategoryData[];
}) {
  const totalRev = categories.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 mx-6 mb-8 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Category Contribution &amp; Velocity
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Direct SKU revenue attribution calculated from Neon PostgreSQL
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-green font-semibold bg-emerald-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          Active Catalog Segments
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Product Category</th>
              <th className="py-3.5 px-6">Catalog SKUs</th>
              <th className="py-3.5 px-6">Available Stock</th>
              <th className="py-3.5 px-6">Generated Revenue</th>
              <th className="py-3.5 px-6">Share of Revenue</th>
              <th className="py-3.5 px-6 text-right">Performance Rank</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {categories.map((c, idx) => {
              const share = totalRev > 0 ? (c.revenue / totalRev) * 100 : 0;
              return (
                <tr key={c.category} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span>{c.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-semibold">
                    {c.itemsCount} products
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {c.stock.toLocaleString()} units
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    ${c.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-brand-green rounded-full"
                          style={{ width: `${Math.min(share, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {share.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      #{idx + 1}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

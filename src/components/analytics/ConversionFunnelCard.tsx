import { ArrowRight, Users, Eye, ShoppingCart, CreditCard, CheckCircle2 } from "lucide-react";

const funnelStages = [
  { label: "Store Visitors", value: "45,200", pct: "100%", icon: Users, color: "bg-slate-100 text-slate-700" },
  { label: "Product Views", value: "18,400", pct: "40.7%", icon: Eye, color: "bg-blue-50 text-blue-700" },
  { label: "Added to Cart", value: "4,210", pct: "9.3%", icon: ShoppingCart, color: "bg-purple-50 text-purple-700" },
  { label: "Checkout Begun", value: "2,150", pct: "4.8%", icon: CreditCard, color: "bg-amber-50 text-amber-700" },
  { label: "Completed Orders", value: "1,725", pct: "3.8%", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700" },
];

export default function ConversionFunnelCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mx-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Storefront Conversion Funnel
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Traffic attribution from raw visitor sessions down to completed checkouts
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold border border-purple-100">
          Global Conversion: 3.82%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {funnelStages.map((stage, idx) => (
          <div
            key={stage.label}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between relative group hover:border-slate-200 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stage.color}`}>
                  <stage.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {stage.pct}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">{stage.label}</p>
            </div>
            <div className="mt-4">
              <p className="text-xl font-extrabold text-slate-900">{stage.value}</p>
              {idx < funnelStages.length - 1 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

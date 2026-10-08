import { SlidersHorizontal } from "lucide-react";

export default function MainHeader() {
  return (
    <div className="flex items-start justify-between px-6 pt-6 pb-2">
      <div>
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
          Your Store at a Glance
        </h1>
        <p className="text-[14px] text-slate-500 mt-1">
          Real-time snapshot of revenue, orders, and customers
        </p>
      </div>
      <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-colors">
        <SlidersHorizontal className="w-4 h-4" />
        Customize Widget
      </button>
    </div>
  );
}

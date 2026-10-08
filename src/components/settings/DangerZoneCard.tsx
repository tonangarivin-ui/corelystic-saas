"use client";

import { useState } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function DangerZoneCard() {
  const [cleared, setCleared] = useState(false);

  const handleFlushCache = () => {
    if (confirm("Flush Next.js edge caching and trigger revalidation for all routes?")) {
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-6 mb-8">
      <div className="flex items-center gap-3 pb-4 border-b border-rose-100/60 mb-5">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Maintenance &amp; Danger Zone
          </h3>
          <p className="text-xs text-slate-400">
            Global cache purging and database state maintenance
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-rose-50/30 border border-rose-100">
        <div>
          <p className="text-sm font-bold text-slate-800">
            Purge Edge Cache &amp; Revalidate
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Forces all edge network CDN nodes to fetch fresh queries from Neon DB
          </p>
        </div>

        <button
          onClick={handleFlushCache}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/15 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {cleared ? "Cache Cleared!" : "Purge CDN Cache"}
        </button>
      </div>
    </div>
  );
}

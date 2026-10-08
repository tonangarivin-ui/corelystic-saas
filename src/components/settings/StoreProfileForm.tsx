"use client";

import { useState, useTransition } from "react";
import { Store, Save, Loader2, Check } from "lucide-react";
import { updateStoreSettingsAction } from "@/app/actions/settings";

interface Props {
  initialStore: {
    name: string;
    currency: string;
    slug: string;
  };
}

export default function StoreProfileForm({ initialStore }: Props) {
  const [name, setName] = useState(initialStore.name);
  const [currency, setCurrency] = useState(initialStore.currency);
  const [supportEmail, setSupportEmail] = useState("support@corelytic.com");
  const [timezone, setTimezone] = useState("UTC+00:00 (London, UTC)");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    startTransition(async () => {
      const res = await updateStoreSettingsAction({
        name,
        currency,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
          <Store className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Store Profile &amp; Regional Localization
          </h3>
          <p className="text-xs text-slate-400">
            Brand name, currency symbol, and regional timezone
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500" />
          Settings successfully synchronized to Neon PostgreSQL!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Storefront Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Store Workspace Slug
            </label>
            <input
              type="text"
              disabled
              value={initialStore.slug}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-100 text-sm bg-slate-50 text-slate-400 cursor-not-allowed font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Base Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="IDR">IDR (Rp)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Store Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
            >
              <option value="UTC+00:00 (London, UTC)">UTC+00:00 (London, UTC)</option>
              <option value="UTC+07:00 (Jakarta, WIB)">UTC+07:00 (Jakarta, WIB)</option>
              <option value="UTC-05:00 (New York, EST)">UTC-05:00 (New York, EST)</option>
              <option value="UTC+09:00 (Tokyo, JST)">UTC+09:00 (Tokyo, JST)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold rounded-xl shadow-md shadow-brand-green/15 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}

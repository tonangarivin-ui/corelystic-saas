"use client";

import { useState, useTransition } from "react";
import { X, Loader2, Plus, Megaphone } from "lucide-react";
import { createCampaignAction } from "@/app/actions/marketing";
import { DiscountType, type Campaign } from "@prisma/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: Campaign) => void;
}

export default function CreateCampaignModal({
  open,
  onClose,
  onCampaignCreated,
}: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>(DiscountType.PERCENTAGE);
  const [discountVal, setDiscountVal] = useState("15");
  const [channel, setChannel] = useState("Email Newsletter");
  const [budget, setBudget] = useState("500");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !discountVal) return;
    setError(null);

    startTransition(async () => {
      const res = await createCampaignAction({
        name,
        code,
        discountType,
        discountVal: parseFloat(discountVal),
        channel,
        budget: parseFloat(budget) || 0,
      });

      if (res.success && res.campaign) {
        onCampaignCreated(res.campaign);
        setName("");
        setCode("");
        setDiscountVal("15");
        onClose();
      } else {
        setError(res.error || "Failed to create campaign");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Create Promotion Campaign
              </h2>
              <p className="text-xs text-slate-400">
                Issue discount code and track ROAS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Campaign Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cyber Monday Flash Sale"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Promo Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="CYBER20"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Discount Value
              </label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  step="0.01"
                  required
                  value={discountVal}
                  onChange={(e) => setDiscountVal(e.target.value)}
                  placeholder="20"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
                />
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                  className="px-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-600 focus:outline-none"
                >
                  <option value={DiscountType.PERCENTAGE}>%</option>
                  <option value={DiscountType.FIXED_AMOUNT}>$</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Acquisition Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
              >
                <option value="Email Newsletter">Email Newsletter</option>
                <option value="Instagram Ads">Instagram Ads</option>
                <option value="Google Search">Google Search</option>
                <option value="Customer Retention">Customer Retention</option>
                <option value="Automated Flow">Automated Flow</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Ad Budget ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="500.00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 px-4 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold shadow-md shadow-brand-green/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Launch Promo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Key, Copy, Check, Webhook, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ApiIntegrationsCard() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const apiKey = "pk_live_corelytic_88a91b402efc99182a0b1c";
  const webhookUrl = "https://corelystic-saas.vercel.app/api/webhooks/v1";

  const handleCopy = (text: string, isKey: boolean) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedWebhook(true);
      setTimeout(() => setCopiedWebhook(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
          <Key className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Developer API Keys &amp; Webhooks
          </h3>
          <p className="text-xs text-slate-400">
            Programmatic access tokens and webhook ingestion endpoints
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
            Live Production API Key
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 text-slate-700 select-all"
            />
            <button
              onClick={() => handleCopy(apiKey, true)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
              title="Copy API Key"
            >
              {copiedKey ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
            Webhook Delivery Endpoint
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={webhookUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 text-slate-700 select-all"
            />
            <button
              onClick={() => handleCopy(webhookUrl, false)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
              title="Copy Webhook URL"
            >
              {copiedWebhook ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Webhook className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
          Connected Infrastructure &amp; Services
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800">Neon PostgreSQL</p>
              <p className="text-[11px] text-emerald-700">Schema Synced Live</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-purple-100 bg-purple-50/50 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800">Vercel Edge CDN</p>
              <p className="text-[11px] text-purple-700">Production Deployed</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800">Stripe &amp; Gateways</p>
              <p className="text-[11px] text-blue-700">Webhooks Listening</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

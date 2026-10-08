"use client";

import { useState, useTransition } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Copy,
  Check,
  Megaphone,
  CheckCircle2,
  Clock,
  PauseCircle,
  Share2,
} from "lucide-react";
import {
  toggleCampaignStatusAction,
  deleteCampaignAction,
} from "@/app/actions/marketing";
import CreateCampaignModal from "./CreateCampaignModal";
import { CampaignStatus, type Campaign } from "@prisma/client";

export default function CampaignsTable({
  initialCampaigns,
}: {
  initialCampaigns: Campaign[];
}) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const channels = Array.from(new Set(campaigns.map((c) => c.channel)));

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    const matchesChannel =
      channelFilter === "ALL" || c.channel === channelFilter;
    const matchesStatus =
      statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: CampaignStatus) => {
    startTransition(async () => {
      const res = await toggleCampaignStatusAction(id, newStatus);
      if (res.success && res.campaign) {
        setCampaigns(
          campaigns.map((c) => (c.id === id ? res.campaign : c))
        );
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    startTransition(async () => {
      const res = await deleteCampaignAction(id);
      if (res.success) {
        setCampaigns(campaigns.filter((c) => c.id !== id));
      }
    });
  };

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Active
          </span>
        );
      case "PAUSED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
            Paused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 mx-6 mb-8 overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 border-b border-slate-100">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Promotions &amp; Campaign Performance
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredCampaigns.length} of {campaigns.length} promotional strategies
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaign or promo code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
            />
          </div>

          {/* Channel Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setChannelDropdownOpen(!channelDropdownOpen);
                setStatusDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <span>{channelFilter === "ALL" ? "All Channels" : channelFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {channelDropdownOpen && (
              <div className="absolute left-0 sm:right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[160px] text-[13px]">
                <button
                  onClick={() => {
                    setChannelFilter("ALL");
                    setChannelDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                    channelFilter === "ALL"
                      ? "text-brand-green font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  All Channels
                </button>
                {channels.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => {
                      setChannelFilter(ch);
                      setChannelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      channelFilter === ch
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setStatusDropdownOpen(!statusDropdownOpen);
                setChannelDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <span>{statusFilter === "ALL" ? "All Status" : statusFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                {["ALL", "ACTIVE", "PAUSED", "COMPLETED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setStatusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      statusFilter === st
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {st === "ALL"
                      ? "All Status"
                      : st.charAt(0) + st.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Launch Campaign Button */}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Campaign &amp; Offer</th>
              <th className="py-3.5 px-6">Promo Code</th>
              <th className="py-3.5 px-6">Channel</th>
              <th className="py-3.5 px-6">Redemptions</th>
              <th className="py-3.5 px-6">Ad Spend</th>
              <th className="py-3.5 px-6">Revenue</th>
              <th className="py-3.5 px-6">ROAS Multiplier</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-slate-400">
                  <Megaphone className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No marketing campaigns match your filter.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((c) => {
                const roas =
                  c.spent > 0 ? (c.revenue / c.spent).toFixed(1) + "x" : "—";

                return (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-xs text-purple-600 font-semibold mt-0.5">
                        {c.discountVal}
                        {c.discountType === "PERCENTAGE" ? "% OFF" : "$ OFF"}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleCopy(c.code)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-800 transition cursor-pointer"
                        title="Click to copy coupon code"
                      >
                        {c.code}
                        {copiedCode === c.code ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                      <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                        <Share2 className="w-3 h-3 text-slate-400" />
                        {c.channel}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {c.conversions.toLocaleString()} orders
                      <div className="text-[11px] text-slate-400 font-normal">
                        {c.clicks.toLocaleString()} clicks
                      </div>
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-600">
                      ${c.spent.toFixed(2)}
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900">
                      ${c.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-extrabold bg-emerald-50 text-emerald-700">
                        {roas}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(c.status)}
                        <select
                          value={c.status}
                          disabled={isPending}
                          onChange={(e) =>
                            handleStatusChange(c.id, e.target.value as CampaignStatus)
                          }
                          className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:border-brand-green cursor-pointer"
                        >
                          <option value="ACTIVE">Set Active</option>
                          <option value="PAUSED">Set Paused</option>
                          <option value="COMPLETED">Set Completed</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <CreateCampaignModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCampaignCreated={(newCamp) =>
          setCampaigns([newCamp, ...campaigns])
        }
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
} from "lucide-react";
import RecordTransactionModal from "./RecordTransactionModal";
import { TransactionType, TransactionStatus, type Transaction } from "@prisma/client";

export default function TransactionsTable({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [methodFilter, setMethodFilter] = useState<string>("ALL");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [methodDropdownOpen, setMethodDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const methods = Array.from(
    new Set(transactions.map((t) => t.paymentMethod).filter(Boolean))
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.referenceId.toLowerCase().includes(search.toLowerCase()) ||
      (t.customerEmail && t.customerEmail.toLowerCase().includes(search.toLowerCase())) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === "ALL" || t.type === typeFilter;
    const matchesMethod = methodFilter === "ALL" || t.paymentMethod === methodFilter;
    return matchesSearch && matchesType && matchesMethod;
  });

  const getTypeBadge = (type: TransactionType) => {
    switch (type) {
      case "PAYMENT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
            Customer Payment
          </span>
        );
      case "PAYOUT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-500" />
            Bank Payout
          </span>
        );
      case "REFUND":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            Refund Issued
          </span>
        );
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Settled
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 mx-6 mb-8 overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 border-b border-slate-100">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Gateway Settlements &amp; Ledger
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredTransactions.length} of {transactions.length} records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, email, note..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setTypeDropdownOpen(!typeDropdownOpen);
                setMethodDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <span>{typeFilter === "ALL" ? "All Types" : typeFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {typeDropdownOpen && (
              <div className="absolute left-0 sm:right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                {["ALL", "PAYMENT", "PAYOUT", "REFUND"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTypeFilter(t);
                      setTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      typeFilter === t
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {t === "ALL" ? "All Types" : t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Method Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setMethodDropdownOpen(!methodDropdownOpen);
                setTypeDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>{methodFilter === "ALL" ? "All Methods" : methodFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {methodDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                <button
                  onClick={() => {
                    setMethodFilter("ALL");
                    setMethodDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                    methodFilter === "ALL"
                      ? "text-brand-green font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  All Methods
                </button>
                {methods.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMethodFilter(m);
                      setMethodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      methodFilter === m
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Record Transaction Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Record Transaction
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Reference ID</th>
              <th className="py-3.5 px-6">Date &amp; Time</th>
              <th className="py-3.5 px-6">Transaction Type</th>
              <th className="py-3.5 px-6">Payment Method</th>
              <th className="py-3.5 px-6">Gross Amount</th>
              <th className="py-3.5 px-6">Gateway Fee</th>
              <th className="py-3.5 px-6">Net Amount</th>
              <th className="py-3.5 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-400">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No transactions match your search filter.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <span className="text-purple-600 mr-0.5">#</span>
                    {t.referenceId}
                    {t.description && (
                      <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                        {t.description}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium whitespace-nowrap">
                    {formatDate(t.createdAt)}
                  </td>
                  <td className="py-4 px-6">{getTypeBadge(t.type)}</td>
                  <td className="py-4 px-6 text-xs font-semibold text-slate-700">
                    {t.paymentMethod}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    ${t.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">
                    {t.fee > 0 ? `-$${t.fee.toFixed(2)}` : "$0.00"}
                  </td>
                  <td
                    className={`py-4 px-6 font-bold ${
                      t.netAmount < 0
                        ? "text-rose-600"
                        : t.type === "PAYOUT"
                        ? "text-purple-700"
                        : "text-emerald-600"
                    }`}
                  >
                    {t.netAmount < 0 ? `-$${Math.abs(t.netAmount).toFixed(2)}` : `$${t.netAmount.toFixed(2)}`}
                  </td>
                  <td className="py-4 px-6 text-right">{getStatusBadge(t.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <RecordTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onTransactionCreated={(newTxn) =>
          setTransactions([newTxn, ...transactions])
        }
      />
    </div>
  );
}

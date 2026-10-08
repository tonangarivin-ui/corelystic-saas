"use client";

import { useState, useTransition } from "react";
import { X, Loader2, Plus, CreditCard } from "lucide-react";
import { createTransactionAction } from "@/app/actions/transactions";
import { TransactionType, TransactionStatus, type Transaction } from "@prisma/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onTransactionCreated: (transaction: Transaction) => void;
}

export default function RecordTransactionModal({
  open,
  onClose,
  onTransactionCreated,
}: Props) {
  const [type, setType] = useState<TransactionType>(TransactionType.PAYOUT);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Wire Transfer");
  const [customerEmail, setCustomerEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setError(null);

    startTransition(async () => {
      const res = await createTransactionAction({
        type,
        amount: parseFloat(amount),
        paymentMethod,
        customerEmail: customerEmail || undefined,
        description: description || undefined,
        status: TransactionStatus.SUCCESS,
      });

      if (res.success && res.transaction) {
        onTransactionCreated(res.transaction);
        setAmount("");
        setDescription("");
        setCustomerEmail("");
        onClose();
      } else {
        setError(res.error || "Failed to record transaction");
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
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Record Transaction
              </h2>
              <p className="text-xs text-slate-400">
                Syncs with Neon Gateway Ledger
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  const val = e.target.value as TransactionType;
                  setType(val);
                  if (val === TransactionType.PAYOUT) setPaymentMethod("Wire Transfer");
                  else if (val === TransactionType.PAYMENT) setPaymentMethod("Stripe");
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
              >
                <option value={TransactionType.PAYOUT}>Payout (Bank)</option>
                <option value={TransactionType.PAYMENT}>Payment (Inflow)</option>
                <option value={TransactionType.REFUND}>Refund</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
              >
                <option value="Wire Transfer">Wire Transfer</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="Apple Pay">Apple Pay</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Amount ($ USD)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500.00"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Recipient / Account Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="payout@corelytic.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Note / Reference Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Weekly Bank Settlement"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
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
              className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { X, Loader2, Plus, ShoppingCart } from "lucide-react";
import { createOrderAction } from "@/app/actions/orders";
import { OrderStatus, type Order } from "@prisma/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
}

export default function CreateOrderModal({
  open,
  onClose,
  onOrderCreated,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.COMPLETED);
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !total) return;

    startTransition(async () => {
      const res = await createOrderAction({
        customerName,
        total: parseFloat(total),
        status,
      });

      if (res.success && res.order) {
        onOrderCreated(res.order);
        setCustomerName("");
        setTotal("");
        setStatus(OrderStatus.COMPLETED);
        onClose();
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
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Create New Order
              </h2>
              <p className="text-xs text-slate-400">
                Syncs directly to Neon PostgreSQL
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Customer Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Alex Henderson"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Total Order Value ($ USD)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="299.00"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Order Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
            >
              <option value={OrderStatus.COMPLETED}>Completed</option>
              <option value={OrderStatus.PENDING}>Pending</option>
              <option value={OrderStatus.CANCELLED}>Cancelled</option>
            </select>
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
                  Save Order
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

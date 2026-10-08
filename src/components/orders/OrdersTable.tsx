"use client";

import { useState, useTransition } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Filter,
} from "lucide-react";
import { updateOrderStatusAction } from "@/app/actions/orders";
import CreateOrderModal from "./CreateOrderModal";
import { OrderStatus, type Order } from "@prisma/client";

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    startTransition(async () => {
      const res = await updateOrderStatusAction(id, newStatus);
      if (res.success && res.order) {
        setOrders(orders.map((o) => (o.id === id ? res.order : o)));
      }
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "COMPLETED":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Completed
          </div>
        );
      case "PENDING":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Pending
          </div>
        );
      case "CANCELLED":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Cancelled
          </div>
        );
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 mx-6 mb-8 overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-100">
        <div>
          <h3 className="text-[17px] font-bold text-slate-900">
            Recent Orders
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredOrders.length} of {orders.length} transactions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors w-full sm:w-auto justify-between"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {statusFilter === "ALL"
                  ? "All Status"
                  : statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                {["ALL", "COMPLETED", "PENDING", "CANCELLED"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      statusFilter === opt
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {opt === "ALL"
                      ? "All Status"
                      : opt.charAt(0) + opt.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Order Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Order ID</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-6">Total Amount</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No orders match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <span className="text-brand-green mr-0.5">#</span>
                    {o.orderNumber}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {o.customerName}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(o.status)}</td>
                  <td className="py-4 px-6 text-right">
                    <select
                      value={o.status}
                      disabled={isPending}
                      onChange={(e) =>
                        handleStatusChange(o.id, e.target.value as OrderStatus)
                      }
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 focus:outline-none focus:border-brand-green cursor-pointer"
                    >
                      <option value="COMPLETED">Set Completed</option>
                      <option value="PENDING">Set Pending</option>
                      <option value="CANCELLED">Set Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CreateOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onOrderCreated={(newOrder) => setOrders([newOrder, ...orders])}
      />
    </div>
  );
}

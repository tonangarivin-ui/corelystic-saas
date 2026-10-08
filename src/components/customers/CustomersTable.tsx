"use client";

import { useState, useTransition } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Filter,
  UserCheck,
  Award,
  Clock,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { deleteCustomerAction } from "@/app/actions/customers";
import CreateCustomerModal from "./CreateCustomerModal";
import type { Customer } from "@prisma/client";

export default function CustomersTable({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this customer record?")) return;

    startTransition(async () => {
      const res = await deleteCustomerAction(id);
      if (res.success) {
        setCustomers(customers.filter((c) => c.id !== id));
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VIP":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            VIP Tier
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Inactive
          </span>
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
            Customer Directory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredCustomers.length} of {customers.length} customer accounts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
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
                {statusFilter === "ALL" ? "All Tiers" : statusFilter}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                {["ALL", "VIP", "Active", "Inactive"].map((opt) => (
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
                    {opt === "ALL" ? "All Tiers" : opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Customer Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-6">Location</th>
              <th className="py-3.5 px-6">Tier Status</th>
              <th className="py-3.5 px-6">Orders</th>
              <th className="py-3.5 px-6">Total Spent</th>
              <th className="py-3.5 px-6">Last Active</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No customers match your search criteria.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-300" />
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                      {c.country}
                    </span>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(c.status)}</td>
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    {c.ordersCount} orders
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    ${c.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-400">
                    {formatDate(c.lastOrderAt)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CreateCustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCustomerCreated={(newCust) => setCustomers([newCust, ...customers])}
      />
    </div>
  );
}

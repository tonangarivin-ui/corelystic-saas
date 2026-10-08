"use client";

import { useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { productsData, type Product } from "@/data/mock-analytics";
import AddProductModal from "./AddProductModal";

type StatusFilter = "All Status" | "In Stock" | "Low Stock" | "Out of Stock";

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-orange-50 text-orange-700",
  "Out of Stock": "bg-red-50 text-red-700",
};

export default function ProductsTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Status");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const toggleOne = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const formatCurrency = (v: number) =>
    v >= 1000 ? `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${v.toFixed(2)}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 mx-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
        <h3 className="text-[16px] font-semibold text-slate-900">Products</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-52 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1.5 text-[13px] text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-100 transition-colors w-full sm:w-auto justify-between sm:justify-center"
            >
              {statusFilter}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-10 min-w-[140px]">
                {(["All Status", "In Stock", "Low Stock", "Out of Stock"] as StatusFilter[]).map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setStatusFilter(opt);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-slate-50 ${
                        statusFilter === opt ? "text-brand-green font-medium" : "text-slate-600"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-5 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-slate-300 text-brand-green focus:ring-brand-green/20 accent-brand-green"
                  aria-label="Select all products"
                />
              </th>
              <th className="text-left py-3 px-5 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left py-3 px-5 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left py-3 px-5 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="text-left py-3 px-5 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                Revenue
              </th>
              <th className="text-left py-3 px-5 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-3.5 px-5">
                  <input
                    type="checkbox"
                    checked={selected.has(product.id)}
                    onChange={() => toggleOne(product.id)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-green focus:ring-brand-green/20 accent-brand-green"
                    aria-label={`Select ${product.name}`}
                  />
                </td>
                <td className="py-3.5 px-5">
                  <p className="text-[13px] font-medium text-slate-800 max-w-[240px] truncate">
                    {product.name}
                  </p>
                </td>
                <td className="py-3.5 px-5 text-[13px] text-slate-600">
                  {formatCurrency(product.price)}
                </td>
                <td className="py-3.5 px-5 text-[13px] text-slate-600">{product.stock}</td>
                <td className="py-3.5 px-5 text-[13px] font-medium text-slate-800">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="py-3.5 px-5">
                  <span
                    className={`inline-block text-[12px] font-medium px-2.5 py-1 rounded-full ${statusStyles[product.status]}`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-[14px] text-slate-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

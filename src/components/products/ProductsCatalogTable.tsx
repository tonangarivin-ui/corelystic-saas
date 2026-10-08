"use client";

import { useState, useTransition } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Edit2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Package,
} from "lucide-react";
import { deleteProductAction } from "@/app/actions/products";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import type { Product } from "@prisma/client";

export default function ProductsCatalogTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesStatus =
      statusFilter === "ALL" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const allSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((p) => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product from the database?")) return;

    startTransition(async () => {
      const res = await deleteProductAction(id);
      if (res.success) {
        setProducts(products.filter((p) => p.id !== id));
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IN_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            In Stock
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Low Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Out of Stock
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
            Inventory Catalog
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredProducts.length} of {products.length} catalog items
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-3 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setCategoryDropdownOpen(!categoryDropdownOpen);
                setStatusDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <span>{categoryFilter === "ALL" ? "All Categories" : categoryFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 sm:right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[150px] text-[13px]">
                <button
                  onClick={() => {
                    setCategoryFilter("ALL");
                    setCategoryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                    categoryFilter === "ALL"
                      ? "text-brand-green font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      categoryFilter === cat
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {cat}
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
                setCategoryDropdownOpen(false);
              }}
              className="flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-100 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {statusFilter === "ALL"
                  ? "All Status"
                  : statusFilter === "IN_STOCK"
                  ? "In Stock"
                  : statusFilter === "LOW_STOCK"
                  ? "Low Stock"
                  : "Out of Stock"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 min-w-[140px] text-[13px]">
                {[
                  { label: "All Status", val: "ALL" },
                  { label: "In Stock", val: "IN_STOCK" },
                  { label: "Low Stock", val: "LOW_STOCK" },
                  { label: "Out of Stock", val: "OUT_OF_STOCK" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => {
                      setStatusFilter(opt.val);
                      setStatusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors ${
                      statusFilter === opt.val
                        ? "text-brand-green font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded text-brand-green focus:ring-brand-green cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-6">Product Title</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Price</th>
              <th className="py-3.5 px-6">Stock Level</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Revenue</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-400">
                  <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No products found matching your filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-50/60 transition ${
                    selected.has(p.id) ? "bg-purple-50/30" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleOne(p.id)}
                      className="rounded text-brand-green focus:ring-brand-green cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    {p.name}
                  </td>
                  <td className="py-4 px-6 text-xs">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    {p.stock} units
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(p.status)}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    ${p.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditProduct(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CreateProductModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onProductCreated={(newProd) => setProducts([newProd, ...products])}
      />

      <EditProductModal
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onProductUpdated={(updatedProd) =>
          setProducts(
            products.map((p) => (p.id === updatedProd.id ? updatedProd : p))
          )
        }
      />
    </div>
  );
}

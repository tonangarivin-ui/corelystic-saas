"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Package,
  Loader2,
  DollarSign,
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { createProductAction, deleteProductAction } from "@/app/actions/products";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  revenue: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export default function AdminProductsTable({
  initialProducts,
}: {
  initialProducts: ProductItem[];
}) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [isPending, startTransition] = useTransition();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "General",
    price: "",
    stock: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

    startTransition(async () => {
      const res = await createProductAction({
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
      });

      if (res.success && res.product) {
        setProducts([res.product as ProductItem, ...products]);
        setShowAddModal(false);
        setNewProduct({ name: "", category: "General", price: "", stock: "" });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product from Neon DB?")) return;

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            In Stock
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Low Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Out of Stock
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Products Catalog</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct real-time CRUD connected to Neon PostgreSQL
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00C48C] hover:bg-[#00B07D] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00C48C]/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Product</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Price</th>
              <th className="py-3.5 px-6">Stock</th>
              <th className="py-3.5 px-6">Revenue</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                  No products found in database. Click Add Product to create one.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">
                    {item.category}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {item.stock}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    ${item.revenue.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete Product"
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Add New Product to Database
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Creates a new record in Neon PostgreSQL
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="e.g. Wireless Ergonomic Keyboard"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    placeholder="Electronics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="79.99"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Initial Stock
                </label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  placeholder="150"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#00C48C] hover:bg-[#00B07D] text-white text-xs font-bold shadow-md shadow-[#00C48C]/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { X, Loader2, Save, Edit3 } from "lucide-react";
import { updateProductAction } from "@/app/actions/products";
import type { Product } from "@prisma/client";

interface Props {
  product: Product | null;
  onClose: () => void;
  onProductUpdated: (product: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onProductUpdated,
}: Props) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [stock, setStock] = useState(product?.stock.toString() || "");
  const [category, setCategory] = useState(product?.category || "General");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || !stock) return;
    setError(null);

    startTransition(async () => {
      const res = await updateProductAction(product.id, {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });

      if (res.success && res.product) {
        onProductUpdated(res.product);
        onClose();
      } else {
        setError(res.error || "Failed to update product");
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
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Edit Product
              </h2>
              <p className="text-xs text-slate-400">
                Update price, category &amp; stock levels
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
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Product Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
              >
                <option value="Electronics">Electronics</option>
                <option value="Gaming">Gaming</option>
                <option value="Accessories">Accessories</option>
                <option value="Audio">Audio</option>
                <option value="Furniture">Furniture</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Unit Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Stock In Hand
            </label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import AdminProductsTable from "@/components/admin/AdminProductsTable";
import {
  Database,
  DollarSign,
  PackageCheck,
  TrendingUp,
  Server,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [products, orders, store] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.store.findFirst(),
  ]);

  const totalRevenue = products.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SaaS Control Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Connected to Neon PostgreSQL instance • {store?.name || "Corelytic Store"}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          PostgreSQL Live Synced
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Tracked Revenue
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Total Products
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {products.length} Items
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Total Stock Units
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {totalStock.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Database Engine
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              Neon Cloud
            </div>
          </div>
        </div>
      </div>

      {/* Products CRUD Component */}
      <AdminProductsTable initialProducts={products} />
    </div>
  );
}

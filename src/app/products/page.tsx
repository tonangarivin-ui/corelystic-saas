import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import ProductsStats from "@/components/products/ProductsStats";
import ProductsCatalogTable from "@/components/products/ProductsCatalogTable";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Dashboards", current: "Products" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Product Inventory
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Real-time stock valuation, category sorting, price updates, and catalog control
              </p>
            </div>

            <ProductsStats products={products} />
            <ProductsCatalogTable initialProducts={products} />
          </main>
        </div>
      </div>
    </div>
  );
}

import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import OrdersStats from "@/components/orders/OrdersStats";
import OrdersTable from "@/components/orders/OrdersTable";
import { prisma } from "@/lib/prisma";
import type { Order } from "@prisma/client";

export default async function OrdersPage() {
  let orders: Order[] = [];
  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load orders:", error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Dashboards", current: "Orders" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Orders Management
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Real-time transaction tracking, status fulfillment, and sales history
              </p>
            </div>

            <OrdersStats orders={orders} />
            <OrdersTable initialOrders={orders} />
          </main>
        </div>
      </div>
    </div>
  );
}

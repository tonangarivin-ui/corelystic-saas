"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardDataAction() {
  try {
    const [products, orders, metrics, store] = await Promise.all([
      prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.metricDaily.findMany({ orderBy: { order: "asc" } }),
      prisma.store.findFirst(),
    ]);

    const totalRevenue = products.reduce((acc, p) => acc + (p.revenue || 0), 0);
    const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
    const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

    return {
      success: true,
      data: {
        store: store || { name: "Corelytic Store", currency: "USD" },
        products,
        orders,
        metrics,
        summary: {
          totalProducts: products.length,
          totalStock,
          totalRevenue,
          completedOrders,
        },
      },
    };
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return { success: false, error: "Failed to fetch database records" };
  }
}

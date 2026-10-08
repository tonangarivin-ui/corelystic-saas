"use server";

import { prisma } from "@/lib/prisma";

export async function getAnalyticsDataAction() {
  try {
    const [metrics, products, orders] = await Promise.all([
      prisma.metricDaily.findMany({ orderBy: { order: "asc" } }),
      prisma.product.findMany({ orderBy: { revenue: "desc" } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    const totalIncome = metrics.reduce((sum, m) => sum + m.income, 0);
    const totalExpense = metrics.reduce((sum, m) => sum + m.expense, 0);
    const netProfit = totalIncome - totalExpense;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

    const totalOrdersAmount = orders.reduce((sum, o) => sum + o.total, 0);
    const aov = orders.length > 0 ? totalOrdersAmount / orders.length : 0;

    // Monthly data with calculated net profit and margin
    const monthlySeries = metrics.map((m) => ({
      month: m.month,
      income: m.income,
      expense: m.expense,
      profit: m.income - m.expense,
    }));

    // Category distribution from products
    const categoryMap: Record<string, { revenue: number; itemsCount: number; stock: number }> = {};
    for (const p of products) {
      if (!categoryMap[p.category]) {
        categoryMap[p.category] = { revenue: 0, itemsCount: 0, stock: 0 };
      }
      categoryMap[p.category].revenue += p.revenue;
      categoryMap[p.category].itemsCount += 1;
      categoryMap[p.category].stock += p.stock;
    }

    const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
      category,
      revenue: data.revenue,
      itemsCount: data.itemsCount,
      stock: data.stock,
    }));

    return {
      success: true,
      data: {
        summary: {
          totalIncome,
          totalExpense,
          netProfit,
          profitMargin,
          aov,
          totalOrders: orders.length,
        },
        monthlySeries,
        categoryBreakdown,
      },
    };
  } catch (error) {
    console.error("Failed to load analytics data:", error);
    return { success: false, error: "Failed to load analytics data" };
  }
}

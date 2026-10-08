import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import RevenueBreakdownChart from "@/components/analytics/RevenueBreakdownChart";
import ChannelDistributionChart from "@/components/analytics/ChannelDistributionChart";
import ConversionFunnelCard from "@/components/analytics/ConversionFunnelCard";
import CategoryPerformanceTable from "@/components/analytics/CategoryPerformanceTable";
import { getAnalyticsDataAction } from "@/app/actions/analytics";

export default async function AnalyticsPage() {
  const res = await getAnalyticsDataAction();
  const data = res.data || {
    summary: {
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      profitMargin: 0,
      aov: 0,
      totalOrders: 0,
    },
    monthlySeries: [],
    categoryBreakdown: [],
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Growth Tools", current: "Sales Performance" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Sales Performance &amp; Analytics
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Comprehensive P&amp;L auditing, operating margin benchmarks, acquisition funnels, and revenue attribution
              </p>
            </div>

            <AnalyticsStats summary={data.summary} />

            <div className="flex flex-col lg:flex-row gap-5 px-6 mb-6">
              <RevenueBreakdownChart data={data.monthlySeries} />
              <ChannelDistributionChart />
            </div>

            <ConversionFunnelCard />

            <CategoryPerformanceTable categories={data.categoryBreakdown} />
          </main>
        </div>
      </div>
    </div>
  );
}

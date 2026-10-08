import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import MainHeader from "@/components/MainHeader";
import KPICards from "@/components/KPICards";
import OrdersAnalyticsChart from "@/components/OrdersAnalyticsChart";
import TopSalesPanel from "@/components/TopSalesPanel";
import ProductsTable from "@/components/ProductsTable";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar />

          <main className="flex-1 overflow-y-auto">
            <MainHeader />

            <div className="mt-5">
              <KPICards />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 px-6 mt-5">
              <OrdersAnalyticsChart />
              <TopSalesPanel />
            </div>

            <div className="mt-5">
              <ProductsTable />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

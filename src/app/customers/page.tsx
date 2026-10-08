import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import CustomersStats from "@/components/customers/CustomersStats";
import CustomersTable from "@/components/customers/CustomersTable";
import { prisma } from "@/lib/prisma";
import type { Customer } from "@prisma/client";

export default async function CustomersPage() {
  let customers: Customer[] = [];
  try {
    customers = await prisma.customer.findMany({
      orderBy: { totalSpent: "desc" },
    });
  } catch (error) {
    console.error("Failed to load customers:", error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Dashboards", current: "Customers" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Customers Directory
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage client profiles, lifetime value (LTV), order frequency, and VIP tiers
              </p>
            </div>

            <CustomersStats customers={customers} />
            <CustomersTable initialCustomers={customers} />
          </main>
        </div>
      </div>
    </div>
  );
}

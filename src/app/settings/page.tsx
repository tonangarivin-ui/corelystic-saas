import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import StoreProfileForm from "@/components/settings/StoreProfileForm";
import TeamMembersCard from "@/components/settings/TeamMembersCard";
import ApiIntegrationsCard from "@/components/settings/ApiIntegrationsCard";
import DangerZoneCard from "@/components/settings/DangerZoneCard";
import { getStoreSettingsAction } from "@/app/actions/settings";

export default async function SettingsPage() {
  const res = await getStoreSettingsAction();
  const store = res.store || {
    id: "default",
    name: "Corelytic Store",
    slug: "corelytic-store",
    currency: "USD",
  };
  const admin = res.admin || {
    name: "Eugene Lamar",
    email: "admin@corelytic.com",
    role: "SUPERADMIN",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Settings", current: "Store Configuration" }}
          />

          <main className="flex-1 overflow-y-auto pt-6 px-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Store &amp; Workspace Settings
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Configure your merchant profile, regional localization, team RBAC, and developer API credentials
              </p>
            </div>

            <StoreProfileForm initialStore={store} />
            <TeamMembersCard admin={admin} />
            <ApiIntegrationsCard />
            <DangerZoneCard />
          </main>
        </div>
      </div>
    </div>
  );
}

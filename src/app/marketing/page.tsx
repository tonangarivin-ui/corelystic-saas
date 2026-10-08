import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import MarketingStats from "@/components/marketing/MarketingStats";
import CampaignsTable from "@/components/marketing/CampaignsTable";
import { prisma } from "@/lib/prisma";
import type { Campaign } from "@prisma/client";

export default async function MarketingPage() {
  let campaigns: Campaign[] = [];
  try {
    campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load campaigns:", error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Growth Tools", current: "Marketing" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Marketing &amp; Promotions
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Coupon codes, multi-channel ad spend, conversion attribution, and blended ROAS analytics
              </p>
            </div>

            <MarketingStats campaigns={campaigns} />
            <CampaignsTable initialCampaigns={campaigns} />
          </main>
        </div>
      </div>
    </div>
  );
}

import Sidebar from "@/components/Sidebar";
import TopToolbar from "@/components/TopToolbar";
import GoalsStats from "@/components/goals/GoalsStats";
import GoalsGrid from "@/components/goals/GoalsGrid";
import { prisma } from "@/lib/prisma";
import type { Goal } from "@prisma/client";

export default async function GoalsPage() {
  let goals: Goal[] = [];
  try {
    goals = await prisma.goal.findMany({
      orderBy: { deadline: "asc" },
    });
  } catch (error) {
    console.error("Failed to load goals:", error);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 m-3 lg:m-5 overflow-hidden flex flex-col">
          <TopToolbar
            breadcrumb={{ parent: "Growth Tools", current: "Goals & Target" }}
          />

          <main className="flex-1 overflow-y-auto pt-6">
            <div className="px-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Goals &amp; Target Tracking
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Quarterly OKR milestones, revenue pacing, customer acquisition targets, and SLA metrics
              </p>
            </div>

            <GoalsStats goals={goals} />
            <GoalsGrid initialGoals={goals} />
          </main>
        </div>
      </div>
    </div>
  );
}

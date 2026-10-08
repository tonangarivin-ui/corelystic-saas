"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sliders,
} from "lucide-react";
import { updateGoalProgressAction, deleteGoalAction } from "@/app/actions/goals";
import CreateGoalModal from "./CreateGoalModal";
import type { Goal } from "@prisma/client";

export default function GoalsGrid({ initialGoals }: { initialGoals: Goal[] }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const categories = Array.from(new Set(goals.map((g) => g.category)));

  const filteredGoals = goals.filter((g) => {
    return categoryFilter === "ALL" || g.category === categoryFilter;
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this target milestone?")) return;

    startTransition(async () => {
      const res = await deleteGoalAction(id);
      if (res.success) {
        setGoals(goals.filter((g) => g.id !== id));
      }
    });
  };

  const handleUpdateProgress = (id: string) => {
    if (!editValue) return;
    const val = parseFloat(editValue);

    startTransition(async () => {
      const res = await updateGoalProgressAction(id, val);
      if (res.success && res.goal) {
        setGoals(goals.map((g) => (g.id === id ? res.goal : g)));
        setEditingGoalId(null);
        setEditValue("");
      }
    });
  };

  const formatValue = (val: number, unit: string) => {
    if (unit === "$") {
      return `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    if (unit === "%") {
      return `${val.toFixed(1)}%`;
    }
    return `${val.toLocaleString()} ${unit}`;
  };

  const getStatusBadge = (status: string, pct: number) => {
    if (status === "COMPLETED" || pct >= 100) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          Achieved (100%)
        </span>
      );
    }
    if (status === "BEHIND") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          Behind Target
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
        <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
        On Track
      </span>
    );
  };

  const getDaysLeft = (deadline: Date | string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return "Deadline passed";
    if (days === 0) return "Due today";
    return `${days} days remaining`;
  };

  return (
    <div className="mx-6 mb-8">
      {/* Category Pills & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Objectives ({goals.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-brand-green/15 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Target Milestone
        </button>
      </div>

      {/* Grid of Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGoals.map((g) => {
          const pct = Math.min(
            Math.round((g.currentVal / g.targetVal) * 100),
            100
          );
          const isCompleted = pct >= 100 || g.status === "COMPLETED";

          return (
            <div
              key={g.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                    {g.category}
                  </span>
                  {getStatusBadge(g.status, pct)}
                </div>

                <h4 className="text-[16px] font-bold text-slate-900 mb-1 leading-snug">
                  {g.title}
                </h4>

                <div className="flex items-baseline gap-2 mt-3 mb-4">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatValue(g.currentVal, g.unit)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    of {formatValue(g.targetVal, g.unit)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? "bg-emerald-500"
                        : g.status === "BEHIND"
                        ? "bg-rose-500"
                        : "bg-gradient-to-r from-purple-500 to-[#00C48C]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-medium">
                  <span>{pct}% Achieved</span>
                  <span className="text-slate-400">
                    Remaining: {formatValue(Math.max(0, g.targetVal - g.currentVal), g.unit)}
                  </span>
                </div>
              </div>

              {/* Footer actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-300" />
                  <span>{getDaysLeft(g.deadline)}</span>
                </div>

                <div className="flex items-center gap-1">
                  {editingGoalId === g.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="New val"
                        className="w-20 px-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-brand-green"
                      />
                      <button
                        onClick={() => handleUpdateProgress(g.id)}
                        disabled={isPending}
                        className="px-2 py-1 bg-brand-green text-white text-[11px] font-bold rounded-lg cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingGoalId(null)}
                        className="px-2 py-1 text-slate-400 text-[11px] hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingGoalId(g.id);
                          setEditValue(g.currentVal.toString());
                        }}
                        className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition cursor-pointer"
                        title="Update progress"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        disabled={isPending}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CreateGoalModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onGoalCreated={(newGoal) => setGoals([newGoal, ...goals])}
      />
    </div>
  );
}

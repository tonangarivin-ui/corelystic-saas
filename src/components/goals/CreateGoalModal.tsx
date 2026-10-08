"use client";

import { useState, useTransition } from "react";
import { X, Loader2, Plus, Target } from "lucide-react";
import { createGoalAction } from "@/app/actions/goals";
import type { Goal } from "@prisma/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onGoalCreated: (goal: Goal) => void;
}

export default function CreateGoalModal({
  open,
  onClose,
  onGoalCreated,
}: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Revenue");
  const [currentVal, setCurrentVal] = useState("");
  const [targetVal, setTargetVal] = useState("");
  const [unit, setUnit] = useState("$");
  const [deadline, setDeadline] = useState("2026-12-31");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetVal) return;
    setError(null);

    startTransition(async () => {
      const res = await createGoalAction({
        title,
        category,
        currentVal: parseFloat(currentVal) || 0,
        targetVal: parseFloat(targetVal),
        unit,
        deadline,
      });

      if (res.success && res.goal) {
        onGoalCreated(res.goal);
        setTitle("");
        setCurrentVal("");
        setTargetVal("");
        onClose();
      } else {
        setError(res.error || "Failed to create target goal");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Create Target Milestone
              </h2>
              <p className="text-xs text-slate-400">
                Track KPIs and quarterly objectives
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Goal Objective / Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Expand European Market Share"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value;
                  setCategory(val);
                  if (val === "Revenue") setUnit("$");
                  else if (val === "Customers") setUnit("users");
                  else if (val === "Orders") setUnit("orders");
                  else if (val === "Conversion") setUnit("%");
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800 bg-white"
              >
                <option value="Revenue">Revenue</option>
                <option value="Customers">Customers</option>
                <option value="Orders">Orders</option>
                <option value="Conversion">Conversion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Measurement Unit
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="$ / users / %"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Current Value
              </label>
              <input
                type="number"
                step="0.01"
                value={currentVal}
                onChange={(e) => setCurrentVal(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
                Target Value
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={targetVal}
                onChange={(e) => setTargetVal(e.target.value)}
                placeholder="1000.00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1 tracking-wider">
              Target Deadline
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-slate-800"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 px-4 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold shadow-md shadow-brand-green/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Save Goal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

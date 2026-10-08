"use client";

import { useTransition, useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4F1] via-[#F4F9F8] to-[#E2ECE9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#00C48C]/10 flex items-center justify-center mb-4 text-[#00C48C]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Corelytic Admin
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to access your SaaS control panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@corelytic.com"
                placeholder="admin@corelytic.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00C48C] focus:ring-2 focus:ring-[#00C48C]/20 text-sm text-slate-800 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                defaultValue="admin123456"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00C48C] focus:ring-2 focus:ring-[#00C48C]/20 text-sm text-slate-800 transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 bg-[#00C48C] hover:bg-[#00B07D] text-white font-semibold rounded-xl text-sm shadow-lg shadow-[#00C48C]/20 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Enter Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Demo: admin@corelytic.com / admin123456</span>
          <Link href="/" className="text-[#00C48C] hover:underline">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

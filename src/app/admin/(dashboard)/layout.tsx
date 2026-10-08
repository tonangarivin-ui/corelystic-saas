import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import {
  LayoutDashboard,
  Package,
  Store,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#00C48C] flex items-center justify-center font-bold text-white shadow-lg shadow-[#00C48C]/30">
              C
            </div>
            <div>
              <div className="font-bold text-base tracking-tight">Corelytic</div>
              <div className="text-[10px] uppercase font-bold text-[#00C48C] tracking-wider">
                SaaS Admin Panel
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/15 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-[#00C48C]" />
              Overview & Products
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <ExternalLink className="w-4 h-4" />
              Live Storefront
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 relative">
              <Image
                src="/assets/eugene-avatar.jpg"
                alt="Admin"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{session.name}</div>
              <div className="text-xs text-slate-400 truncate">{session.email}</div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

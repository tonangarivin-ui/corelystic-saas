"use client";

import { Shield, Plus } from "lucide-react";
import Image from "next/image";

interface Props {
  admin: {
    name: string;
    email: string;
    role: string;
  };
}

export default function TeamMembersCard({ admin }: Props) {
  const team = [
    {
      name: admin.name,
      email: admin.email,
      role: "Super Admin",
      avatar: "/assets/eugene-avatar.jpg",
      isOwner: true,
    },
    {
      name: "Sarah Jenkins",
      email: "sarah.j@corelytic.com",
      role: "Operations Manager",
      avatar: null,
      isOwner: false,
    },
    {
      name: "David Chen",
      email: "david.c@corelytic.com",
      role: "Finance Analyst",
      avatar: null,
      isOwner: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900">
              Team Members &amp; RBAC Access
            </h3>
            <p className="text-xs text-slate-400">
              Manage multi-seat administrative access roles
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Invite link copied to clipboard: https://corelystic-saas.vercel.app/admin/invite?ref=token_99")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Invite Staff
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {team.map((m) => (
          <div key={m.email} className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 relative flex items-center justify-center text-xs font-bold text-purple-700">
                {m.avatar ? (
                  <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                ) : (
                  m.name.charAt(0)
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{m.name}</p>
                <p className="text-xs text-slate-400">{m.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  m.isOwner
                    ? "bg-purple-50 text-purple-700 border border-purple-100"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {m.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

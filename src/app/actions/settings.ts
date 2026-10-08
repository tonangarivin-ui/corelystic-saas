"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStoreSettingsAction() {
  try {
    const [store, admin, usersCount] = await Promise.all([
      prisma.store.findFirst(),
      prisma.user.findFirst(),
      prisma.user.count(),
    ]);

    return {
      success: true,
      store: store || {
        id: "default",
        name: "Corelytic Store",
        slug: "corelytic-store",
        currency: "USD",
      },
      admin: admin || {
        name: "Eugene Lamar",
        email: "admin@corelytic.com",
        role: "SUPERADMIN",
      },
      usersCount,
    };
  } catch (error) {
    console.error("Failed to load store settings:", error);
    return { success: false, error: "Failed to load settings" };
  }
}

export async function updateStoreSettingsAction(data: {
  name: string;
  currency: string;
}) {
  try {
    const store = await prisma.store.findFirst();
    if (!store) return { success: false, error: "Store not found" };

    const updated = await prisma.store.update({
      where: { id: store.id },
      data: {
        name: data.name,
        currency: data.currency,
      },
    });

    revalidatePath("/settings");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, store: updated };
  } catch (error) {
    console.error("Failed to update store settings:", error);
    return { success: false, error: "Failed to update store settings" };
  }
}

export async function updateAdminProfileAction(data: {
  name: string;
  email: string;
}) {
  try {
    const admin = await prisma.user.findFirst();
    if (!admin) return { success: false, error: "Admin not found" };

    const updated = await prisma.user.update({
      where: { id: admin.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    revalidatePath("/settings");
    revalidatePath("/admin");
    return { success: true, user: updated };
  } catch (error) {
    console.error("Failed to update admin profile:", error);
    return { success: false, error: "Failed to update admin profile" };
  }
}

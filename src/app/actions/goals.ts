"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGoalsAction() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { deadline: "asc" },
    });
    return { success: true, goals };
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    return { success: false, goals: [] };
  }
}

export async function createGoalAction(data: {
  title: string;
  category: string;
  currentVal: number;
  targetVal: number;
  unit: string;
  deadline: string;
}) {
  try {
    const store = await prisma.store.findFirst();

    const percentage = (data.currentVal / data.targetVal) * 100;
    let status = "ON_TRACK";
    if (percentage >= 100) status = "COMPLETED";
    else if (percentage < 50) status = "BEHIND";

    const goal = await prisma.goal.create({
      data: {
        title: data.title,
        category: data.category || "Revenue",
        currentVal: data.currentVal,
        targetVal: data.targetVal,
        unit: data.unit || "$",
        deadline: new Date(data.deadline),
        status,
        storeId: store?.id,
      },
    });

    revalidatePath("/goals");
    return { success: true, goal };
  } catch (error) {
    console.error("Failed to create goal:", error);
    return { success: false, error: "Failed to create target milestone" };
  }
}

export async function updateGoalProgressAction(
  id: string,
  currentVal: number
) {
  try {
    const existing = await prisma.goal.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Goal not found" };

    const percentage = (currentVal / existing.targetVal) * 100;
    let status = "ON_TRACK";
    if (percentage >= 100) status = "COMPLETED";
    else if (percentage < 50) status = "BEHIND";

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        currentVal,
        status,
      },
    });

    revalidatePath("/goals");
    return { success: true, goal };
  } catch (error) {
    console.error("Failed to update goal progress:", error);
    return { success: false, error: "Failed to update goal" };
  }
}

export async function deleteGoalAction(id: string) {
  try {
    await prisma.goal.delete({ where: { id } });
    revalidatePath("/goals");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete goal:", error);
    return { success: false, error: "Failed to delete goal" };
  }
}

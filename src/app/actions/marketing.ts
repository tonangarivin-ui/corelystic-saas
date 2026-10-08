"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CampaignStatus, DiscountType } from "@prisma/client";

export async function getCampaignsAction() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, campaigns };
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return { success: false, campaigns: [] };
  }
}

export async function createCampaignAction(data: {
  name: string;
  code: string;
  discountType: DiscountType;
  discountVal: number;
  channel: string;
  budget: number;
}) {
  try {
    const store = await prisma.store.findFirst();

    const campaign = await prisma.campaign.create({
      data: {
        name: data.name,
        code: data.code.toUpperCase().trim(),
        discountType: data.discountType || DiscountType.PERCENTAGE,
        discountVal: data.discountVal,
        channel: data.channel || "Email Newsletter",
        budget: data.budget,
        spent: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        status: CampaignStatus.ACTIVE,
        storeId: store?.id,
      },
    });

    revalidatePath("/marketing");
    return { success: true, campaign };
  } catch (error) {
    console.error("Failed to create campaign:", error);
    return { success: false, error: "Failed to create campaign. Code may already exist." };
  }
}

export async function toggleCampaignStatusAction(
  id: string,
  status: CampaignStatus
) {
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/marketing");
    return { success: true, campaign };
  } catch (error) {
    console.error("Failed to toggle campaign status:", error);
    return { success: false, error: "Failed to update campaign status" };
  }
}

export async function deleteCampaignAction(id: string) {
  try {
    await prisma.campaign.delete({ where: { id } });
    revalidatePath("/marketing");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete campaign:", error);
    return { success: false, error: "Failed to delete campaign" };
  }
}

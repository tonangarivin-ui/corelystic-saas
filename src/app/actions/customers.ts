"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomersAction() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { totalSpent: "desc" },
    });
    return { success: true, customers };
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return { success: false, customers: [] };
  }
}

export async function createCustomerAction(data: {
  name: string;
  email: string;
  country?: string;
  status?: string;
}) {
  try {
    const store = await prisma.store.findFirst();

    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        country: data.country || "United States",
        status: data.status || "Active",
        storeId: store?.id,
      },
    });

    revalidatePath("/customers");
    revalidatePath("/admin");
    return { success: true, customer };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return { success: false, error: "Failed to create customer. Email may already exist." };
  }
}

export async function deleteCustomerAction(id: string) {
  try {
    await prisma.customer.delete({
      where: { id },
    });

    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { success: false, error: "Failed to delete customer" };
  }
}

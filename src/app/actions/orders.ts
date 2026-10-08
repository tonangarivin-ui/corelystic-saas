"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function getOrdersAction() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, orders };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return { success: false, orders: [] };
  }
}

export async function createOrderAction(data: {
  customerName: string;
  total: number;
  status?: OrderStatus;
}) {
  try {
    const store = await prisma.store.findFirst();
    const orderCount = await prisma.order.count();
    const orderNumber = `ORD-${8920 + orderCount + 1}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        total: data.total,
        status: data.status || OrderStatus.COMPLETED,
        storeId: store?.id,
      },
    });

    revalidatePath("/orders");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, order };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatusAction(
  id: string,
  status: OrderStatus
) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/orders");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, order };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update order" };
  }
}

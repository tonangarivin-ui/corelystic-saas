"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TransactionType, TransactionStatus } from "@prisma/client";

export async function getTransactionsAction() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, transactions };
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return { success: false, transactions: [] };
  }
}

export async function createTransactionAction(data: {
  type: TransactionType;
  amount: number;
  paymentMethod: string;
  customerEmail?: string;
  description?: string;
  status?: TransactionStatus;
}) {
  try {
    const store = await prisma.store.findFirst();
    const count = await prisma.transaction.count();
    const referenceId = `TXN-${9020 + count + 1}`;

    const fee = data.type === TransactionType.PAYMENT ? +(data.amount * 0.029 + 0.3).toFixed(2) : 0;
    const netAmount =
      data.type === TransactionType.PAYMENT
        ? +(data.amount - fee).toFixed(2)
        : data.type === TransactionType.REFUND
        ? -data.amount
        : data.amount;

    const transaction = await prisma.transaction.create({
      data: {
        referenceId,
        type: data.type,
        amount: data.amount,
        fee,
        netAmount,
        currency: "USD",
        paymentMethod: data.paymentMethod,
        status: data.status || TransactionStatus.SUCCESS,
        customerEmail: data.customerEmail || null,
        description: data.description || null,
        storeId: store?.id,
      },
    });

    revalidatePath("/transactions");
    revalidatePath("/admin");
    return { success: true, transaction };
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return { success: false, error: "Failed to record transaction" };
  }
}

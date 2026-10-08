"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ProductStatus } from "@prisma/client";

export async function getProductsAction() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, products };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { success: false, products: [] };
  }
}

export async function createProductAction(data: {
  name: string;
  category: string;
  price: number;
  stock: number;
  status?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    let status: ProductStatus = ProductStatus.IN_STOCK;
    if (data.stock <= 0) {
      status = ProductStatus.OUT_OF_STOCK;
    } else if (data.stock <= 50) {
      status = ProductStatus.LOW_STOCK;
    }

    const store = await prisma.store.findFirst();

    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category || "General",
        price: data.price,
        stock: data.stock,
        revenue: 0,
        status,
        storeId: store?.id,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProductAction(
  id: string,
  data: {
    price?: number;
    stock?: number;
    status?: ProductStatus;
  }
) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

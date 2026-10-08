"use server";

import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    return { error: "An unexpected error occurred during login." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

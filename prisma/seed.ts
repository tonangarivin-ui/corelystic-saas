import { PrismaClient, Role, ProductStatus, OrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Corelytic SaaS database...");

  // 1. Clean existing records in corelytic schema
  await prisma.metricDaily.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  // 2. Admin User
  const hashedPassword = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@corelytic.com",
      password: hashedPassword,
      name: "Eugene Lamar",
      role: Role.SUPERADMIN,
      avatar: "/assets/eugene-avatar.jpg",
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // 3. Default Store
  const store = await prisma.store.create({
    data: {
      name: "Corelytic Store",
      slug: "corelytic-store",
      currency: "USD",
    },
  });

  // 4. Products
  const products = [
    {
      name: "Playstation 4 Limited Edition (with games)",
      category: "Gaming",
      price: 14.81,
      stock: 883,
      revenue: 349.0,
      status: ProductStatus.IN_STOCK,
    },
    {
      name: "Gaming Chair, local pickup only",
      category: "Furniture",
      price: 5.22,
      stock: 453,
      revenue: 354.0,
      status: ProductStatus.IN_STOCK,
    },
    {
      name: 'Apple iPad Pro 11" M2 Chip',
      category: "Electronics",
      price: 799.0,
      stock: 120,
      revenue: 95880.0,
      status: ProductStatus.IN_STOCK,
    },
    {
      name: "Sony WH-1000XM5 Wireless Headphones",
      category: "Audio",
      price: 348.0,
      stock: 45,
      revenue: 15660.0,
      status: ProductStatus.LOW_STOCK,
    },
    {
      name: "Logitech MX Master 3S Mouse",
      category: "Accessories",
      price: 99.99,
      stock: 310,
      revenue: 30996.9,
      status: ProductStatus.IN_STOCK,
    },
    {
      name: "Samsung Galaxy Tab S9 Ultra",
      category: "Electronics",
      price: 1199.99,
      stock: 0,
      revenue: 0.0,
      status: ProductStatus.OUT_OF_STOCK,
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        ...p,
        storeId: store.id,
      },
    });
  }
  console.log(`Created ${products.length} products`);

  // 5. Orders
  const sampleOrders = [
    { orderNumber: "ORD-8921", customerName: "Sarah Connor", total: 799.0, status: OrderStatus.COMPLETED },
    { orderNumber: "ORD-8922", customerName: "Marcus Vance", total: 104.99, status: OrderStatus.COMPLETED },
    { orderNumber: "ORD-8923", customerName: "Elena Rostova", total: 348.0, status: OrderStatus.COMPLETED },
    { orderNumber: "ORD-8924", customerName: "David Kim", total: 14.81, status: OrderStatus.PENDING },
  ];
  for (const o of sampleOrders) {
    await prisma.order.create({
      data: {
        ...o,
        storeId: store.id,
      },
    });
  }

  // 6. Metrics 12 Months
  const monthsData = [
    { month: "Jan", order: 1, income: 145000, expense: 95000 },
    { month: "Feb", order: 2, income: 190000, expense: 120000 },
    { month: "Mar", order: 3, income: 240000, expense: 140000 },
    { month: "Apr", order: 4, income: 210000, expense: 130000 },
    { month: "May", order: 5, income: 320000, expense: 190000 },
    { month: "Jun", order: 6, income: 410000, expense: 220000 },
    { month: "Jul", order: 7, income: 523000, expense: 260000 },
    { month: "Aug", order: 8, income: 480000, expense: 250000 },
    { month: "Sep", order: 9, income: 430000, expense: 210000 },
    { month: "Oct", order: 10, income: 390000, expense: 180000 },
    { month: "Nov", order: 11, income: 460000, expense: 230000 },
    { month: "Dec", order: 12, income: 510000, expense: 270000 },
  ];
  for (const m of monthsData) {
    await prisma.metricDaily.create({ data: m });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

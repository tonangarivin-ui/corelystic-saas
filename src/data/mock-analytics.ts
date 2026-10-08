export interface KPIData {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: "dollar" | "check" | "users";
  gradient: "lavender" | "mint" | "blue";
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface TopSaleCategory {
  name: string;
  sales: number;
  percentage: number;
  color: string;
}

export interface TopSalesData {
  total: number;
  badge: string;
  categories: TopSaleCategory[];
  barData: { label: string; value: number }[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  revenue: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export const kpiData: KPIData[] = [
  {
    label: "Revenue Today",
    value: "$12,840",
    trend: "+5.50% from Yesterday",
    trendDirection: "up",
    icon: "dollar",
    gradient: "lavender",
  },
  {
    label: "Orders Complete",
    value: "287",
    trend: "+6.20% from Yesterday",
    trendDirection: "up",
    icon: "check",
    gradient: "mint",
  },
  {
    label: "Returning Customer",
    value: "84",
    trend: "+8.20% from Yesterday",
    trendDirection: "up",
    icon: "users",
    gradient: "blue",
  },
];

export const monthlyAnalytics: MonthlyData[] = [
  { month: "Jan", income: 310000, expense: 220000 },
  { month: "Feb", income: 280000, expense: 250000 },
  { month: "Mar", income: 350000, expense: 230000 },
  { month: "Apr", income: 420000, expense: 280000 },
  { month: "May", income: 380000, expense: 260000 },
  { month: "Jun", income: 460000, expense: 300000 },
  { month: "Jul", income: 523000, expense: 320000 },
  { month: "Aug", income: 490000, expense: 310000 },
  { month: "Sep", income: 410000, expense: 270000 },
  { month: "Oct", income: 470000, expense: 290000 },
  { month: "Nov", income: 390000, expense: 250000 },
  { month: "Dec", income: 440000, expense: 280000 },
];

export const topSalesData: TopSalesData = {
  total: 10432,
  badge: "+132",
  categories: [
    { name: "Smartphones", sales: 500, percentage: 12, color: "#00C48C" },
    { name: "Laptops", sales: 400, percentage: 23, color: "#60A5FA" },
    { name: "Smart Pots", sales: 200, percentage: 35, color: "#F97316" },
  ],
  barData: [
    { label: "M", value: 65 },
    { label: "T", value: 80 },
    { label: "W", value: 55 },
    { label: "T", value: 90 },
    { label: "F", value: 70 },
    { label: "S", value: 85 },
    { label: "S", value: 60 },
  ],
};

export const productsData: Product[] = [
  {
    id: 1,
    name: "Playstation 4 Limited Edition (with games)",
    price: 14.81,
    stock: 883,
    revenue: 349.0,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Gaming Chair, local pickup only",
    price: 5.22,
    stock: 453,
    revenue: 354.0,
    status: "In Stock",
  },
  {
    id: 3,
    name: 'Apple iPad Pro 11" M2 Chip',
    price: 799.0,
    stock: 120,
    revenue: 95880.0,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.0,
    stock: 45,
    revenue: 15660.0,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Logitech MX Master 3S Mouse",
    price: 99.99,
    stock: 310,
    revenue: 30996.9,
    status: "In Stock",
  },
];

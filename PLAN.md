# Implementation Plan — Corelytic SaaS Analytics Dashboard

## 1. Project Setup & Prerequisites
- Directory: `/home/ubuntu/projects/corelystic-saas`
- Next.js 16.4.0 (App Router, Bun)
- Dependencies installed: `lucide-react`, `recharts`
- Asset verified: `public/assets/eugene-avatar.jpg`

---

## 2. File & Component Structure
```text
src/
├── data/
│   └── mock-analytics.ts       # Typed dataset: KPIs, chart data, top sales, products
├── components/
│   ├── Sidebar.tsx             # Left fixed navigation & Eugene Lamar profile
│   ├── TopToolbar.tsx          # Breadcrumb, search, notifications, export button
│   ├── MainHeader.tsx          # Title "Your Store at a Glance" & customize button
│   ├── KPICards.tsx            # 3 pastel gradient metric cards
│   ├── OrdersAnalyticsChart.tsx# Recharts AreaChart (Income vs Expense with July pin)
│   ├── TopSalesPanel.tsx       # Mini bar chart + ranked product categories
│   ├── ProductsTable.tsx       # Search, status filter, checkboxes & table rows
│   └── AddProductModal.tsx     # Modal form triggered by "+ Add New Product"
├── app/
│   ├── globals.css             # Tailwind v4 styles, custom colors & layout tweaks
│   ├── layout.tsx              # Plus Jakarta Sans / Inter font & metadata
│   └── page.tsx                # Master Dashboard layout composing all components
```

---

## 3. Implementation Order (Slices)
1. **Slice 1 (Data & Tokens):**
   - Create `src/data/mock-analytics.ts`
   - Configure `src/app/globals.css` with exact color tokens and scrollbar styles.
2. **Slice 2 (Sidebar & Header Controls):**
   - Implement `Sidebar.tsx` (responsive desktop + mobile drawer)
   - Implement `TopToolbar.tsx` and `MainHeader.tsx`
3. **Slice 3 (Metrics & Data Visualization):**
   - Implement `KPICards.tsx`
   - Implement `OrdersAnalyticsChart.tsx` (using `"use client"` Recharts ResponsiveContainer)
   - Implement `TopSalesPanel.tsx`
4. **Slice 4 (Products Table & Modal):**
   - Implement `ProductsTable.tsx` with search, filter, and selection state
   - Implement `AddProductModal.tsx`
5. **Slice 5 (Assembly & Production Build):**
   - Assemble in `src/app/page.tsx` with the outer gradient canvas frame
   - Run `bun run build` and ensure zero errors or warnings.

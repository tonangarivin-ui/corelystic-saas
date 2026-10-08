# Product Requirement Document (PRD)
## Corelytic — Smart E-Commerce SaaS Analytics Dashboard

---

### 1. Document Overview & Objective
- **Product Name:** Corelytic SaaS Analytics Dashboard
- **Objective:** Mengembangkan antarmuka frontend web responsive yang identik secara visual dan interaksi dengan desain Dribbble Corelytic (Shot 26460732).
- **Core Aesthetic:** Clean modern SaaS dashboard, floating white card panel di atas background gradient teal/mint soft, aksen emerald green (`#00C48C` / `#00C49A`), lavender active state (`#EDE9FE`), dan pastel metric cards.

---

### 2. Design Tokens & Visual Specs
- **Canvas Backdrop:** Gradient teal/mint soft (`from-[#E6F4F1] to-[#F0FAF7]`) dengan aksen blob organik
- **Main Container:** Floating rounded white card (`bg-white rounded-3xl shadow-xl border border-slate-100`)
- **Primary Brand / Action Green:** `#00C48C` (Tombol Export, Customize Widget, Add Product, trend indicators)
- **Active Nav Pill:** `#F3E8FF` / `#EDE9FE` dengan teks `#7C3AED` (Lavender purple)
- **KPI Card Backgrounds:**
  - Card 1 (Revenue): Pastel Lavender Gradient (`from-[#F5F3FF] to-[#EDE9FE]`)
  - Card 2 (Orders): Pastel Mint Gradient (`from-[#ECFDF5] to-[#D1FAE5]`)
  - Card 3 (Customers): Pastel Ice Blue Gradient (`from-[#EFF6FF] to-[#DBEAFE]`)
- **Typography:** Inter / Plus Jakarta Sans via `next/font/google`
- **Icons:** `lucide-react` SVG icons

---

### 3. Component & Layout Breakdown

#### 3.1 Left Sidebar
- **Logo Area:** Hexagonal teal badge dengan white cross/plus, wordmark "Corelytic" + dropdown chevron, collapse button.
- **MAIN NAVIGATION:**
  - `Dashboards` (Active: lavender pill, icon grid/layout)
  - `Customers` (icon user)
  - `Orders` (icon package/box)
  - `Products` (icon tag)
  - `Transactions` (icon credit card)
- **GROWTH TOOLS:**
  - `Goals & Target` (icon target)
  - `Sales Performance` (icon bar-chart-2)
  - `Marketing` (icon megaphone)
- **Footer Sidebar:**
  - `Help Center` & `Settings`
  - User profile card: Avatar foto (`/assets/eugene-avatar.jpg`), nama **Eugene Lamar**, email `example@mail.com`, chevron up/down.
- **Mobile Responsive:** Collapsible drawer dengan hamburger button di viewport `< 1024px`.

#### 3.2 Top Toolbar
- **Breadcrumbs:** `Dashboards / Data` dengan mini folder/grid icon.
- **Search Bar:** Centered input, placeholder "Search...", keyboard chip `⌘ K`.
- **Action Buttons:** Notification bell dengan red badge dot, dan green rounded button **"Export"** (download icon).

#### 3.3 Main Header
- **Title:** "Your Store at a Glance"
- **Subtitle:** "Real-time snapshot of revenue, orders, and customers"
- **Action Button:** Green rounded button **"Customize Widget"** (sliders icon).

#### 3.4 KPI Metrics Cards (3 Cards)
1. **Revenue Today:** Value `$12,840` | Trend `+5.50% from Yesterday` | Icon Dollar badge | Lavender gradient
2. **Orders Complete:** Value `287` | Trend `+6.20% from Yesterday` | Icon Check-clipboard badge | Mint gradient
3. **Returning Customer:** Value `84` | Trend `+8.20% from Yesterday` | Icon Users badge | Blue gradient

#### 3.5 Analytics & Chart Row
- **Left Panel (65% width) — Orders Analytics:**
  - Header: Title "Orders Analytics", legend `● Income` (emerald green) vs `● Expense` (dark slate), dropdown filter "This Year".
  - Chart: Smooth Area/Line Chart 12 bulan (Jan–Dec) menggunakan Recharts.
  - Active Data Tooltip: Pinned highlight pada **July** dengan tooltip black card **"$523,000"** (July).
- **Right Panel (35% width) — Top Sales:**
  - Header: "Top Sales" + info icon + green link button "See Details".
  - Total Metric: **10,432** dengan badge `+132`.
  - Mini Bar Chart: Bar vertikal gradasi teal-ke-hijau.
  - Ranked Categories:
    1. 🟩 **Smartphones** — 500 Sales (badge 12%)
    2. 🟦 **Laptops** — 400 Sales (badge 23%)
    3. 🟧 **Smart Pots** — 200 Sales (badge 35%)

#### 3.6 Products Inventory Table
- **Toolbar:**
  - Heading "Products"
  - Search input ("Search Product...")
  - Status filter dropdown ("All Status", "In Stock", "Low Stock", "Out of Stock")
  - Green button **"+ Add New Product"** (membuka modal form tambah produk)
- **Table Columns:** `[Checkbox]` | Product | Price | Stock | Revenue | Status
- **Initial Data:**
  - *Playstation 4 Limited Edition (with games)* | $14.81 | 883 | $349.00 | In Stock (Green pill)
  - *Gaming Chair, local pickup only* | $5.22 | 453 | $354.00 | In Stock (Green pill)
  - *Apple iPad Pro 11" M2 Chip* | $799.00 | 120 | $95,880.00 | In Stock (Green pill)
  - *Sony WH-1000XM5 Wireless Headphones* | $348.00 | 45 | $15,660.00 | Low Stock (Orange pill)
  - *Logitech MX Master 3S Mouse* | $99.99 | 310 | $30,996.90 | In Stock (Green pill)
- **Interactive State:** Checkbox select-all dan single row select, search filter instan.

---

### 4. Technical Constraints
- Next.js 15 App Router (`src/app/`)
- Tailwind CSS v4
- Recharts (Client Component dengan dynamic import / `"use client"` agar SSR safe)
- Lucide React icons
- Data mock typed di `src/data/mock-analytics.ts`
- Zero build / lint errors (`bun run build` exit code 0)

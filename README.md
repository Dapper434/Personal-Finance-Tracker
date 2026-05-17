# 📊 Personal Finance Tracker

> A lightweight, responsive web application that helps users take control of their finances by logging, analyzing, and visualizing transactions in real time — backed by a cloud database.

🔗 **Live Demo:** [personal-finance-tracker.vercel.app](https://finance-tracker-7si9l0pv9-dapper434s-projects.vercel.app/#/)

---

## 🧩 Overview

Personal Finance Tracker combines the power of React for a dynamic, component-driven UI with Vanilla JavaScript as the logic engine under the hood. Transaction data is persisted in a Supabase (PostgreSQL) cloud database — meaning your records are safe, accessible, and not tied to any single browser or device.

Whether you're tracking monthly expenses, estimating taxes, or just trying to understand where your money goes — this app has you covered.

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Real-time Calculations** | Balance, income, and expense totals update instantly using a custom JS utility |
| **Transaction Management** | Add and remove transactions with categories, descriptions, and amounts |
| **Tax Estimation** | Built-in utility to estimate taxes based on gross income entries |
| **Data Visualization** | Interactive pie chart powered by Recharts to break down spending by category |
| **Cloud Persistence** | All data is stored in a Supabase PostgreSQL database — survives page refreshes and works across devices |

---

## 🛠️ Tech Stack

- **Frontend Framework** — React.js
- **Logic Engine** — Vanilla JavaScript (ES6+)
- **State Management** — React Hooks (`useState`, `useEffect`)
- **Database** — Supabase (PostgreSQL)
- **Data Visualization** — Recharts
- **Styling** — CSS3
- **Deployment** — Vercel

---

## 📂 Project Structure

```
personal-finance-tracker/
├── public/
└── src/
    ├── components/              # Reusable React UI components
    │   ├── AppNav.jsx           # Navigation bar
    │   ├── Chart.jsx            # Data visualization (Recharts)
    │   ├── TransactionForm.jsx  # Add new transaction
    │   └── TransactionList.jsx  # Display transaction history
    ├── pages/                   # Route-level page components
    │   ├── DashboardPage.jsx    # Overview: balances & charts
    │   └── TransactionsPage.jsx # Full transaction log
    ├── utils/                   # Vanilla JS logic ("The Engine")
    │   └── financial.js         # Math logic: totals, taxes, grouping
    ├── supabaseClient.js        # Supabase connection config
    ├── App.jsx                  # Routes, global state, layout
    └── index.js                 # Entry point
```

---

## ⚙️ Core Logic — `financial.js`

The heart of the app lives in `src/utils/financial.js`. It handles all data manipulation independently of React's rendering cycle, keeping business logic clean and reusable.

```js
// Calculates total income, expenses, and net balance
calculateTotals(transactions)

// Groups transactions by category for chart rendering
categorizeData(transactions)

// Estimates tax deductions from gross income entries
applyTax(amount, rate)

// Formats numeric values to Kenyan Shillings (KES)
format_kenya_shillings(amount)
```

> **Why Vanilla JS?**  
> Separating calculation logic from the UI layer keeps components lean, makes the utils easy to unit test, and means the math works independently of the frontend framework.

---

## 🗄️ Database — Supabase

Transactions are stored in a **PostgreSQL** database hosted on Supabase. The schema is straightforward:

```sql
create table transactions (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('income', 'expense')),
  amount numeric not null,
  category text not null,
  description text not null,
  created_at timestamptz default now()
);
```

The app communicates with Supabase via the `@supabase/supabase-js` client — fetching all transactions on load, inserting on form submit, and deleting on remove.

---

## 📥 Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/Dapper434/Personal-Finance-Tracker.git
```

**2. Navigate into the project**
```bash
cd Personal-Finance-Tracker/react-app
```

**3. Install dependencies**
```bash
npm install
```

**4. Set up environment variables**

Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Get these values from your Supabase project under **Settings → API**.

**5. Start the development server**
```bash
npm start
```

The app will be running at `https://finance-tracker-7si9l0pv9-dapper434s-projects.vercel.app/#/`



*Built with React + Vanilla JS + Supabase · By [Dapper434](https://github.com/Dapper434)*
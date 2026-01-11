// src/utils/calculateTotals.ts
import type { Transaction } from "../types/transaction";

/**
 * Helper: extract year and month (0–11) from an ISO date string
 */
function getYearMonth(dateStr: string) {
  const d = new Date(dateStr);
  return {
    year: d.getFullYear(),
    month: d.getMonth(),
  };
}

/**
 * Format "October 2025"
 */
function formatMonthDisplay(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Return simplified monthly summaries:
 * - Month name
 * - Total income
 * - Total expenses
 * - Remaining balance
 *
 * This EXCLUDES the current month.
 */
export function getSimpleMonthlySummaries(transactions: Transaction[]) {
  if (!transactions.length) return [];

  const map: Record<
    string,
    {
      year: number;
      month: number;
      monthKey: string;
      display: string;
      income: number;
      expenses: number;
      remaining: number; 
    }
  > = {};

  for (const t of transactions) {
    if (!t.date) continue;

    const { year, month } = getYearMonth(t.date);
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;

    if (!map[key]) {
      map[key] = {
        year,
        month,
        monthKey: key,
        display: formatMonthDisplay(year, month),
        income: 0,
        expenses: 0,
        remaining: 0,
      };
    }

    if (t.type === "income") {
      map[key].income += t.amount;
    } else {
      // bill, purchase, daily → treat all as expense
      map[key].expenses += t.amount;
    }
  }

  const array = Object.values(map);

  // EXCLUDE current month
  const now = new Date();
  const currentKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

const filtered = array
  .filter((m) => m.monthKey !== currentKey)
  .sort((a, b) => (a.monthKey > b.monthKey ? -1 : 1)); // newest first

// 🔥 Add remaining balance
filtered.forEach((m) => {
  m.remaining = m.income - m.expenses;
});

  return filtered;
}
import { useMemo } from "react";
import type { Transaction } from "../types/transaction";

export function useCurrentMonthTransactions(transactions: Transaction[]) {
  return useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return (transactions ?? []).filter((t) => {
      if (!t.date) return false;
      const d = new Date(t.date);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    });
  }, [transactions]);
}

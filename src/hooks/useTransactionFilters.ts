import { useMemo, useState } from "react";
import type { Transaction } from "../types/transaction";

export type TransactionFilterType =
  | "all"
  | "income"
  | "bill"
  | "daily"
  | "purchase";

export type SortDirection = "none" | "asc" | "desc";

// const [sortDateDirection, setSortDateDirection] =
//   useState<"none" | "asc" | "desc">("none");

export function useTransactionFilters(transactions: Transaction[]) {
  const [filterType, setFilterType] =
    useState<TransactionFilterType>("all");

  const [sortAmountDirection, setSortAmountDirection] =
    useState<SortDirection>("none");

  const filteredAndSorted = useMemo(() => {
    let result =
      filterType === "all"
        ? transactions
        : transactions.filter(t => t.type === filterType);

    if (sortAmountDirection !== "none") {
      result = [...result].sort((a, b) =>
        sortAmountDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount
      );
    }

    return result;
  }, [transactions, filterType, sortAmountDirection]);

  return {
    transactions: filteredAndSorted,
    filterType,
    setFilterType,
    sortAmountDirection,
    setSortAmountDirection,
  };
}

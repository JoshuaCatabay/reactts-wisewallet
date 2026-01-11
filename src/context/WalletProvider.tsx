import { type ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import { WalletContext } from "./WalletContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: ProviderProps) {
  // const [transactions, setTransactions] = useState<Transaction[]>(() => {
  //   try {
  //     const stored = localStorage.getItem("transactions");
  //     if (stored) return JSON.parse(stored);
  //     // DUMMY DATA (only used when localStorage is empty)
  //     return [
  //       // INCOME
  //       {
  //         id: "i1",
  //         type: "income",
  //         amount: 25000,
  //         description: "Salary",
  //         date: "2025-10-05",
  //       },
  //       {
  //         id: "i2",
  //         type: "income",
  //         amount: 3500,
  //         description: "Allowance Bonus",
  //         date: "2025-09-15",
  //       },

  //       // EXPENSES — OCTOBER
  //       {
  //         id: "e1",
  //         type: "bill",
  //         amount: 1900,
  //         description: "Electric Bill",
  //         date: "2025-10-03",
  //       },
  //       {
  //         id: "e2",
  //         type: "purchase",
  //         amount: 3200,
  //         description: "Groceries",
  //         date: "2025-10-10",
  //       },

  //       // EXPENSES — SEPTEMBER
  //       {
  //         id: "e3",
  //         type: "bill",
  //         amount: 780,
  //         description: "Water",
  //         date: "2025-09-05",
  //       },
  //       {
  //         id: "e4",
  //         type: "purchase",
  //         amount: 2400,
  //         description: "Shoes",
  //         date: "2025-09-27",
  //       },

  //       // EXPENSES — AUGUST
  //       {
  //         id: "e5",
  //         type: "purchase",
  //         amount: 1800,
  //         description: "Keyboard",
  //         date: "2025-08-12",
  //       },
  //       {
  //         id: "e6",
  //         type: "bill",
  //         amount: 999,
  //         description: "Internet",
  //         date: "2025-08-15",
  //       },
  //     ];
  //   } catch {
  //     return [];
  //   }
  // });

 const [transactions, setTransactions] =
    useLocalStorage<Transaction[]>("transactions", []);

const [startingBalance, setStartingBalance] =
  useLocalStorage<number>("startingBalance", 0);

  // CRUD OPERATIONS -------------------------------
  const addTransaction = (t: Transaction) => {
    setTransactions((prev) => [...prev, t]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  // RESET FUNCTIONS -------------------------------
  const clearCurrentMonth = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    setTransactions((prev) =>
      prev.filter((t) => {
        const d = new Date(t.date);
        return (
          d.getFullYear() !== currentYear || d.getMonth() !== currentMonth
        );
      })
    );
  };

  const clearAllTransactions = () => {
    setTransactions([]);
    setStartingBalance(0);
  };

  // PROVIDER -------------------------------------
  return (
    <WalletContext.Provider
      value={{
        startingBalance,
        setStartingBalance,
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        clearCurrentMonth,
        clearAllTransactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
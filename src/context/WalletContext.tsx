import { createContext } from "react";
import type { Transaction } from "../types/transaction";

export interface WalletContextProps {
  transactions: Transaction[];

  startingBalance: number;
  setStartingBalance: (amount: number) => void;

  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updated: Partial<Transaction>) => void;

  clearCurrentMonth: () => void;
  clearAllTransactions: () => void;
}

export const WalletContext = createContext<WalletContextProps | undefined>(
  undefined
);

export type TransactionType =
  | "income"
  | "current"
  | "bill"
  | "daily"
  | "purchase";

export type IncomeFrequency = "monthly" | "weekly" | "one-time";

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string; // ISO string

  // 👇 Only used when type === "income"
  frequency?: IncomeFrequency;
}
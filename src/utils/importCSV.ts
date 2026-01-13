import type { Transaction, TransactionType, IncomeFrequency } from "../types/transaction";

interface ImportResult {
  valid: Transaction[];
  errors: { row: number; reason: string }[];
}

const VALID_TYPES: TransactionType[] = [
  "income",
  "bill",
  "daily",
  "purchase",
];

const VALID_FREQUENCIES: IncomeFrequency[] = [
  "monthly",
  "weekly",
  "one-time",
];

export function importCSV(text: string): ImportResult {
  const lines = text.split("\n").filter(Boolean);
  const [, ...rows] = lines; // skip header

  const valid: Transaction[] = [];
  const errors: { row: number; reason: string }[] = [];

  rows.forEach((line, index) => {
    const rowNumber = index + 2; // header is row 1
    const cols = line.split(",");

    if (cols.length < 5) {
      errors.push({ row: rowNumber, reason: "Missing columns" });
      return;
    }

    const [
      _id,
      type,
      description,
      amountRaw,
      dateRaw,
      frequencyRaw,
    ] = cols;

    if (!VALID_TYPES.includes(type as TransactionType)) {
      errors.push({ row: rowNumber, reason: `Invalid type: ${type}` });
      return;
    }

    const amount = Number(amountRaw);
    if (isNaN(amount) || amount <= 0) {
      errors.push({ row: rowNumber, reason: "Invalid amount" });
      return;
    }

    const date = new Date(dateRaw);
    if (isNaN(date.getTime())) {
      errors.push({ row: rowNumber, reason: `Invalid date: ${dateRaw}` });
      return;
    }

    if (
      type === "income" &&
      (!frequencyRaw ||
        !VALID_FREQUENCIES.includes(frequencyRaw as IncomeFrequency))
    ) {
      errors.push({
        row: rowNumber,
        reason: "Income requires valid frequency",
      });
      return;
    }

    valid.push({
      id: crypto.randomUUID(),
      type: type as TransactionType,
      description: description.replace(/^"|"$/g, ""),
      amount,
      date: date.toISOString(),
      frequency:
        type === "income"
          ? (frequencyRaw as IncomeFrequency)
          : undefined,
    });
  });

  return { valid, errors };
}

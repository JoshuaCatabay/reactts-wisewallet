import { useState, useEffect, startTransition } from "react";
import type { Transaction, TransactionType, IncomeFrequency } from "../../types/transaction";

interface Props {
  type: TransactionType;
  onAdd?: (t: Transaction) => void;
  onEdit?: (updated: Partial<Transaction>) => void;
  onDone?: () => void;
  existing?: Transaction;
}

export default function TransactionForm({
  type,
  onAdd,
  onEdit,
  onDone,
  existing
}: Props) {
  const [description, setDescription] = useState(existing?.description || "");
  const [amount, setAmount] = useState(existing ? String(existing.amount) : "");

  // 👇 NEW FOR INCOME
  const [frequency, setFrequency] = useState<IncomeFrequency>(
    (existing?.frequency as IncomeFrequency) || "one-time"
  );

  // Pre-fill when editing
  useEffect(() => {
    if (existing) {
      startTransition(() => {
        setDescription(existing.description);
        setAmount(String(existing.amount));
        if (existing.frequency) {
          setFrequency(existing.frequency as IncomeFrequency);
        }
      });
    }
  }, [existing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // EDIT MODE
    if (existing && onEdit) {
      onEdit({
        description,
        amount: Number(amount),
        ...(type === "income" ? { frequency } : {})
      });

      onDone?.();
      return;
    }

    // ADD MODE
    if (onAdd) {
      const newItem: Transaction = {
        id: crypto.randomUUID(),
        type,
        description,
        amount: Number(amount),
        date: new Date().toISOString(),
        ...(type === "income" ? { frequency } : {})
      };

      onAdd(newItem);
    }

    setDescription("");
    setAmount("");

    onDone?.();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Amount */}
      <div className="mb-3">
        <label className="form-label">Amount (₱)</label>
        <input
          type="number"
          className="form-control no-arrows"
          placeholder="Enter amount"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Income Frequency (only for income) */}
      {type === "income" && (
        <div className="mb-3">
          <label className="form-label">Income Frequency</label>
          <select
            className="form-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as IncomeFrequency)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="one-time">One-time</option>
          </select>
        </div>
      )}

      <button className="btn btn-primary w-100">
        {existing ? "Save Changes" : "Add"}
      </button>
    </form>
  );
}

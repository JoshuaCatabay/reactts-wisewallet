import { useState } from "react";

interface Props {
  onSave: (amount: number) => void;
  onDone?: () => void;
}

export default function StartingBalanceForm({ onSave, onDone }: Props) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const value = Number(amount);
    if (isNaN(value) || value < 0) return;

    onSave(value);
    onDone?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Starting Balance (₱)</label>
        <input
          type="number"
          className="form-control no-arrows"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100">
        Save Starting Balance
      </button>
    </form>
  );
}

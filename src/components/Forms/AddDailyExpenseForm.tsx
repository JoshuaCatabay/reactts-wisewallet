import TransactionForm from "./TransactionForm";
import type { Transaction } from "../../types/transaction";

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function AddDailyExpenseForm({ onAdd }: Props) {
  return <TransactionForm type="daily" onAdd={onAdd} />;
}

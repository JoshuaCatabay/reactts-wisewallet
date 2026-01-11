import TransactionForm from "./TransactionForm";
import type { Transaction } from "../../types/transaction";

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function AddIncomeForm({ onAdd }: Props) {
  return <TransactionForm type="income" onAdd={onAdd} />;
}

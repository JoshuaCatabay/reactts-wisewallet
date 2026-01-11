import TransactionForm from "./TransactionForm";
import type { Transaction } from "../../types/transaction";

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function AddBillsForm({ onAdd }: Props) {
  return <TransactionForm type="bill" onAdd={onAdd} />;
}

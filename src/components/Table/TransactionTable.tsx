import type { Transaction } from "../../types/transaction";
import TableRow from "./TableRow";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (t: Transaction) => void;
}

export default function TransactionTable({ transactions, onDelete, onEdit }: Props) {
  return (
    <table className="table table-theme">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <TableRow
            key={t.id}
            transaction={t}
            onDelete={onDelete}
            onEdit={() => onEdit(t)}
          />
        ))}
      </tbody>
    </table>
  );
}
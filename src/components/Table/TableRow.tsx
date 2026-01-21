import type { Transaction } from "../../types/transaction";

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
  onEdit: (t: Transaction) => void;
}

export default function TableRow({ transaction, onDelete, onEdit }: Props) {
  const isIncome = transaction.type === "income";

  return (
    <tr>
      <td>
        <span
          className={`tx-desc ${
            isIncome ? "tx-income" : "tx-expense"
          }`}
        >
          {transaction.description}
        </span>
      </td>

      <td>₱{transaction.amount.toLocaleString()}</td>
      <td>{new Date(transaction.date).toLocaleDateString()}</td>

      <td>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(transaction)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(transaction.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

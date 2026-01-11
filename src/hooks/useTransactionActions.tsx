import TransactionForm from "../components/Forms/TransactionForm";
import StartingBalanceForm from "../components/Forms/StartingBalanceForm";
import type { Transaction } from "../types/transaction";
import { exportCSV } from "../utils/exportCSV";
import { importCSV } from "../utils/importCSV";

interface Params {
  modal: {
    open: (title: string, content: React.ReactNode) => void;
    close: () => void;
  };
  addTransaction: (t: Transaction) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  clearCurrentMonth: () => void;
  clearAllTransactions: () => void;
  setStartingBalance: (amount: number) => void;
  transactions: Transaction[];
  currentMonthTransactions: Transaction[];
  visibleTransactions: Transaction[];
}

export function useTransactionActions({
  modal,
  addTransaction,
  editTransaction,
  clearCurrentMonth,
  clearAllTransactions,
  setStartingBalance,
  transactions,
  currentMonthTransactions,
  visibleTransactions,
}: Params) {
  const openIncomeForm = () => {
    modal.open(
      "Add Income",
      <TransactionForm
        type="income"
        onAdd={addTransaction}
        onDone={modal.close}
      />
    );
  };

  const openBillsForm = () => {
    modal.open(
      "Add Bill",
      <TransactionForm
        type="bill"
        onAdd={addTransaction}
        onDone={modal.close}
      />
    );
  };

  const openDailyExpenseForm = () => {
    modal.open(
      "Add Expense",
      <TransactionForm
        type="daily"
        onAdd={addTransaction}
        onDone={modal.close}
      />
    );
  };

  const openPurchaseForm = () => {
    modal.open(
      "Add Purchase",
      <TransactionForm
        type="purchase"
        onAdd={addTransaction}
        onDone={modal.close}
      />
    );
  };

  const openEditForm = (transaction: Transaction) => {
    modal.open(
      "Edit Transaction",
      <TransactionForm
        type={transaction.type}
        existing={transaction}
        onEdit={(updated) => {
          editTransaction(transaction.id, updated);
          modal.close();
        }}
        onDone={modal.close}
      />
    );
  };

  const openResetModal = () => {
    modal.open(
      "Reset Transactions",
      <div className="text-center p-2">
        <p>What would you like to reset?</p>

        <div className="d-flex flex-column gap-2 mt-3">
          <button
            className="btn btn-warning"
            onClick={() => {
              clearCurrentMonth();
              modal.close();
            }}
          >
            Clear Current Month Only
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm("Are you sure you want to delete ALL transactions?")) {
                clearAllTransactions();
                modal.close();
              }
            }}
          >
            Reset Whole Wallet
          </button>

          <button className="btn btn-secondary" onClick={modal.close}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const openStartingBalanceForm = () => {
    modal.open(
      "Set Starting Balance",
      <StartingBalanceForm
        onSave={setStartingBalance}
        onDone={modal.close}
      />
    );
  };

  const openExportModal = () => {
    modal.open(
      "Export Transactions",
      <div className="d-flex flex-column gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            exportCSV(
              transactions,
              `wisewallet_all_${new Date().toISOString().slice(0, 10)}.csv`
            );
            modal.close();
          }}
        >
          Export All
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => {
            exportCSV(
              currentMonthTransactions,
              `wisewallet_${new Date().toISOString().slice(0, 7)}.csv`
            );
            modal.close();
          }}
        >
          Export Current Month
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            exportCSV(
              visibleTransactions,
              `wisewallet_filtered_${new Date().toISOString().slice(0, 10)}.csv`
            );
            modal.close();
          }}
        >
          Export Filtered
        </button>

        <button className="btn btn-secondary mt-2" onClick={modal.close}>
          Cancel
        </button>
      </div>
    );
    
  };

  const openImportModal = () => {
  modal.open(
    "Import Transactions",
    <div className="d-flex flex-column gap-3">
      <input
        type="file"
        accept=".csv"
        className="form-control"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const text = await file.text();
          const { valid, errors } = importCSV(text);

          valid.forEach(addTransaction);

          modal.open(
            "Import Result",
            <div>
              <p>
                ✅ Imported <strong>{valid.length}</strong> transactions
              </p>

              {errors.length > 0 && (
                <>
                  <p className="text-warning">
                    ⚠ Skipped {errors.length} rows
                  </p>
                  <ul className="small">
                    {errors.map((e, i) => (
                      <li key={i}>
                        Row {e.row}: {e.reason}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <button
                className="btn btn-primary mt-3"
                onClick={modal.close}
              >
                Done
              </button>
            </div>
          );
        }}
      />

      <button className="btn btn-secondary" onClick={modal.close}>
        Cancel
      </button>
    </div>
  );
};

  return {
    openIncomeForm,
    openBillsForm,
    openDailyExpenseForm,
    openPurchaseForm,
    openEditForm,
    openResetModal,
    openStartingBalanceForm,
    openExportModal,
    openImportModal,
  };
}

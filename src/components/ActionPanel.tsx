interface Props {
  onSetStartingBalance: () => void;
  onAddIncome: () => void;
  onAddBill: () => void;
  onAddExpense: () => void;
  onAddPurchase: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function ActionPanel({
  onAddIncome,
  onAddBill,
  onAddExpense,
  onAddPurchase,
  onReset,
  onExport,
  onImport,
}: Props) {
return (
  <div className="d-flex flex-wrap justify-content-md-between gap-2 mb-4">
    {/* LEFT GROUP */}
    <div className="d-flex flex-wrap gap-2">
      <button onClick={onAddIncome} className="btn btn-success py-2">
        <span className="d-none d-sm-inline">+ Income</span>
        <span className="d-sm-none">+ Income</span>
      </button>

      <button onClick={onAddBill} className="btn btn-danger py-2">
        <span className="d-none d-sm-inline">+ Bill</span>
        <span className="d-sm-none">+ Bill</span>
      </button>

      <button onClick={onAddExpense} className="btn btn-primary py-2">
        <span className="d-none d-sm-inline">+ Daily Expense</span>
        <span className="d-sm-none">+ Daily</span>
      </button>

      <button onClick={onAddPurchase} className="btn btn-warning py-2">
        <span className="d-none d-sm-inline">+ Purchase</span>
        <span className="d-sm-none">+ Buy</span>
      </button>
    </div>

    {/* RIGHT GROUP */}
    <div className="d-flex flex-wrap gap-2">
      <button onClick={onExport} className="btn btn-outline-primary py-2">
        <span className="d-none d-sm-inline">Export CSV</span>
        <span className="d-sm-none">Export</span>
      </button>

      <button onClick={onImport} className="btn btn-outline-primary py-2">
        <span className="d-none d-sm-inline">Import CSV</span>
        <span className="d-sm-none">Import</span>
      </button>

      <button onClick={onReset} className="btn btn-dark py-2">
        <span className="d-none d-sm-inline">Reset</span>
        <span className="d-sm-none">Reset</span>
      </button>
    </div>
  </div>
);
}

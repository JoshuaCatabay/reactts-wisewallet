import { useContext, } from "react";
// Context
import { WalletContext } from "./context/WalletContext";
// Hooks
import { useModal } from "./hooks/useModal";
import { useCurrentMonthTransactions } from "./hooks/useCurrentMonthTransactions";
import { useTransactionFilters } from "./hooks/useTransactionFilters";
import { useTransactionActions } from "./hooks/useTransactionActions";
// Components
import ThemeToggle from "./components/ThemeToggle";
import ActionPanel from "./components/ActionPanel";
import TransactionTable from "./components/Table/TransactionTable";
import CustomModal from "./components/CustomModal";
import Summary from "./components/Summary/RemainingBalance";
import MonthlyReport from "./components/MonthlyReport/MonthlyReport";

export default function App() {
  // 1. Context
  const wallet = useContext(WalletContext);
  if (!wallet) {
    throw new Error("WalletContext not found. Wrap <App /> with <WalletProvider>.");
  }
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
    clearCurrentMonth,
    clearAllTransactions,
    setStartingBalance,
  } = wallet;
  // 2. Derived data
  const currentMonthTransactions = useCurrentMonthTransactions(transactions);
  // 3. UI state hooks
  const modal = useModal();
  const {
    transactions: visibleTransactions,
    filterType,
    setFilterType,
    sortAmountDirection,
    setSortAmountDirection,
  } = useTransactionFilters(currentMonthTransactions);
  // 4. Actions
  const actions = useTransactionActions({
    modal,
    addTransaction,
    editTransaction,
    clearCurrentMonth,
    clearAllTransactions,
    setStartingBalance,
    transactions,
    currentMonthTransactions,
    visibleTransactions,
  });

  
  return (
    // <div className={`app-shell ${isDark ? "dark" : ""}`}>
    <div className="app-shell" >
        <div className="container  py-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="m-0">WiseWallet</h1>

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>

      {/* BUTTONS */}
      <ActionPanel
        onSetStartingBalance={actions.openStartingBalanceForm}
        onAddIncome={actions.openIncomeForm}
        onAddBill={actions.openBillsForm}
        onAddExpense={actions.openDailyExpenseForm}
        onAddPurchase={actions.openPurchaseForm}
        onReset={actions.openResetModal}
        onExport={actions.openExportModal}
        onImport={actions.openImportModal}
      />
        {/* setSortDateDirection("none"); disable date sorting */}
        <div className="row g-2 g-md-3 mb-4">
  {/* Filter by Type */}
  <div className="col-6 col-md-4">
    <label className="form-label fw-bold small small text-muted">
      Filter by Type
    </label>
    <select
      className="form-select form-select-sm form-select-md"
      value={filterType}
      onChange={(e) =>
        setFilterType(
          e.target.value as "all" | "income" | "bill" | "daily" | "purchase"
        )
      }
    >
      <option value="all">All</option>
      <option value="income">Income</option>
      <option value="bill">Bills</option>
      <option value="daily">Daily</option>
      <option value="purchase">Purchases</option>
    </select>
  </div>

  {/* Sort by Amount */}
  <div className="col-6 col-md-4">
    <label className="form-label fw-bold small small text-muted">
      Sort by Amount
    </label>
    <select
      className="form-select form-select-sm"
      value={sortAmountDirection}
      onChange={(e) =>
        setSortAmountDirection(e.target.value as "asc" | "desc")
      }
    >
      <option value="asc">Low → High</option>
      <option value="desc">High → Low</option>
    </select>
  </div>
</div>


        {/* MAIN TABLE */}
        <TransactionTable
          transactions={visibleTransactions}
          onDelete={deleteTransaction}
          onEdit={actions.openEditForm}
        />
        {/* MODAL */}
        <CustomModal
          show={modal.show}
          title={modal.title}
          onClose={modal.close}
        >
          {modal.content}
        </CustomModal>
        <Summary 
        onOpenStartingBalance={actions.openStartingBalanceForm}/>
      <MonthlyReport />
    </div>
    </div>
  );
}

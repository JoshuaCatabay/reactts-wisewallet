import { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";

interface SummaryProps {
  onOpenStartingBalance: () => void;
}

export default function Summary({ onOpenStartingBalance }: SummaryProps) {
  const wallet = useContext(WalletContext);
  if (!wallet) return null;

  const { transactions, startingBalance } = wallet;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Days in current month
  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // Current month transactions only
  const currentMonthTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getFullYear() === currentYear &&
      d.getMonth() === currentMonth
    );
  });

  let monthlyIncome = 0;
  let billTotal = 0;
  let purchaseTotal = 0;
  let dailyTotal = 0;
  let dailyExpensePerDay = 0;
  let purchaseCount = 0;

  for (const t of currentMonthTransactions) {
    if (t.type === "income") {
      if (t.frequency === "monthly") monthlyIncome += t.amount;
      else if (t.frequency === "weekly")
        monthlyIncome += (t.amount * 52) / 12;
      else monthlyIncome += t.amount;
    }

    if (t.type === "bill") billTotal += t.amount;

    if (t.type === "purchase") {
      purchaseTotal += t.amount;
      purchaseCount++;
    }

    if (t.type === "daily") {
      dailyExpensePerDay += t.amount;
      dailyTotal += t.amount * daysInMonth;
    }
  }

  const totalExpenses =
    billTotal + purchaseTotal + dailyTotal;

  const remaining =
    startingBalance + monthlyIncome - totalExpenses;

  const format = (n: number) =>
    "₱" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="fw-bold mb-4">Summary</h3>

          <div className="row g-3 g-md-4">
  {/* Starting Balance */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-muted small">Starting Balance</div>

      {startingBalance === 0 ? (
        <button
          className="btn btn-sm btn-outline-primary mt-1"
          onClick={onOpenStartingBalance}
        >
          + Starting Balance
        </button>
      ) : (
        <div className="fw-bold fs-6 fs-md-5 text-nowrap">
          {format(startingBalance)}
        </div>
      )}
    </div>
  </div>

  {/* Bills */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-danger small">Monthly Bills</div>
      <div className="fw-bold fs-6 fs-md-5 text-nowrap">
        {format(billTotal)}
      </div>
    </div>
  </div>

  {/* Monthly Income */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-success small">Monthly Income</div>
      <div className="fw-bold fs-6 fs-md-5 text-nowrap">
        {format(monthlyIncome)}
      </div>
    </div>
  </div>

  {/* Daily Expenses */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-warning small">
        Daily Expenses (Monthly)
      </div>
        <div className="fw-bold fs-6 fs-md-5 text-nowrap">
          {format(dailyTotal)}
          <span
            className="text-muted fw-normal fs-8 fs-md-6 ms-md-2 ms-1"
          >
            ({format(dailyExpensePerDay)}/day)
          </span>
        </div>
    </div>
  </div>

  {/* Empty spacer to align Purchases on mobile */}
  <div className="d-none d-md-block col-md-3"></div>

  {/* Purchases */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-info small">Purchases</div>
      <div className="fw-bold fs-6 fs-md-5 text-nowrap">
        {format(purchaseTotal)}
        <span className="text-muted small ms-1">
          ({purchaseCount})
        </span>
      </div>
    </div>
  </div>

  {/* Remaining Money */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-danger small">Total Expenses</div>
      <div className="fw-bold fs-6 fs-md-4 text-nowrap">
        {format(totalExpenses)}
      </div>
    </div>
  </div>

  {/* Total Expenses */}
  <div className="col-6 col-md-3">
    <div>
      <div className="text-primary small">Remaining Money</div>
            <div
        className={`fw-bold fs-6 fs-md-4 text-nowrap ${
          remaining < 0 ? "text-danger" : "text-success"
        }`}
      >
        {format(remaining)}
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

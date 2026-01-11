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
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="fw-bold mb-4">Summary</h3>

          <div className="row g-4">
            {/* Starting Balance */}
            <div className="col-md-3">
              <div>
                <div className="text-muted small">
                  Starting Balance
                </div>

                {startingBalance === 0 ? (
                  <button
                    className="btn btn-sm btn-outline-primary mt-1"
                    onClick={onOpenStartingBalance}
                  >
                    + Starting Balance
                  </button>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <div className="fw-bold fs-5">
                      {format(startingBalance)}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary mt-1"
                      onClick={onOpenStartingBalance}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Monthly Income */}
            <div className="col-md-3">
              <div>
                <div className="text-success small">
                  Monthly Income
                </div>
                <div className="fw-bold fs-5">
                  {format(monthlyIncome)}
                </div>
              </div>
            </div>

            {/* Bills */}
            <div className="col-md-3">
              <div>
                <div className="text-danger small">
                  Bills
                </div>
                <div className="fw-bold fs-5">
                  {format(billTotal)}
                </div>
              </div>
            </div>

            {/* Daily Expenses */}
            <div className="col-md-3">
              <div>
                <div className="text-warning small">
                  Daily Expenses (Monthly)
                </div>
                <div className="fw-bold fs-5">
                  {format(dailyTotal)}
                  <span className="text-muted small ms-2">
                    ({format(dailyExpensePerDay)} / day)
                  </span>
                </div>
              </div>
            </div>

            {/* Purchases */}
            <div className="col-md-3">
              <div>
                <div className="text-info small">
                  Purchases
                </div>
                <div className="fw-bold fs-5">
                  {format(purchaseTotal)}
                  <span className="text-muted small ms-1">
                    ({purchaseCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Total Expenses */}
            <div className="col-md-3">
              <div>
                <div className="text-danger small">
                  Total Expenses
                </div>
                <div className="fw-bold fs-4">
                  {format(totalExpenses)}
                </div>
              </div>
            </div>

            {/* Remaining */}
            <div className="col-md-3">
              <div>
                <div className="text-primary small">
                  Remaining Money
                </div>
                <div
                  className={`fw-bold fs-4 ${
                    remaining < 0
                      ? "text-danger"
                      : "text-success"
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

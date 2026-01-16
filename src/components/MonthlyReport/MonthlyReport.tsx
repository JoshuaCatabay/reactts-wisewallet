import { useMemo } from "react";
import { useWallet } from "../../context/useWallet";
import { getSimpleMonthlySummaries } from "../../utils/calculateTotals";

export default function MonthlyReport() {
  const { transactions } = useWallet();

  const monthlySummaries = useMemo(() => {
    return getSimpleMonthlySummaries(transactions);
  }, [transactions]);

  if (!monthlySummaries.length) {
    return (
      <p className="text-center pt-5 text-muted">
        No historical months to show yet.
      </p>
    );
  }

  return (
    <section className="card p-4 mt-4">
      <h2 className="text-center fw-bold mb-4">
        Monthly Report
      </h2>

      <div className="row g-3">
        {monthlySummaries.map((m) => (
          <div
            key={m.monthKey}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="bg-surface h-100 p-4">
              <h5 className="fw-semibold text-center mb-3">
                {m.display}
              </h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Income</span>
                <span className="fw-semibold text-success">
                  ₱{m.income.toLocaleString()}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Expenses</span>
                <span className="fw-semibold text-danger">
                  ₱{m.expenses.toLocaleString()}
                </span>
              </div>

              <hr className="my-2" />

              <div className="d-flex justify-content-between">
                <span className="fw-medium">Remaining</span>
                <span
                  className={
                    "fw-bold " +
                    (m.remaining >= 0
                      ? "text-success"
                      : "text-danger")
                  }
                >
                  ₱{m.remaining.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
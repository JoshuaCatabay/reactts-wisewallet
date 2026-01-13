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
      <p className="text-gray-500 text-center pt-8">
        No historical months to show yet.
      </p>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        Monthly Report
      </h1>

      {monthlySummaries.map((m) => (
        <div
          key={m.monthKey}
          className="bg-white shadow rounded-xl p-5 space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">
            {m.display}
          </h2>

          {/* Total Income */}
          <div className="flex justify-between text-lg">
            <span className="font-medium">Income:</span>
            <span className="text-green-600 font-semibold">
              ₱{m.income.toLocaleString()}
            </span>
          </div>

          {/* Total Expenses */}
          <div className="flex justify-between text-lg">
            <span className="font-medium">Expenses:</span>
            <span className="text-red-600 font-semibold">
              ₱{m.expenses.toLocaleString()}
            </span>
          </div>

          {/* Remaining */}
          <div className="flex justify-between text-lg border-t pt-3">
            <span className="font-medium">Remaining:</span>
            <span
              className={
                "font-bold " +
                (m.remaining >= 0
                  ? "text-green-700"
                  : "text-red-700")
              }
            >
              ₱{m.remaining.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
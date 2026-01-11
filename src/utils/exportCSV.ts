import type { Transaction } from "../types/transaction";

export const exportCSV = (
  data: Transaction[],
  filename: string
) => {
  if (!data || data.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const header = [
    "ID",
    "Type",
    "Description",
    "Amount",
    "Date",
    "Frequency",
  ];

  const rows = data.map(t => [
    t.id,
    t.type,
    `"${t.description}"`,
    t.amount,
    t.date,
    t.frequency ?? "",
  ]);

  const csv =
    "\uFEFF" +
    [header, ...rows]
      .map(row => row.join(","))
      .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
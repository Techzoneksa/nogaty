import React from "react";

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T>({
  columns,
  data,
  emptyMessage = "لا توجد بيانات لعرضها حالياً",
  onRowClick,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-border-base rounded-2xl bg-white shadow-xs">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-bg-base/70 border-b border-border-base text-xs font-bold text-text-secondary select-none">
            {columns.map((col, idx) => (
              <th key={idx} className={`p-4 font-semibold ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-base text-sm text-text-primary">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-text-secondary">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors hover:bg-slate-50/50 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`p-4 ${col.className || ""}`}>
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

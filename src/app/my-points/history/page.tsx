"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import BottomNav from "@/components/my-points/BottomNav";

interface Transaction {
  id: number;
  date: string;
  type: "إضافة" | "استبدال";
  points: number;
  note: string;
}

const mockTransactions: Transaction[] = [
  { id: 1, date: "2024-01-15", type: "إضافة", points: 500, note: "مشتربات يومية" },
  { id: 2, date: "2024-01-10", type: "استبدال", points: -200, note: "خصم على فاتورة" },
  { id: 3, date: "2024-01-05", type: "إضافة", points: 150, note: "عروض خاصة" },
  { id: 4, date: "2024-01-01", type: "إضافة", points: 1000, note: "نقاط ترحيبية" },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<"الكل" | "إضافة" | "استبدال">("الكل");

  const filteredTransactions = mockTransactions.filter((t) =>
    filter === "الكل" ? true : t.type === filter
  );

  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/my-points/home">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-xl font-bold text-white">سجل النقاط</h1>
        </div>

        <div className="flex gap-2">
          {(["الكل", "إضافة", "استبدال"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type
                  ? "bg-white text-primary"
                  : "bg-white/20 text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {filteredTransactions.length === 0 ? (
          <Card className="bg-white border-0 shadow-md">
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="w-16 h-16 bg-text-secondary/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-text-secondary font-medium">
                لا توجد عمليات نقاط بعد
              </p>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-white border-0 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "إضافة"
                          ? "bg-success/10"
                          : "bg-danger/10"
                      }`}
                    >
                      {transaction.type === "إضافة" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-success"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-danger"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 12H4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-text-primary font-bold">
                        {transaction.type === "إضافة" ? "إضافة نقاط" : "استبدال نقاط"}
                      </p>
                      <p className="text-text-secondary text-xs">{transaction.note}</p>
                      <p className="text-text-secondary text-xs">{transaction.date}</p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-black ${
                      transaction.type === "إضافة" ? "text-success" : "text-danger"
                    }`}
                  >
                    {transaction.type === "إضافة" ? "+" : ""}
                    {transaction.points}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

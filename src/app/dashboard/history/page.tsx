"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

const transactions = [
  { id: 1, customer: "خالد العتيبي", type: "EARN", points: 35, detail: "عملية شراء", date: "2026-06-02 10:30" },
  { id: 2, customer: "سارة محمد", type: "REDEEM", points: -100, detail: "مشروب مجاني", date: "2026-06-02 11:45" },
  { id: 3, customer: "سلطان سليم", type: "EARN", points: 82, detail: "عملية شراء", date: "2026-06-02 12:15" },
  { id: 4, customer: "منيرة عبد الله", type: "EARN", points: 125, detail: "عملية شراء", date: "2026-06-02 14:00" },
];

export default function DashboardHistoryPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="سجل العمليات"
        description="سجل جميع عمليات إضافة واستبدال النقاط."
        breadcrumbs={["لوحة التحكم", "سجل العمليات"]}
        action={
          <Button variant="outline" size="sm">تصدير</Button>
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-base border-b border-border-base">
              <tr>
                <th className="text-right text-xs font-bold text-text-secondary p-4">العميل</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">النوع</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">النقاط</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">التفاصيل</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border-base/40 hover:bg-bg-base/30">
                  <td className="p-4 text-xs font-bold text-text-primary">{tx.customer}</td>
                  <td className="p-4">
                    <Badge variant={tx.type === "EARN" ? "success" : "danger"}>
                      {tx.type === "EARN" ? "إضافة" : "استبدال"}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs font-black text-text-primary">{tx.points > 0 ? "+" : ""}{tx.points}</td>
                  <td className="p-4 text-xs text-text-secondary">{tx.detail}</td>
                  <td className="p-4 text-xs text-text-secondary font-mono">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
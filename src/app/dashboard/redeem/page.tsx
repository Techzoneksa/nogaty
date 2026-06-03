"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { useTranslation } from "@/lib/i18n/useTranslation";

const recentTransactions = [
  { id: 1, customer: "خالد العتيبي", type: "EARN", points: 35, detail: "عملية شراء", date: "منذ دقيقتين" },
  { id: 2, customer: "سارة محمد", type: "REDEEM", points: -100, detail: "مشروب مجاني", date: "منذ 12 دقيقة" },
  { id: 3, customer: "سلطان سليم", type: "EARN", points: 82, detail: "عملية شراء", date: "منذ 28 دقيقة" },
];

export default function DashboardRedeemPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="استبدال النقاط"
        description="إدارة عمليات استبدال نقاط العملاء."
        breadcrumbs={["لوحة التحكم", "استبدال النقاط"]}
      />

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">البحث عن العميل</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input placeholder="رقم الهاتف أو رقم العضوية..." />
          </div>
          <Button variant="primary">بحث</Button>
          <Button variant="outline">مسح QR</Button>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">آخر عمليات الاستبدال</h3>
        <div className="flex flex-col gap-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary">{tx.customer}</span>
                <span className="text-[10px] text-text-secondary">{tx.detail} - {tx.date}</span>
              </div>
              <Badge variant={tx.type === "EARN" ? "success" : "danger"}>
                {tx.points > 0 ? "+" : ""}{tx.points}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
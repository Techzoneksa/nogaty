"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

const invoices = [
  { id: "INV-001", date: "2026-06-01", amount: 249, status: "paid", package: "احترافية" },
  { id: "INV-002", date: "2026-05-01", amount: 249, status: "paid", package: "احترافية" },
  { id: "INV-003", date: "2026-04-01", amount: 249, status: "paid", package: "احترافية" },
];

export default function DashboardBillingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="الاشتراك والفواتير"
        description="إدارة اشتراكك وفواتيرك."
        breadcrumbs={["لوحة التحكم", "الاشتراك"]}
      />

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-text-primary">باقة احترافية</span>
            <span className="text-xs text-text-secondary">249 ر.س / شهرياً</span>
            <span className="text-[10px] text-text-secondary">التجديد: 2026-07-01</span>
          </div>
        </div>
        <Badge variant="success" className="text-sm">نشط</Badge>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-800">الدفع غير مفعل حالياً</span>
          <span className="text-[10px] text-amber-700">لا يوجد Stripe أو دفع حقيقي. الواجهات جاهزة مستقبلاً.</span>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">الفواتير</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border-base">
              <tr>
                <th className="text-right text-xs font-bold text-text-secondary p-3">رقم الفاتورة</th>
                <th className="text-right text-xs font-bold text-text-secondary p-3">التاريخ</th>
                <th className="text-right text-xs font-bold text-text-secondary p-3">الباقة</th>
                <th className="text-right text-xs font-bold text-text-secondary p-3">المبلغ</th>
                <th className="text-right text-xs font-bold text-text-secondary p-3">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border-base/40 hover:bg-bg-base/30">
                  <td className="p-3 text-xs font-mono text-text-primary">{invoice.id}</td>
                  <td className="p-3 text-xs text-text-secondary">{invoice.date}</td>
                  <td className="p-3 text-xs text-text-primary">{invoice.package}</td>
                  <td className="p-3 text-xs font-bold text-text-primary">{invoice.amount} ر.س</td>
                  <td className="p-3"><Badge variant="success" className="text-[10px]">مدفوع</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
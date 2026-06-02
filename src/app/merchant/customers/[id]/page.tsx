"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function CustomerDetailPage() {
  const { t } = useTranslation();
  const params = useParams();

  const customer = {
    id: params.id,
    name: "سعيد القحطاني",
    phone: "0501234412",
    memberId: "NGT-001247",
    tier: "Gold",
    status: "active",
    currentPoints: 240,
    totalEarned: 1250,
    totalRedeemed: 1010,
    customerSince: "15 مارس 2024",
  };

  const operations = [
    { id: "1", type: "إضافة نقاط", amount: "+35 نقطة", detail: "عملية شراء بـ 35 ريال", date: "منذ 5 دقائق", branch: "فرع العليا" },
    { id: "2", type: "إضافة نقاط", amount: "+82 نقطة", detail: "عملية شراء بـ 82 ريال", date: "منذ يوم", branch: "فرع العليا" },
    { id: "3", type: "استبدال نقاط", amount: "-100 نقطة", detail: "مشروب مجاني", date: "منذ 3 أيام", branch: "فرع التخصصي" },
    { id: "4", type: "إضافة نقاط", amount: "+125 نقطة", detail: "عملية شراء بـ 125 ريال", date: "منذ أسبوع", branch: "فرع العليا" },
    { id: "5", type: "استبدال نقاط", amount: "-200 نقطة", detail: "كوبون خصم 20%", date: "منذ أسبوعين", branch: "فرع العليا" },
  ];

  const tierColors: Record<string, "primary" | "secondary" | "accent" | "danger"> = {
    Bronze: "primary",
    Silver: "secondary",
    Gold: "accent",
    VIP: "danger",
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="تفاصيل العميل"
        description="عرض بيانات العميل ونقاطه وسجل عملياته."
        breadcrumbs={["كافيه نقطة", "العملاء", customer.name]}
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}>
              تعديل
            </Button>
            <Button variant="danger" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}>
              إيقاف
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-black text-text-primary">
                {customer.name.charAt(0)}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-text-primary">{customer.name}</span>
                  <Badge variant={tierColors[customer.tier]}>{customer.tier}</Badge>
                </div>
                <span className="text-sm text-text-secondary font-mono">{customer.phone}</span>
                <span className="text-xs text-text-secondary">رقم العضوية: {customer.memberId}</span>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-2 p-4 bg-bg-base rounded-xl">
              <svg className="w-16 h-16 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span className="text-[10px] text-text-secondary">امسح للتحقق</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-base">
            <div className="flex flex-col items-center gap-1 p-3 bg-bg-base rounded-xl">
              <span className="text-xs text-text-secondary">النقاط الحالية</span>
              <span className="text-xl font-black text-primary">{customer.currentPoints}</span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 bg-bg-base rounded-xl">
              <span className="text-xs text-text-secondary">إجمالي المكتسب</span>
              <span className="text-xl font-black text-emerald-600">{customer.totalEarned}</span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 bg-bg-base rounded-xl">
              <span className="text-xs text-text-secondary">إجمالي المستبدل</span>
              <span className="text-xl font-black text-rose-600">{customer.totalRedeemed}</span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-border-base">
            <span className="text-xs text-text-secondary">عميل منذ: {customer.customerSince}</span>
            <div className="flex items-center gap-2">
              <Button variant="primary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} className="flex-1">
                إضافة نقاط
              </Button>
              <Button variant="secondary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>} className="flex-1">
                استبدال نقاط
              </Button>
            </div>
          </div>
        </Card>

        <Card className="hidden lg:flex flex-col gap-4">
          <div className="flex items-center gap-2 p-4 bg-bg-base rounded-xl">
            <svg className="w-24 h-24 text-text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <div className="text-center">
            <span className="text-xs text-text-secondary">امسح رمز QR للتحقق من هوية العميل</span>
          </div>
        </Card>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-base pb-3">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-text-primary">سجل العمليات</h3>
            <span className="text-[10px] text-text-secondary">أحدث العمليات على حساب العميل</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {operations.map((op) => {
            const isEarn = op.type === "إضافة نقاط";
            return (
              <div key={op.id} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-xs font-bold text-text-primary">{op.type}</span>
                  <span className="text-[10px] text-text-secondary">
                    {op.detail} | {op.branch}
                  </span>
                  <span className="text-[9px] text-text-secondary/70">{op.date}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5 text-xs shrink-0">
                  <span className={`font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                    {op.amount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>} className="self-end">
          عرض الكل
        </Button>
      </Card>
    </div>
  );
}
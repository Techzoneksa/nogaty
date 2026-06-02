"use client";

import React from "react";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function MerchantDashboardPage() {
  const { t } = useTranslation();

  const recentCustomers = [
    { name: "سعيد القحطاني", phone: "050****412", points: 240, tier: "Gold", date: "منذ 5 دقائق" },
    { name: "فاطمة أحمد", phone: "056****883", points: 85, tier: "Bronze", date: "منذ 14 دقيقة" },
    { name: "عبد المجيد الحربي", phone: "054****312", points: 150, tier: "Silver", date: "منذ 35 دقيقة" },
    { name: "نورة السعيد", phone: "053****891", points: 420, tier: "Gold", date: "منذ ساعة" },
    { name: "خالد العتيبي", phone: "051****234", points: 75, tier: "Bronze", date: "منذ ساعتين" },
  ];

  const recentOperations = [
    { customer: "خالد العتيبي", type: "إضافة نقاط", amount: "+35 نقطة", detail: "عملية شراء بـ 35 ريال", time: "منذ دقيقتين" },
    { customer: "سارة محمد", type: "استبدال نقاط", amount: "-100 نقطة", detail: "مشروب مجاني", time: "منذ 12 دقيقة" },
    { customer: "سلطان سليمان", type: "إضافة نقاط", amount: "+82 نقطة", detail: "عملية شراء بـ 82 ريال", time: "منذ 28 دقيقة" },
    { customer: "منيرة عبد الله", type: "إضافة نقاط", amount: "+125 نقطة", detail: "عملية شراء بـ 125 ريال", time: "منذ ساعة" },
    { customer: "فهد الدوسري", type: "استبدال نقاط", amount: "-300 نقطة", detail: "وجبة مجانية", time: "منذ ساعتين" },
  ];

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="flex flex-col text-right">
            <h4 className="text-xs font-bold text-text-primary">اربط نظامك مستقبلاً مع POS أو متجرك الإلكتروني!</h4>
            <p className="text-[10px] text-text-secondary">
              تم إعداد الواجهات لتسهيل ربط برنامج الولاء مع أنظمة كاشير POS أو متجرك الإلكتروني.
            </p>
          </div>
        </div>
        <Badge variant="primary" className="text-[9px] font-black shrink-0">
          مرحلة تجهيز الأنظمة
        </Badge>
      </div>

      <PageHeader
        title="لوحة تحكم التاجر"
        description="تابع أداء نقاط الولاء والعملاء والعروض."
        breadcrumbs={["كافيه نقطة", "الرئيسية"]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي العملاء"
          value="1,247"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          trend={{ value: "+12%", isPositive: true }}
          color="primary"
        />
        <StatCard
          title="النقاط المصدرة"
          value="158K"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: "+15%", isPositive: true }}
          color="accent"
        />
        <StatCard
          title="النقاط المستبدلة"
          value="89K"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
          trend={{ value: "+22%", isPositive: true }}
          color="secondary"
        />
        <StatCard
          title="العروض النشطة"
          value="5"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>}
          color="primary"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex flex-col gap-3 lg:gap-4 flex-1">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-base pb-3">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-text-primary">آخر العملاء</h3>
                <span className="text-[10px] text-text-secondary">أحدث العملاء المسجلين</span>
              </div>
              <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>}>
                عرض الكل
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {recentCustomers.map((cust, idx) => {
                const tierColors: Record<string, "primary" | "secondary" | "accent" | "danger"> = {
                  Bronze: "primary",
                  Silver: "secondary",
                  Gold: "accent",
                };
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-text-primary">
                        {cust.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5 text-right">
                        <span className="text-xs font-bold text-text-primary">{cust.name}</span>
                        <span className="text-[10px] text-text-secondary font-mono">{cust.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-0.5 text-xs">
                        <span className="font-extrabold text-text-primary">{cust.points} نقطة</span>
                        <Badge variant={tierColors[cust.tier]} className="text-[8px] py-0 px-1.5 font-bold">
                          {cust.tier}
                        </Badge>
                      </div>
                      <span className="text-[9px] text-text-secondary/70 shrink-0 font-medium">{cust.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-3 lg:gap-4 flex-1">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-base pb-3">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-text-primary">العمليات الأخيرة</h3>
                <span className="text-[10px] text-text-secondary">سجل العمليات الأخيرة</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {recentOperations.map((op, idx) => {
                const isEarn = op.type === "إضافة نقاط";
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-bold text-text-primary">{op.customer}</span>
                      <span className="text-[10px] text-text-secondary">{op.detail}</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 text-xs shrink-0">
                      <span className={`font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                        {op.amount}
                      </span>
                      <span className="text-[9px] text-text-secondary/70 font-medium">{op.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button variant="primary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة عميل
          </Button>
          <Button variant="secondary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
            إضافة نقاط
          </Button>
          <Button variant="accent" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>}>
            إنشاء عرض
          </Button>
        </div>
      </Card>
    </div>
  );
}
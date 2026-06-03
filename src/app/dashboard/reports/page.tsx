"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function DashboardReportsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="التقارير"
        description="تقارير شاملة عن أداء برنامج الولاء ونمو العملاء."
        breadcrumbs={["لوحة التحكم", "التقارير"]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي العملاء"
          value="1,420"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          trend={{ value: "+12%", isPositive: true }}
          color="primary"
        />
        <StatCard
          title="النقاط المكتسبة"
          value="42,500"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: "+15%", isPositive: true }}
          color="accent"
        />
        <StatCard
          title="النقاط المستخدمة"
          value="28,900"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
          trend={{ value: "+22%", isPositive: true }}
          color="secondary"
        />
        <StatCard
          title="المكافآت المستبدلة"
          value="320"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>}
          trend={{ value: "+10%", isPositive: true }}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">نمو العملاء الشهري</h3>
          <div className="flex flex-col gap-2">
            {["يناير", "فبراير", "مارس", "أبريل", "مايو"].map((month, idx) => (
              <div key={month} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-12">{month}</span>
                <div className="flex-1 h-6 bg-bg-base rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${idx % 2 === 0 ? "bg-primary" : "bg-secondary"}`} style={{ width: `${60 + idx * 8}%` }} />
                </div>
                <span className="text-xs font-bold text-text-primary w-12 text-left">{120 + idx * 35}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">أفضل الفروع</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: "الفرع الرئيسي - العليا", customers: 890, percent: 63 },
              { name: "فرع التخصصي", customers: 420, percent: 30 },
              { name: "فرع المروج", customers: 110, percent: 7 },
            ].map((branch, idx) => (
              <div key={branch.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-text-primary w-6">{idx + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-text-primary">{branch.name}</span>
                    <span className="text-xs font-bold text-text-secondary">{branch.customers}</span>
                  </div>
                  <div className="h-2 bg-bg-base rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${branch.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">العملاء الأكثر تكراراً</h3>
          <div className="flex flex-col gap-2">
            {[
              { name: "سعيد القحطاني", visits: 45, points: 2400 },
              { name: "فاطمة أحمد", visits: 38, points: 1850 },
              { name: "عبد المجيد الحربي", visits: 32, points: 1500 },
            ].map((customer) => (
              <div key={customer.name} className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
                <span className="text-xs font-bold text-text-primary">{customer.name}</span>
                <div className="flex gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-text-secondary">الزيارات</span>
                    <span className="text-sm font-bold text-primary">{customer.visits}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-text-secondary">النقاط</span>
                    <span className="text-sm font-bold text-accent">{customer.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">توزيع المستويات</h3>
          <div className="flex items-center justify-center gap-6 py-4">
            {[
              { tier: "Bronze", count: 580, color: "bg-amber-600", percent: 41 },
              { tier: "Silver", count: 420, color: "bg-slate-400", percent: 30 },
              { tier: "Gold", count: 320, color: "bg-amber-400", percent: 22 },
              { tier: "VIP", count: 100, color: "bg-purple-600", percent: 7 },
            ].map((item) => (
              <div key={item.tier} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-black text-white" style={{ backgroundColor: item.tier === "Bronze" ? "#92400E" : item.tier === "Silver" ? "#9CA3AF" : item.tier === "Gold" ? "#F59E0B" : "#7C3AED" }}>
                  {item.count}
                </div>
                <span className="text-xs font-bold text-text-primary">{item.tier}</span>
                <span className="text-[10px] text-text-secondary">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
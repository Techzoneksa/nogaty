"use client";

import React, { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";
import Link from "next/link";

interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  totalRewardsRedeemed: number;
  totalCampaigns: number;
  repeatRate: string;
  activeBranches: number;
  recentCustomers: Array<{
    id: string;
    name: string;
    phone: string;
    totalPoints: number;
    tier: string;
    lastVisitAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    customerId: string;
    type: string;
    points: number;
    description: string;
    createdAt: string;
  }>;
  topRewards: Array<{
    id: string;
    name: string;
    pointsCost: number;
    redemptions: number;
  }>;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  return `منذ ${diffDays} يوم`;
}

function formatPhoneForDisplay(phone: string): string {
  return phone.replace("+966", "0").slice(0, 7) + "****";
}

export default function MerchantDashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/merchant/dashboard");
        if (!response.ok) throw new Error("فشل تحميل البيانات");
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("حدث خطأ في تحميل البيانات");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const recentCustomers = stats?.recentCustomers || [];
  const recentTransactions = stats?.recentTransactions || [];

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

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-xl"></div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-2">
            إعادة المحاولة
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="إجمالي العملاء"
              value={stats ? stats.totalCustomers.toLocaleString("ar-SA") : "0"}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              trend={{ value: "+12%", isPositive: true }}
              color="primary"
            />
            <StatCard
              title="النقاط المصدرة"
              value={stats ? (stats.totalPointsIssued / 1000).toFixed(0) + "K" : "0"}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              trend={{ value: "+15%", isPositive: true }}
              color="accent"
            />
            <StatCard
              title="النقاط المستبدلة"
              value={stats ? (stats.totalPointsRedeemed / 1000).toFixed(0) + "K" : "0"}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
              trend={{ value: "+22%", isPositive: true }}
              color="secondary"
            />
            <StatCard
              title="العروض النشطة"
              value={stats ? stats.totalCampaigns.toString() : "0"}
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
                  <Link href="/merchant/customers">
                    <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>}>
                      عرض الكل
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  {recentCustomers.length === 0 ? (
                    <p className="text-center text-text-secondary text-sm py-4">لا يوجد عملاء</p>
                  ) : (
                    recentCustomers.map((cust) => {
                      const tierColors: Record<string, "primary" | "secondary" | "accent" | "danger"> = {
                        Bronze: "primary",
                        Silver: "secondary",
                        Gold: "accent",
                      };
                      return (
                        <div key={cust.id} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-text-primary">
                              {cust.name.charAt(0)}
                            </div>
                            <div className="flex flex-col gap-0.5 text-right">
                              <span className="text-xs font-bold text-text-primary">{cust.name}</span>
                              <span className="text-[10px] text-text-secondary font-mono">{formatPhoneForDisplay(cust.phone)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end gap-0.5 text-xs">
                              <span className="font-extrabold text-text-primary">{cust.totalPoints} نقطة</span>
                              <Badge variant={tierColors[cust.tier] || "primary"} className="text-[8px] py-0 px-1.5 font-bold">
                                {cust.tier}
                              </Badge>
                            </div>
                            <span className="text-[9px] text-text-secondary/70 shrink-0 font-medium">
                              {formatTimeAgo(cust.lastVisitAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
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
                  {recentTransactions.length === 0 ? (
                    <p className="text-center text-text-secondary text-sm py-4">لا يوجد عمليات</p>
                  ) : (
                    recentTransactions.map((op) => {
                      const isEarn = op.type === "EARN";
                      return (
                        <div key={op.id} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                          <div className="flex flex-col gap-0.5 text-right">
                            <span className="text-xs font-bold text-text-primary">{op.description}</span>
                            <span className="text-[10px] text-text-secondary">{isEarn ? "كسب" : "استبدال"}</span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5 text-xs shrink-0">
                            <span className={`font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                              {isEarn ? "+" : ""}{op.points} نقطة
                            </span>
                            <span className="text-[9px] text-text-secondary/70 font-medium">
                              {formatTimeAgo(op.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>
            </div>
          </div>

          <Card className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-text-primary">إجراءات سريعة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/merchant/customers">
                <Button variant="primary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>} className="w-full">
                  إضافة عميل
                </Button>
              </Link>
              <Link href="/merchant/points">
                <Button variant="secondary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} className="w-full">
                  إضافة نقاط
                </Button>
              </Link>
              <Link href="/merchant/offers">
                <Button variant="accent" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>} className="w-full">
                  إنشاء عرض
                </Button>
              </Link>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
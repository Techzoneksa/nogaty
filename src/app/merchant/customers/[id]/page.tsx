"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface CustomerDetail {
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    totalPoints: number;
    totalVisits: number;
    lastVisitAt: string;
    status: string;
    tier: string;
  };
  balance: number;
  totalVisits: number;
  lastVisitAt: string;
  transactions: Array<{
    id: string;
    type: string;
    points: number;
    description: string;
    createdAt: string;
  }>;
  redemptions: Array<{
    id: string;
    rewardName: string;
    pointsUsed: number;
    redeemedAt: string;
  }>;
  campaigns: unknown[];
  notes: unknown[];
  rewards: unknown[];
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ar-SA");
}

export default function CustomerDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [data, setData] = useState<CustomerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomerDetail() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/merchant/customers/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("العميل غير موجود");
          throw new Error("فشل تحميل البيانات");
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Fetch customer detail error:", err);
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchCustomerDetail();
    }
  }, [params.id]);

  const tierColors: Record<string, "primary" | "secondary" | "accent" | "danger"> = {
    Bronze: "primary",
    Silver: "secondary",
    Gold: "accent",
    VIP: "danger",
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 select-none animate-fadeIn">
        <PageHeader
          title="تفاصيل العميل"
          breadcrumbs={["كافيه نقطة", "العملاء", "..."]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </Card>
          <Card className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col gap-6 select-none animate-fadeIn">
        <PageHeader
          title="تفاصيل العميل"
          breadcrumbs={["كافيه نقطة", "العملاء"]}
        />
        <Card className="p-8 text-center">
          <svg className="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold text-text-primary mb-2">حدث خطأ</h3>
          <p className="text-sm text-text-secondary mb-4">{error || "لم يتم العثور على العميل"}</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            العودة للصفحة السابقة
          </Button>
        </Card>
      </div>
    );
  }

  const { customer, balance, transactions } = data;

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
                  <Badge variant={tierColors[customer.tier] || "primary"}>{customer.tier}</Badge>
                </div>
                <span className="text-sm text-text-secondary font-mono">{customer.phone}</span>
                <span className="text-xs text-text-secondary">رقم العضوية: {customer.id.slice(-8).toUpperCase()}</span>
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
              <span className="text-xl font-black text-primary">{balance}</span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 bg-bg-base rounded-xl">
              <span className="text-xs text-text-secondary">إجمالي المكتسب</span>
              <span className="text-xl font-black text-emerald-600">{customer.totalPoints}</span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-3 bg-bg-base rounded-xl">
              <span className="text-xs text-text-secondary">إجمالي المستبدل</span>
              <span className="text-xl font-black text-rose-600">
                {Math.abs(transactions.filter((t) => t.type === "REDEEM").reduce((sum, t) => sum + t.points, 0))}
              </span>
              <span className="text-[10px] text-text-secondary">نقطة</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-border-base">
            <span className="text-xs text-text-secondary">عميل منذ: {formatDate(customer.lastVisitAt)}</span>
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
          {transactions.length === 0 ? (
            <p className="text-center text-text-secondary text-sm py-4">لا يوجد عمليات</p>
          ) : (
            transactions.slice(0, 10).map((op) => {
              const isEarn = op.type === "EARN";
              return (
                <div key={op.id} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                  <div className="flex flex-col gap-0.5 text-right">
                    <span className="text-xs font-bold text-text-primary">{op.description}</span>
                    <span className="text-[10px] text-text-secondary">
                      {isEarn ? "كسب" : "استبدال"} | {formatTimeAgo(op.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 text-xs shrink-0">
                    <span className={`font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                      {isEarn ? "+" : ""}{op.points} نقطة
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {transactions.length > 10 && (
          <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>} className="self-end">
            عرض الكل ({transactions.length})
          </Button>
        )}
      </Card>
    </div>
  );
}
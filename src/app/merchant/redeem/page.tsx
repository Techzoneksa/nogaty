"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function RedeemPointsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [customerFound, setCustomerFound] = useState<boolean | null>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState("");

  const mockCustomer = {
    name: "سعيد القحطاني",
    phone: "0501234412",
    memberId: "NGT-001247",
    currentPoints: 240,
  };

  const handleSearch = () => {
    if (searchQuery.length >= 9) {
      setCustomerFound(true);
    } else {
      setCustomerFound(false);
    }
  };

  const pointValue = 0.1;
  const discountValue = pointsToRedeem ? (parseInt(pointsToRedeem) * pointValue).toFixed(2) : "0.00";
  const hasInsufficientBalance = customerFound && pointsToRedeem && parseInt(pointsToRedeem) > mockCustomer.currentPoints;

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="استبدال نقاط"
        description="ابحث عن العميل واستبدل نقاطه بمكافآت."
        breadcrumbs={["كافيه نقطة", "النقاط", "استبدال"]}
      />

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">البحث عن العميل</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="رقم الهاتف أو رقم العضوية..."
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="primary" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} onClick={handleSearch}>
            بحث
          </Button>
          <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}>
            مسح QR
          </Button>
        </div>

        {customerFound === true && (
          <div className="flex items-center justify-between p-4 bg-bg-base rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-black text-text-primary">
                {mockCustomer.name.charAt(0)}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-text-primary">{mockCustomer.name}</span>
                <span className="text-xs text-text-secondary font-mono">{mockCustomer.phone}</span>
              </div>
            </div>
            <Badge variant="accent">الرصيد: {mockCustomer.currentPoints} نقطة</Badge>
          </div>
        )}

        {customerFound === false && (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-red-700">لم يتم العثور على العميل</span>
              <span className="text-xs text-red-600">تأكد من رقم الهاتف أو رقم العضوية</span>
            </div>
          </div>
        )}
      </Card>

      {customerFound === true && (
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">معلومات الاستبدال</h3>

          <Input
            label="النقاط المراد استبدالها"
            type="number"
            placeholder="أدخل عدد النقاط"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>}
            value={pointsToRedeem}
            onChange={(e) => setPointsToRedeem(e.target.value)}
            error={hasInsufficientBalance ? "الرصيد غير كافي" : undefined}
          />

          {hasInsufficientBalance && (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-red-700">رصيد غير كافٍ</span>
                <span className="text-xs text-red-600">الرصيد المتاح: {mockCustomer.currentPoints} نقطة فقط</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-xl border border-secondary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-text-secondary">قيمة الخصم</span>
                <span className="text-sm font-bold text-secondary">0.1 ريال لكل نقطة</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-2xl font-black text-secondary">{discountValue}</span>
              <span className="text-xs text-text-secondary">ريال</span>
            </div>
          </div>

          <Input
            label="ملاحظة (اختياري)"
            placeholder="أضف ملاحظة لهذه العملية..."
          />

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            disabled={!pointsToRedeem || hasInsufficientBalance || parseInt(pointsToRedeem) <= 0}
          >
            تأكيد استبدال {pointsToRedeem || 0} نقطة
          </Button>
        </Card>
      )}
    </div>
  );
}
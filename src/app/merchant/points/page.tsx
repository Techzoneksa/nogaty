"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function AddPointsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [customerFound, setCustomerFound] = useState<boolean | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState("");

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

  const calculatedPoints = purchaseAmount ? parseInt(purchaseAmount) : 0;

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="إضافة نقاط"
        description="ابحث عن العميل وأضف نقاط بناءً على مشترياته."
        breadcrumbs={["كافيه نقطة", "النقاط", "إضافة نقاط"]}
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
          <div className="flex flex-col gap-3 pt-4 border-t border-border-base">
            <div className="flex items-center justify-between p-4 bg-bg-base rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-black text-text-primary">
                  {mockCustomer.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text-primary">{mockCustomer.name}</span>
                  <span className="text-xs text-text-secondary font-mono">{mockCustomer.phone}</span>
                  <span className="text-[10px] text-text-secondary">رقم العضوية: {mockCustomer.memberId}</span>
                </div>
              </div>
              <Badge variant="accent">الرصيد: {mockCustomer.currentPoints} نقطة</Badge>
            </div>
          </div>
        )}

        {customerFound === false && (
          <div className="flex flex-col gap-3 pt-4 border-t border-border-base">
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
          </div>
        )}
      </Card>

      {customerFound === true && (
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">معلومات عملية الشراء</h3>

          <Input
            label="قيمة عملية الشراء (ريال)"
            type="number"
            placeholder="أدخل قيمة المشتريات"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-text-secondary">النقاط المحتسبة</span>
                <span className="text-sm font-bold text-primary">1 نقطة لكل 1 ريال</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-2xl font-black text-primary">{calculatedPoints}</span>
              <span className="text-xs text-text-secondary">نقطة</span>
            </div>
          </div>

          <Input
            label="ملاحظة (اختياري)"
            placeholder="أضف ملاحظة لهذه العملية..."
          />

          <Button variant="primary" size="lg" className="w-full" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}>
            تأكيد إضافة {calculatedPoints} نقطة
          </Button>
        </Card>
      )}
    </div>
  );
}
"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function DashboardCustomerPagePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="معاينة صفحة العميل"
        description="راجع كيف يرى العميل بطاقة الولاء الخاصة به."
        breadcrumbs={["لوحة التحكم", "صفحة العميل"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-6">
          <h3 className="text-sm font-bold text-text-primary">بطاقة العميل الرقمية</h3>
          
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-black">سعيد القحطاني</span>
                <span className="text-xs opacity-80">رقم العضوية: NGT-001247</span>
              </div>
              <Badge variant="accent" className="bg-white/20 text-white border-0">Gold</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs opacity-80">الرصيد الحالي</span>
                <span className="text-4xl font-black">2,400</span>
                <span className="text-xs opacity-80">نقطة</span>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-black">NGT</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div className="flex flex-col">
                <span className="text-[10px] opacity-80">إجمالي المكتسب</span>
                <span className="text-sm font-bold">12,500</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] opacity-80">إجمالي المستبدل</span>
                <span className="text-sm font-bold">10,100</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}>
              مسح QR
            </Button>
            <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>}>
              عرض الباركود
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">المكافآت المتاحة</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: "قهوة مجانية", cost: 100, value: 15 },
              { name: "كوبون خصم 10 ريال", cost: 150, value: 10 },
              { name: "خصم 15%", cost: 200, value: 15 },
            ].map((reward) => (
              <div key={reward.name} className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">{reward.name}</span>
                  <span className="text-[10px] text-text-secondary">قيمة: {reward.value} ريال</span>
                </div>
                <Badge variant="accent">{reward.cost} نقطة</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
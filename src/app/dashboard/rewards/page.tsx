"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

const rewards = [
  { id: 1, name: "قهوة مجانية (أي نوع)", type: "freeItem", pointsCost: 100, value: 15, redemptions: 145, status: "active" },
  { id: 2, name: "كوبون خصم 10 ريال", type: "fixedDiscount", pointsCost: 150, value: 10, redemptions: 98, status: "active" },
  { id: 3, name: "خصم 15% من الفاتورة", type: "percentageDiscount", pointsCost: 200, value: 15, redemptions: 67, status: "active" },
  { id: 4, name: "وجبة مجانية", type: "freeItem", pointsCost: 500, value: 50, redemptions: 23, status: "active" },
  { id: 5, name: "حلا مجاني", type: "freeItem", pointsCost: 80, value: 12, redemptions: 156, status: "inactive" },
  { id: 6, name: "ماء مجاني", type: "freeItem", pointsCost: 50, value: 3, redemptions: 89, status: "inactive" },
];

export default function DashboardRewardsPage() {
  const { t } = useTranslation();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "freeItem": return "عنصر مجاني";
      case "fixedDiscount": return "خصم ثابت";
      case "percentageDiscount": return "خصم نسبة";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "freeItem": return "primary";
      case "fixedDiscount": return "secondary";
      case "percentageDiscount": return "accent";
      default: return "neutral";
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="المكافآت"
        description="إدارة مكافآت برنامج الولاء الخاص بك."
        breadcrumbs={["لوحة التحكم", "المكافآت"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة مكافأة
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <Card key={reward.id} hoverEffect className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                  reward.status === "active" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{reward.name}</span>
                  <Badge variant={getTypeColor(reward.type) as any} className="text-[10px] w-fit">{getTypeLabel(reward.type)}</Badge>
                </div>
              </div>
              <Badge variant={reward.status === "active" ? "success" : "neutral"} className="text-[10px]">
                {reward.status === "active" ? "نشط" : "غير نشط"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary">تكلفة الاستبدال</span>
                <span className="text-lg font-black text-primary">{reward.pointsCost}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-text-secondary">قيمة المكافأة</span>
                <span className="text-sm font-bold text-text-primary">{reward.value} {reward.type === "percentageDiscount" ? "%" : "ريال"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border-base">
              <span className="text-xs text-text-secondary">{reward.redemptions} عملية استبدال</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">تعديل</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
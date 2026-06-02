"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function RulesPage() {
  const { t } = useTranslation();
  const [pointsPerRiyal, setPointsPerRiyal] = useState("1");
  const [minimumRedeem, setMinimumRedeem] = useState("10");
  const [pointValue, setPointValue] = useState("0.1");
  const [allowRedemption, setAllowRedemption] = useState(true);
  const [welcomePoints, setWelcomePoints] = useState("50");

  const handleSave = () => {
    console.log({
      pointsPerRiyal,
      minimumRedeem,
      pointValue,
      allowRedemption,
      welcomePoints,
    });
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="قواعد النقاط"
        description="إعداد قواعد نظام النقاط لبرنامج الولاء الخاص بك."
        breadcrumbs={["كافيه نقطة", "الإعدادات", "قواعد النقاط"]}
      />

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">قواعد كسب النقاط</span>
            <span className="text-xs text-text-secondary">حدد كم نقطة يكسبها العميل لكل ريال</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="النقاط لكل ريال"
            type="number"
            value={pointsPerRiyal}
            onChange={(e) => setPointsPerRiyal(e.target.value)}
            helperText="1 نقطة لكل 1 ريال يعني أن العميل يكسب نقطة واحدة عن كل ريال ينفقه"
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">قواعد استبدال النقاط</span>
            <span className="text-xs text-text-secondary">حدد الحد الأدنى للاستبدال وقيمة النقطة</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="الحد الأدنى للاستبدال"
            type="number"
            value={minimumRedeem}
            onChange={(e) => setMinimumRedeem(e.target.value)}
            helperText="الحد الأدنى من النقاط التي يمكن للعميل استبدالها"
          />
          <Input
            label="قيمة النقطة (ريال)"
            type="number"
            value={pointValue}
            onChange={(e) => setPointValue(e.target.value)}
            helperText="0.1 ريال يعني أن كل 10 نقاط تساوي 1 ريال خصم"
            disabled
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-bg-base rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-text-primary">السماح بالاستبدال</span>
              <span className="text-xs text-text-secondary">تفعيل أو تعطيل إمكانية استبدال النقاط</span>
            </div>
          </div>
          <button
            onClick={() => setAllowRedemption(!allowRedemption)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              allowRedemption ? "bg-primary" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                allowRedemption ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">إعدادات إضافية</span>
            <span className="text-xs text-text-secondary">إعدادات أخرى لنظام النقاط</span>
          </div>
        </div>

        <Input
          label="نقاط الترحيب"
          type="number"
          value={welcomePoints}
          onChange={(e) => setWelcomePoints(e.target.value)}
          helperText="النقاط التي يحصل عليها العميل عند التسجيل الجديد"
        />
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>} onClick={handleSave}>
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}
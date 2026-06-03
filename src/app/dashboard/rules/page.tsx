"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function DashboardRulesPage() {
  const { t } = useTranslation();
  const [pointsPerRiyal, setPointsPerRiyal] = useState("1");
  const [minimumRedeem, setMinimumRedeem] = useState("100");
  const [pointValue, setPointValue] = useState("0.1");
  const [allowRedemption, setAllowRedemption] = useState(true);

  const handleSave = () => {
    alert("تم حفظ الإعدادات");
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="قواعد النقاط"
        description="إعداد قواعد نظام النقاط لبرنامج الولاء الخاص بك."
        breadcrumbs={["لوحة التحكم", "قواعد النقاط"]}
      />

      <Card className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-base pb-3">قواعد كسب النقاط</h3>
        <Input
          label="النقاط لكل ريال"
          type="number"
          value={pointsPerRiyal}
          onChange={(e) => setPointsPerRiyal(e.target.value)}
          helperText="1 نقطة لكل 1 ريال"
        />
      </Card>

      <Card className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-base pb-3">قواعد الاستبدال</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="الحد الأدنى للاستبدال"
            type="number"
            value={minimumRedeem}
            onChange={(e) => setMinimumRedeem(e.target.value)}
          />
          <Input
            label="قيمة النقطة (ريال)"
            type="number"
            value={pointValue}
            onChange={(e) => setPointValue(e.target.value)}
            disabled
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-bg-base rounded-xl">
          <span className="text-sm font-bold text-text-primary">السماح بالاستبدال</span>
          <button
            onClick={() => setAllowRedemption(!allowRedemption)}
            className={`relative w-12 h-6 rounded-full transition-colors ${allowRedemption ? "bg-primary" : "bg-slate-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${allowRedemption ? "right-1" : "left-1"}`} />
          </button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave}>حفظ الإعدادات</Button>
      </div>
    </div>
  );
}
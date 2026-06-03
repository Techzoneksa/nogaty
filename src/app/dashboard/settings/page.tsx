"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function DashboardSettingsPage() {
  const { t } = useTranslation();
  const [businessName, setBusinessName] = useState("كافيه نقطة");
  const [phone, setPhone] = useState("0501234567");
  const [description, setDescription] = useState("كافيه مختص بتقديم أفضل انواع القهوة والمأكولات الخفيفة");
  const [currency, setCurrency] = useState("SAR");
  const [language, setLanguage] = useState("ar");

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="الإعدادات"
        description="إدارة بيانات المنشأة والإعدادات العامة."
        breadcrumbs={["لوحة التحكم", "الإعدادات"]}
      />

      <Card className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-base pb-3">بيانات المنشأة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="اسم النشاط"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <Input
            label="رقم الجوال"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="رقم التواصل"
            value="0551234567"
            disabled
            helperText="غير قابل للتعديل حالياً"
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-secondary">نوع النشاط</label>
            <div className="p-3 bg-bg-base rounded-xl text-sm text-text-primary">كافيه</div>
          </div>
        </div>

        <Input
          label="وصف مختصر"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Card>

      <Card className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-base pb-3">الإعدادات العامة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-secondary">العملة</label>
            <div className="flex items-center gap-2 p-3 bg-bg-base rounded-xl">
              <span className="text-sm font-bold text-text-primary">{currency}</span>
              <Badge variant="neutral" className="text-[10px]">SAR - ريال سعودي</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-secondary">اللغة</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("ar")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  language === "ar" ? "bg-primary text-white" : "bg-bg-base text-text-primary"
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  language === "en" ? "bg-primary text-white" : "bg-bg-base text-text-primary"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-base pb-3">ألوان الهوية</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-text-secondary">اللون الرئيسي</label>
            <div className="flex items-center gap-3 p-3 bg-bg-base rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]" />
              <span className="text-sm font-mono text-text-primary">#2563EB</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-text-secondary">اللون الثانوي</label>
            <div className="flex items-center gap-3 p-3 bg-bg-base rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[#1E40AF]" />
              <span className="text-sm font-mono text-text-primary">#1E40AF</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}>
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );
}
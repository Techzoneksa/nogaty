"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [businessName, setBusinessName] = useState("كافيه نقطة");
  const [businessType, setBusinessType] = useState("cafe");
  const [city, setCity] = useState("riyadh");
  const [contact, setContact] = useState("0501234567");
  const [description, setDescription] = useState("كافيه يقدم أفضل أنواع القهوة والولاعات");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#14B8A6");
  const [workingHours, setWorkingHours] = useState("7:00 AM - 11:00 PM");
  const [instagram, setInstagram] = useState("nogaty_cafe");
  const [twitter, setTwitter] = useState("nogaty_cafe");

  const businessTypes = [
    { value: "cafe", label: "كافيه" },
    { value: "restaurant", label: "مطعم" },
    { value: "supermarket", label: "سوبرماركت" },
    { value: "retail", label: "متجر تجزئة" },
  ];

  const cities = [
    { value: "riyadh", label: "الرياض" },
    { value: "jeddah", label: "جدة" },
    { value: "dammam", label: "الدمام" },
    { value: "makkah", label: "مكة المكرمة" },
    { value: "madinah", label: "المدينة المنورة" },
  ];

  const handleSave = () => {
    console.log({
      businessName,
      businessType,
      city,
      contact,
      description,
      primaryColor,
      secondaryColor,
      workingHours,
      instagram,
      twitter,
    });
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="الإعدادات"
        description="إعدادات المتجر ومنصة الولاء."
        breadcrumbs={["كافيه نقطة", "الإعدادات"]}
      />

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">معلومات المتجر</span>
            <span className="text-xs text-text-secondary">معلومات الأساسية عن متجرك</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-bg-base flex items-center justify-center border-2 border-dashed border-border-base cursor-pointer hover:border-primary/50 transition-colors">
            <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs text-text-secondary">ارفع شعار المتجر</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="اسم المتجر"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <Select
            label="نوع النشاط"
            options={businessTypes}
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <Select
            label="المدينة"
            options={cities}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            label="رقم التواصل"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-primary block mb-1">وصف المتجر</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-border-base rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            rows={3}
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">ساعات العمل</span>
            <span className="text-xs text-text-secondary">تحديد أوقات العمل</span>
          </div>
        </div>

        <Input
          label="ساعات العمل"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          helperText="مثال: 7:00 AM - 11:00 PM"
        />
      </Card>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">الألوان</span>
            <span className="text-xs text-text-secondary">خصيص الألوان الرئيسية والثانوية</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">اللون الرئيسي</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-10 rounded-lg border border-border-base cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">اللون الثانوي</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-12 h-10 rounded-lg border border-border-base cursor-pointer"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border-base">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-primary">روابط التواصل</span>
            <span className="text-xs text-text-secondary">روابط حسابات التواصل الاجتماعي</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="انستغرام"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          />
          <Input
            label="تويتر"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>} onClick={handleSave}>
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}
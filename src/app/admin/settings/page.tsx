'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function SettingsPage() {
  const { t, language } = useTranslation();
  const [companyName, setCompanyName] = useState('JAD CLOUD');
  const [contactEmail, setContactEmail] = useState('info@jadcloud.com');
  const [contactPhone, setContactPhone] = useState('+966 50 123 4567');
  const [defaultLanguage, setDefaultLanguage] = useState('ar');

  const languageOptions = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="الإعدادات"
        description="إدارة إعدادات النظام والشركة"
      />

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">معلومات الشركة</h3>
        <div className="space-y-4">
          <Input
            label="اسم الشركة"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Input
              label="رقم الهاتف"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">إعدادات اللغة</h3>
        <div className="space-y-4">
          <Select
            label="اللغة الافتراضية"
            options={languageOptions}
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">سياسة الخصوصية والشروط</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-primary mb-1.5 block">سياسة الخصوصية</label>
            <textarea
              className="w-full h-32 bg-white border border-border-base rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              defaultValue="سياسة الخصوصية الخاصة بـ JAD CLOUD..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-primary mb-1.5 block">الشروط والأحكام</label>
            <textarea
              className="w-full h-32 bg-white border border-border-base rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              defaultValue="الشروط والأحكام الخاصة بـ JAD CLOUD..."
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">إعدادات الصفحة الرئيسية</h3>
        <div className="space-y-4">
          <Input
            label="عنوان الصفحة الرئيسية"
            defaultValue="نظام ولاء العملاء"
          />
          <Input
            label="وصف الصفحة الرئيسية"
            defaultValue="أفضل نظام لإدارة نقاط الولاء لعملائك"
          />
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">
          إعادة تعيين
        </Button>
        <Button variant="primary">
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );
}
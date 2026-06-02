'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { StatCard } from '@/components/StatCard';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';

const monthlyData = [
  { month: 'يناير', merchants: 12 },
  { month: 'فبراير', merchants: 18 },
  { month: 'مارس', merchants: 25 },
  { month: 'أبريل', merchants: 32 },
  { month: 'مايو', merchants: 28 },
  { month: 'يونيو', merchants: 35 },
];

export default function ReportsPage() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('6');

  const maxMerchants = Math.max(...monthlyData.map((d) => d.merchants));

  return (
    <div className="space-y-6">
      <PageHeader
        title="التقارير"
        description="إحصائيات وتقارير أداء النظام"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatCard
          title="إجمالي التجار"
          value="4"
          color="primary"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <StatCard
          title="إجمالي العملاء"
          value="2,295"
          color="secondary"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard
          title="النقاط المصدرة"
          value="265K"
          color="accent"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="إجمالي الإيرادات"
          value="12,450"
          color="primary"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-primary">نمو التجار</h3>
            <select
              className="text-sm border border-border-base rounded-lg px-2 py-1 bg-white"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="3">3 أشهر</option>
              <option value="6">6 أشهر</option>
              <option value="12">سنة</option>
            </select>
          </div>
          <div className="space-y-3">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-16">{data.month}</span>
                <div className="flex-1 h-6 bg-bg-base rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(data.merchants / maxMerchants) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-text-primary w-8">{data.merchants}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4">توزيع الباقات</h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="12"
                  strokeDasharray="125.6 251.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#14B8A6" strokeWidth="12"
                  strokeDasharray="62.8 251.2" strokeDashoffset="-125.6" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12"
                  strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-border-base/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm text-text-secondary">أساسية</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">25%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border-base/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-sm text-text-secondary">احترافية</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">50%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-sm text-text-secondary">متقدمة</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">25%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4">أفضل التجار</h3>
        <div className="space-y-3">
          {[
            { name: 'مقهى النخبة', customers: 245, points: 15000 },
            { name: 'سوبرماركت الشاطئ', customers: 180, points: 12000 },
            { name: 'صالون الأناقة', customers: 85, points: 8500 },
            { name: 'متجر التقنية', customers: 320, points: 22000 },
          ].map((merchant, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-text-primary">{merchant.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-left">
                  <p className="text-xs text-text-secondary">العملاء</p>
                  <p className="text-sm font-semibold text-text-primary">{merchant.customers}</p>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs text-text-secondary">النقاط</p>
                  <p className="text-sm font-semibold text-text-primary">{merchant.points.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
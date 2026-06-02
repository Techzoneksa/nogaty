'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { StatCard } from '@/components/StatCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';

const merchants = [
  { id: 1, name: 'مقهى النخبة', type: 'مطعم', city: 'الرياض', owner: 'خالد العتيبي', phone: '0501234567', package: 'احترافية', status: 'نشط', customers: 245, joinDate: '2024-01-15' },
  { id: 2, name: 'سوبرماركت الشاطئ', type: 'متجر', city: 'جدة', owner: 'محمد الأحمد', phone: '0509876543', package: 'أساسية', status: 'نشط', customers: 180, joinDate: '2024-02-20' },
  { id: 3, name: 'صالون الأناقة', type: 'جمال', city: 'الدمام', owner: 'سارة القحطاني', phone: '0553456789', package: 'متقدمة', status: 'تجربة', customers: 85, joinDate: '2024-03-10' },
  { id: 4, name: 'متجر التقنية', type: 'إلكترونيات', city: 'الرياض', owner: 'عبدالله السعيد', phone: '0502345678', package: 'احترافية', status: 'نشط', customers: 320, joinDate: '2023-11-05' },
  { id: 5, name: 'مطعم Heritage', type: 'مطعم', city: 'الرياض', owner: 'ناصر العنزي', phone: '0508765432', package: 'متقدمة', status: 'موقوف', customers: 95, joinDate: '2023-12-01' },
];

export default function AdminDashboard() {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge variant="success">{status}</Badge>;
      case 'تجربة':
        return <Badge variant="warning">{status}</Badge>;
      case 'موقوف':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const statsData = [
    { title: 'التجار النشطون', value: '3', color: 'primary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { title: 'تجار التجربة', value: '1', color: 'accent' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { title: 'إجمالي العملاء', value: '2,295', color: 'secondary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { title: 'إجمالي النقاط', value: '265K', color: 'primary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="لوحة التحكم"
        description="مرحباً بك في لوحة تحكم JAD CLOUD"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-primary">أحدث التجار</h3>
            <Link href="/admin/merchants">
              <Button variant="outline" size="sm">عرض الكل</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">التاجر</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">المدينة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">الباقة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الحالة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">العملاء</th>
                </tr>
              </thead>
              <tbody>
                {merchants.slice(0, 5).map((merchant) => (
                  <tr key={merchant.id} className="border-b border-border-base/50 last:border-0">
                    <td className="py-3 px-2">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{merchant.name}</p>
                        <p className="text-xs text-text-secondary">{merchant.owner}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="text-sm text-text-secondary">{merchant.city}</span>
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell">
                      <span className="text-sm text-text-secondary">{merchant.package}</span>
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(merchant.status)}
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-text-primary">{merchant.customers}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4">توزيع الباقات</h3>
          <div className="space-y-3">
            {[
              { name: 'أساسية', value: 25, color: 'bg-primary' },
              { name: 'احترافية', value: 50, color: 'bg-secondary' },
              { name: 'متقدمة', value: 25, color: 'bg-accent' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">{item.name}</span>
                  <span className="font-semibold text-text-primary">{item.value}%</span>
                </div>
                <div className="h-2 bg-bg-base rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border-base">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">إجمالي التجار</span>
              <span className="text-lg font-bold text-text-primary">4</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
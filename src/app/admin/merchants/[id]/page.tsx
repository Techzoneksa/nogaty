'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { StatCard } from '@/components/StatCard';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';

const merchantData = {
  id: 1,
  name: 'مقهى النخبة',
  type: 'مطعم',
  city: 'الرياض',
  district: 'حي العليا',
  owner: {
    name: 'خالد العتيبي',
    phone: '0501234567',
    email: 'khaled@example.com',
  },
  package: 'احترافية',
  packagePrice: 249,
  status: 'نشط',
  joinDate: '2024-01-15',
  subscriptionStart: '2024-01-15',
  subscriptionEnd: '2025-01-15',
  stats: {
    customers: 245,
    pointsIssued: 15000,
    pointsRedeemed: 8500,
  },
  branches: ['الرياض - حي العليا', 'الرياض - حي الملقا'],
};

export default function MerchantDetailPage() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(merchantData.status === 'نشط');

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={merchantData.name}
        description="تفاصيل التاجر وإدارة الإشتراك"
        breadcrumbs={['التجار', merchantData.name]}
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/merchants">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                رجوع
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              تعديل
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="إجمالي العملاء"
          value={merchantData.stats.customers}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          color="primary"
        />
        <StatCard
          title="النقاط المصدرة"
          value={merchantData.stats.pointsIssued.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="secondary"
        />
        <StatCard
          title="النقاط المستبدلة"
          value={merchantData.stats.pointsRedeemed.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>}
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">معلومات التاجر</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">الحالة</span>
              {getStatusBadge(merchantData.status)}
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">النوع</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">المدينة</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">الحي</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">تاريخ الانضمام</span>
              <span className="text-sm font-medium text-text-primary">{formatDate(merchantData.joinDate)}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">معلومات المالك</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">الاسم</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.owner.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">رقم الهاتف</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.owner.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">البريد الإلكتروني</span>
              <span className="text-sm font-medium text-text-primary">{merchantData.owner.email}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-3 border-b border-border-base">
          <h3 className="text-base font-bold text-text-primary">الإشتراك الحالي</h3>
          {getStatusBadge(merchantData.status)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">الباقة</p>
            <p className="text-sm font-bold text-text-primary">{merchantData.package}</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">السعر الشهري</p>
            <p className="text-sm font-bold text-text-primary">{merchantData.packagePrice} ر.س</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">تاريخ البدء</p>
            <p className="text-sm font-bold text-text-primary">{formatDate(merchantData.subscriptionStart)}</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">تاريخ الانتهاء</p>
            <p className="text-sm font-bold text-text-primary">{formatDate(merchantData.subscriptionEnd)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={isActive ? 'danger' : 'primary'}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'إيقاف التاجر' : 'تفعيل التاجر'}
          </Button>
          <Button variant="outline">
            تغيير الباقة
          </Button>
          <Button variant="outline">
            تمديد الإشتراك
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">الفروع</h3>
        <div className="space-y-2">
          {merchantData.branches.map((branch, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-bg-base rounded-xl">
              <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-text-primary">{branch}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
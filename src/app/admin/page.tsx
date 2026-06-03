'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { StatCard } from '@/components/StatCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';

interface Merchant {
  id: string;
  name: string;
  type: string;
  city: string;
  owner: string;
  phone: string;
  package: string;
  status: "active" | "trial" | "suspended" | "expired";
  customers: number;
  joinDate: string;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, trial: 0, suspended: 0, expired: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMerchants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/merchants?limit=5');
        if (response.ok) {
          const data = await response.json();
          setMerchants(data.merchants || []);
          setSummary(data.summary || { total: 0, active: 0, trial: 0, suspended: 0, expired: 0 });
        } else {
          const errData = await response.json();
          setError(errData.error || t('common.error') || 'Error loading data');
        }
      } catch {
        setError(t('common.error') || 'Failed to load merchants');
      } finally {
        setIsLoading(false);
      }
    };
    loadMerchants();
  }, [t]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">{t('status.active') || 'نشط'}</Badge>;
      case 'trial':
        return <Badge variant="warning">{t('status.trial') || 'تجربة'}</Badge>;
      case 'suspended':
        return <Badge variant="danger">{t('status.suspended') || 'موقوف'}</Badge>;
      case 'expired':
        return <Badge variant="neutral">{t('status.expired') || 'منتهي'}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const statsData = [
    { title: t('admin.activeMerchants') || 'التجار النشطون', value: summary.active.toString(), color: 'primary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { title: t('admin.trialMerchants') || 'تجار التجربة', value: summary.trial.toString(), color: 'accent' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { title: t('admin.totalCustomers') || 'إجمالي العملاء', value: '2,295', color: 'secondary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { title: t('admin.totalPoints') || 'إجمالي النقاط', value: '265K', color: 'primary' as const, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('admin.dashboard') || 'لوحة التحكم'} description={t('byJadCloud') || 'مرحباً بك في لوحة تحكم JAD CLOUD'} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse h-24 bg-bg-base" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('admin.dashboard') || 'لوحة التحكم'} description={t('byJadCloud') || 'مرحباً بك في لوحة تحكم JAD CLOUD'} />
        <Card className="p-12 text-center">
          <p className="text-red-600">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>{t('common.retry') || 'إعادة المحاولة'}</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.dashboard') || 'لوحة التحكم'}
        description={t('byJadCloud') || 'مرحباً بك في لوحة تحكم JAD CLOUD'}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-primary">{t('admin.latestMerchants') || 'أحدث التجار'}</h3>
            <Link href="/admin/merchants">
              <Button variant="outline" size="sm">{t('admin.viewAll') || 'عرض الكل'}</Button>
            </Link>
          </div>
          {merchants.length === 0 ? (
            <p className="text-center text-text-secondary py-8">{t('empty.noMerchants') || 'لا توجد تجار'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border-base">
                    <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.name') || 'التاجر'}</th>
                    <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">{t('merchant.city') || 'المدينة'}</th>
                    <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">{t('merchant.package') || 'الباقة'}</th>
                    <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.status') || 'الحالة'}</th>
                    <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">{t('merchant.customers') || 'العملاء'}</th>
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
          )}
        </Card>

        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4">{t('admin.packageDistribution') || 'توزيع الباقات'}</h3>
          <div className="space-y-3">
            {[
              { name: t('pricing.basic') || 'أساسية', value: 25, color: 'bg-primary' },
              { name: t('pricing.professional') || 'احترافية', value: 50, color: 'bg-secondary' },
              { name: t('pricing.advanced') || 'متقدمة', value: 25, color: 'bg-accent' },
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
              <span className="text-xs text-text-secondary">{t('admin.totalMerchants') || 'إجمالي التجار'}</span>
              <span className="text-lg font-bold text-text-primary">{summary.total}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
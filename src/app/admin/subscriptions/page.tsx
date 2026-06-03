'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Subscription {
  id: string;
  merchantId: string;
  merchant: string;
  package: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  amount: number;
}

export default function SubscriptionsPage() {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: t('common.all') || 'الكل' },
    { value: 'active', label: t('status.active') || 'نشط' },
    { value: 'trial', label: t('status.trial') || 'تجربة' },
    { value: 'expired', label: t('status.expired') || 'منتهي' },
    { value: 'cancelled', label: t('status.cancelled') || 'ملغي' },
  ];

  useEffect(() => {
    const loadSubscriptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '/api/admin/subscriptions';
        if (statusFilter && statusFilter !== 'all') {
          url += `?status=${encodeURIComponent(statusFilter)}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data.subscriptions || []);
        } else {
          const errData = await response.json();
          setError(errData.error || t('common.error') || 'Error loading subscriptions');
        }
      } catch {
        setError(t('common.error') || 'Failed to load subscriptions');
      } finally {
        setIsLoading(false);
      }
    };
    loadSubscriptions();
  }, [statusFilter, t]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">{t('status.active') || 'نشط'}</Badge>;
      case 'trial':
        return <Badge variant="warning">{t('status.trial') || 'تجربة'}</Badge>;
      case 'expired':
        return <Badge variant="neutral">{t('status.expired') || 'منتهي'}</Badge>;
      case 'cancelled':
        return <Badge variant="danger">{t('status.cancelled') || 'ملغي'}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.subscriptions') || 'الاشتراكات'}
        description={t('admin.subscriptionsDesc') || 'إدارة وتتبع اشتراكات التجار'}
      />

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="w-full sm:w-40">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <span className="text-text-secondary">{t('common.loading') || 'جاري التحميل...'}</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t('common.retry') || 'إعادة المحاولة'}
            </Button>
          </div>
        ) : subscriptions.length === 0 ? (
          <EmptyState
            title={t('empty.noSubscriptions') || 'لا توجد اشتراكات'}
            description={t('empty.noSubscriptionsFound') || 'لم يتم العثور على اشتراكات يطابقون معايير البحث'}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.name') || 'التاجر'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">{t('admin.package') || 'الباقة'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">{t('startDate') || 'تاريخ البدء'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">{t('endDate') || 'تاريخ الانتهاء'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('status') || 'الحالة'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">{t('amount') || 'المبلغ'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('admin.action') || 'الإجراءات'}</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-border-base/50 last:border-0">
                    <td className="py-3 px-2">
                      <span className="text-sm font-semibold text-text-primary">{sub.merchant}</span>
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell">
                      <span className="text-sm text-text-secondary">{sub.package}</span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="text-sm text-text-secondary">{formatDate(sub.startDate)}</span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="text-sm text-text-secondary">{formatDate(sub.endDate)}</span>
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(sub.status)}
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-text-primary">{sub.amount} {t('sar') || 'ر.س'}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          {t('admin.extend') || 'تمديد'}
                        </Button>
                        {sub.status === 'active' && (
                          <Button variant="danger" size="sm">
                            {t('cancel') || 'إلغاء'}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
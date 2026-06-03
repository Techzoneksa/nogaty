'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
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

export default function MerchantsPage() {
  const { t } = useTranslation();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: t('common.all') || 'الكل' },
    { value: 'active', label: t('status.active') || 'نشط' },
    { value: 'trial', label: t('status.trial') || 'تجربة' },
    { value: 'suspended', label: t('status.suspended') || 'موقوف' },
    { value: 'expired', label: t('status.expired') || 'منتهي' },
  ];

  useEffect(() => {
    const loadMerchants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '/api/admin/merchants?limit=50';
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        if (statusFilter && statusFilter !== 'all') {
          url += `&status=${encodeURIComponent(statusFilter)}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMerchants(data.merchants || []);
        } else {
          const errData = await response.json();
          setError(errData.error || t('common.error') || 'Error loading merchants');
        }
      } catch {
        setError(t('common.error') || 'Failed to load merchants');
      } finally {
        setIsLoading(false);
      }
    };
    loadMerchants();
  }, [search, statusFilter, t]);

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

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.merchants') || 'التجار'}
        description={t('admin.manageMerchants') || 'إدارة والتجار والمتاجر المسجلة في النظام'}
        action={
          <Button variant="primary" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('admin.addMerchant') || 'إضافة تاجر'}
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input
              placeholder={t('admin.searchMerchant') || 'ابحث بالاسم أو رقم الهاتف...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          <div className="w-full md:w-40">
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
            <Button variant="outline" onClick={() => window.location.reload()}>{t('common.retry') || 'إعادة المحاولة'}</Button>
          </div>
        ) : merchants.length === 0 ? (
          <EmptyState
            title={t('empty.noResults') || 'لا توجد نتائج'}
            description={t('empty.noMerchantsFound') || 'لم يتم العثور على تجار يطابقون معايير البحث'}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.name') || 'الاسم'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">{t('merchant.type') || 'النوع'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">{t('merchant.city') || 'المدينة'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">{t('admin.owner') || 'المالك'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.package') || 'الباقة'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('merchant.status') || 'الحالة'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden xl:table-cell">{t('merchant.customers') || 'العملاء'}</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">{t('admin.action') || 'الإجراءات'}</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b border-border-base/50 last:border-0">
                    <td className="py-3 px-2">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{merchant.name}</p>
                        <p className="text-xs text-text-secondary md:hidden">{merchant.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell">
                      <span className="text-sm text-text-secondary">{merchant.type}</span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="text-sm text-text-secondary">{merchant.city}</span>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <div>
                        <p className="text-sm text-text-primary">{merchant.owner}</p>
                        <p className="text-xs text-text-secondary">{merchant.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-text-secondary">{merchant.package}</span>
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(merchant.status)}
                    </td>
                    <td className="py-3 px-2 hidden xl:table-cell">
                      <span className="text-sm font-semibold text-text-primary">{merchant.customers}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/merchants/${merchant.id}`}>
                          <Button variant="outline" size="sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        {merchant.status !== 'suspended' && (
                          <Button variant="danger" size="sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
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
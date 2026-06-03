'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Package {
  id: string;
  name: string;
  price: number;
  customerLimit: number;
  branchesLimit: number;
  features: string[];
  active: boolean;
}

export default function PackagesPage() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/packages');
        if (response.ok) {
          const data = await response.json();
          setPackages(data.packages || []);
        } else {
          const errData = await response.json();
          setError(errData.error || t('common.error') || 'Error loading packages');
        }
      } catch {
        setError(t('common.error') || 'Failed to load packages');
      } finally {
        setIsLoading(false);
      }
    };
    loadPackages();
  }, [t]);

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.packages') || 'الباقات'}
        description={t('pricing.title') || 'إدارة باقات الاشتراك والتسعير'}
        action={
          <Button variant="primary" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('admin.addPackage') || 'إضافة باقة'}
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder={t('admin.searchPackage') || 'ابحث عن باقة...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse h-64 bg-bg-base" />
          ))}
        </div>
      ) : error ? (
        <Card className="p-12 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            {t('common.retry') || 'إعادة المحاولة'}
          </Button>
        </Card>
      ) : filteredPackages.length === 0 ? (
        <EmptyState
          title={t('empty.noPackages') || 'لا توجد باقات'}
          description={t('empty.noPackagesFound') || 'لم يتم العثور على باقات يطابقون معايير البحث'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} hoverEffect>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                    <span className="text-sm text-text-secondary">{t('sar') || 'ر.س'}/ {t('perMonth') || 'شهر'}</span>
                  </div>
                </div>
                <Badge variant={pkg.active ? 'success' : 'neutral'}>
                  {pkg.active ? (t('status.active') || 'نشط') : (t('status.inactive') || 'غير نشط')}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between py-2 border-b border-border-base/50">
                  <span className="text-sm text-text-secondary">{t('admin.customers') || 'العملاء'}</span>
                  <span className="text-sm font-semibold text-text-primary">{pkg.customerLimit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-base/50">
                  <span className="text-sm text-text-secondary">{t('admin.branches') || 'الفروع'}</span>
                  <span className="text-sm font-semibold text-text-primary">{pkg.branchesLimit}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-secondary mb-2">{t('features') || 'المميزات'}:</p>
                <ul className="space-y-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-text-primary">
                      <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border-base">
                <Button variant="outline" size="sm" className="flex-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.edit') || 'تعديل'}
                </Button>
                <Button variant="danger" size="sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
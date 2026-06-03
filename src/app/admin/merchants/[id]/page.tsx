'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { StatCard } from '@/components/StatCard';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface MerchantDetail {
  id: string;
  name: string;
  type: string;
  city: string;
  district: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  package: string;
  packagePrice: number;
  status: "active" | "trial" | "suspended" | "expired";
  joinDate: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  stats: {
    customers: number;
    pointsIssued: number;
    pointsRedeemed: number;
  };
  branches: string[];
}

export default function MerchantDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [merchant, setMerchant] = useState<MerchantDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const loadMerchant = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/merchants/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setMerchant(data.merchant);
          setIsActive(data.merchant.status === 'active');
        } else if (response.status === 404) {
          setError(t('merchant.notFound') || 'التاجر غير موجود');
        } else {
          const errData = await response.json();
          setError(errData.error || t('common.error') || 'Error loading merchant');
        }
      } catch {
        setError(t('common.error') || 'Failed to load merchant');
      } finally {
        setIsLoading(false);
      }
    };
    loadMerchant();
  }, [params.id, t]);

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('loading') || 'جاري التحميل...'} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse h-24 bg-bg-base" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !merchant) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('error') || 'خطأ'} />
        <Card className="p-12 text-center">
          <p className="text-red-600 mb-4">{error || t('merchant.notFound') || 'التاجر غير موجود'}</p>
          <Link href="/admin/merchants">
            <Button variant="outline">{t('common.back') || 'رجوع'}</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={merchant.name}
        description={t('merchantDetails') || 'تفاصيل التاجر وإدارة الإشتراك'}
        breadcrumbs={[t('admin.merchants') || 'التجار', merchant.name]}
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/merchants">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('common.back') || 'رجوع'}
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t('common.edit') || 'تعديل'}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title={t('merchant.customers') || 'إجمالي العملاء'}
          value={merchant.stats.customers.toString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          color="primary"
        />
        <StatCard
          title={t('pointsIssued') || 'النقاط المصدرة'}
          value={merchant.stats.pointsIssued.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="secondary"
        />
        <StatCard
          title={t('pointsRedeemed') || 'النقاط المستبدلة'}
          value={merchant.stats.pointsRedeemed.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>}
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">{t('merchantInfo') || 'معلومات التاجر'}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('merchant.status') || 'الحالة'}</span>
              {getStatusBadge(merchant.status)}
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('merchant.type') || 'النوع'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('merchant.city') || 'المدينة'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('district') || 'الحي'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('joinDate') || 'تاريخ الانضمام'}</span>
              <span className="text-sm font-medium text-text-primary">{formatDate(merchant.joinDate)}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">{t('ownerInfo') || 'معلومات المالك'}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('merchant.name') || 'الاسم'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.owner.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('merchant.phone') || 'رقم الهاتف'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.owner.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">{t('email') || 'البريد الإلكتروني'}</span>
              <span className="text-sm font-medium text-text-primary">{merchant.owner.email}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-3 border-b border-border-base">
          <h3 className="text-base font-bold text-text-primary">{t('currentSubscription') || 'الإشتراك الحالي'}</h3>
          {getStatusBadge(merchant.status)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">{t('merchant.package') || 'الباقة'}</p>
            <p className="text-sm font-bold text-text-primary">{merchant.package}</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">{t('monthlyPrice') || 'السعر الشهري'}</p>
            <p className="text-sm font-bold text-text-primary">{merchant.packagePrice} {t('sar') || 'ر.س'}</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">{t('startDate') || 'تاريخ البدء'}</p>
            <p className="text-sm font-bold text-text-primary">{formatDate(merchant.subscriptionStart)}</p>
          </div>
          <div className="p-3 bg-bg-base rounded-xl">
            <p className="text-xs text-text-secondary mb-1">{t('endDate') || 'تاريخ الانتهاء'}</p>
            <p className="text-sm font-bold text-text-primary">{formatDate(merchant.subscriptionEnd)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={isActive ? 'danger' : 'primary'}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? t('suspendMerchant') || 'إيقاف التاجر' : t('activateMerchant') || 'تفعيل التاجر'}
          </Button>
          <Button variant="outline">
            {t('changePackage') || 'تغيير الباقة'}
          </Button>
          <Button variant="outline">
            {t('extendSubscription') || 'تمديد الإشتراك'}
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-border-base">{t('branches') || 'الفروع'}</h3>
        <div className="space-y-2">
          {merchant.branches.map((branch, index) => (
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
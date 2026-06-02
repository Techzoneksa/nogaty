'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/lib/i18n/useTranslation';

const packages = [
  { id: 1, name: 'أساسية', price: 99, customerLimit: 100, branchesLimit: 1, features: ['برنامج نقاط الولاء', 'تقرير أساسي', 'دعم عبر البريد'], active: true },
  { id: 2, name: 'احترافية', price: 249, customerLimit: 500, branchesLimit: 3, features: ['كل مميزات الأساسية', 'تقرير متقدم', 'دعم عبر الهاتف', 'API مخصص'], active: true },
  { id: 3, name: 'متقدمة', price: 499, customerLimit: 1000, branchesLimit: 10, features: ['كل مميزات الاحترافية', 'تقرير شامل', 'دعم 24/7', 'تكامل غير محدود', 'أولوية الإطلاق'], active: true },
];

export default function PackagesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="الباقات"
        description="إدارة باقات الاشتراك والتسعير"
        action={
          <Button variant="primary" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة باقة
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="ابحث عن باقة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>

      {filteredPackages.length === 0 ? (
        <EmptyState
          title="لا توجد باقات"
          description="لم يتم العثور على باقات يطابقون معايير البحث"
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
                    <span className="text-sm text-text-secondary">ر.س/شهر</span>
                  </div>
                </div>
                <Badge variant={pkg.active ? 'success' : 'neutral'}>
                  {pkg.active ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between py-2 border-b border-border-base/50">
                  <span className="text-sm text-text-secondary">العملاء</span>
                  <span className="text-sm font-semibold text-text-primary">{pkg.customerLimit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-base/50">
                  <span className="text-sm text-text-secondary">الفروع</span>
                  <span className="text-sm font-semibold text-text-primary">{pkg.branchesLimit}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-secondary mb-2">المميزات:</p>
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
                  تعديل
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
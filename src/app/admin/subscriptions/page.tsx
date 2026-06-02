'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/lib/i18n/useTranslation';

const subscriptions = [
  { id: 1, merchant: 'مقهى النخبة', merchantId: 1, package: 'احترافية', startDate: '2024-01-15', endDate: '2025-01-15', status: 'نشط', amount: 249 },
  { id: 2, merchant: 'سوبرماركت الشاطئ', merchantId: 2, package: 'أساسية', startDate: '2024-02-20', endDate: '2025-02-20', status: 'نشط', amount: 99 },
  { id: 3, merchant: 'صالون الأناقة', merchantId: 3, package: 'متقدمة', startDate: '2024-03-10', endDate: '2025-03-10', status: 'تجربة', amount: 499 },
  { id: 4, merchant: 'متجر التقنية', merchantId: 4, package: 'احترافية', startDate: '2023-11-05', endDate: '2024-11-05', status: 'منتهي', amount: 249 },
  { id: 5, merchant: 'مطعم Heritage', merchantId: 5, package: 'متقدمة', startDate: '2023-12-01', endDate: '2024-12-01', status: 'ملغي', amount: 499 },
];

export default function SubscriptionsPage() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState('الكل');

  const statusOptions = [
    { value: 'الكل', label: 'الكل' },
    { value: 'نشط', label: 'نشط' },
    { value: 'تجربة', label: 'تجربة' },
    { value: 'منتهي', label: 'منتهي' },
    { value: 'ملغي', label: 'ملغي' },
  ];

  const filteredSubscriptions = subscriptions.filter((sub) =>
    statusFilter === 'الكل' || sub.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge variant="success">{status}</Badge>;
      case 'تجربة':
        return <Badge variant="warning">{status}</Badge>;
      case 'منتهي':
        return <Badge variant="neutral">{status}</Badge>;
      case 'ملغي':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="الاشتراكات"
        description="إدارة وتتبع اشتراكات التجار"
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

        {filteredSubscriptions.length === 0 ? (
          <EmptyState
            title="لا توجد اشتراكات"
            description="لم يتم العثور على اشتراكات يطابقون معايير البحث"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">التاجر</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">الباقة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">تاريخ البدء</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">تاريخ الانتهاء</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الحالة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">المبلغ</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
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
                      <span className="text-sm font-semibold text-text-primary">{sub.amount} ر.س</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          تمديد
                        </Button>
                        {sub.status === 'نشط' && (
                          <Button variant="danger" size="sm">
                            إلغاء
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
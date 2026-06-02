'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Link from 'next/link';

const merchants = [
  { id: 1, name: 'مقهى النخبة', type: 'مطعم', city: 'الرياض', owner: 'خالد العتيبي', phone: '0501234567', package: 'احترافية', status: 'نشط', customers: 245, joinDate: '2024-01-15' },
  { id: 2, name: 'سوبرماركت الشاطئ', type: 'متجر', city: 'جدة', owner: 'محمد الأحمد', phone: '0509876543', package: 'أساسية', status: 'نشط', customers: 180, joinDate: '2024-02-20' },
  { id: 3, name: 'صالون الأناقة', type: 'جمال', city: 'الدمام', owner: 'سارة القحطاني', phone: '0553456789', package: 'متقدمة', status: 'تجربة', customers: 85, joinDate: '2024-03-10' },
  { id: 4, name: 'متجر التقنية', type: 'إلكترونيات', city: 'الرياض', owner: 'عبدالله السعيد', phone: '0502345678', package: 'احترافية', status: 'نشط', customers: 320, joinDate: '2023-11-05' },
  { id: 5, name: 'مطعم Heritage', type: 'مطعم', city: 'الرياض', owner: 'ناصر العنزي', phone: '0508765432', package: 'متقدمة', status: 'موقوف', customers: 95, joinDate: '2023-12-01' },
  { id: 6, name: 'مخبز النجاح', type: 'مطعم', city: 'مكة', owner: 'أحمد الزهراني', phone: '0504567890', package: 'أساسية', status: 'منتهي', customers: 45, joinDate: '2023-06-15' },
];

export default function MerchantsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const statusOptions = [
    { value: 'الكل', label: 'الكل' },
    { value: 'نشط', label: 'نشط' },
    { value: 'تجربة', label: 'تجربة' },
    { value: 'موقوف', label: 'موقوف' },
    { value: 'منتهي', label: 'منتهي' },
  ];

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch = merchant.name.includes(search) || merchant.phone.includes(search);
    const matchesStatus = statusFilter === 'الكل' || merchant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge variant="success">{status}</Badge>;
      case 'تجربة':
        return <Badge variant="warning">{status}</Badge>;
      case 'موقوف':
        return <Badge variant="danger">{status}</Badge>;
      case 'منتهي':
        return <Badge variant="neutral">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="التجار"
        description="إدارة والتجار والمتاجر المسجلة في النظام"
        action={
          <Button variant="primary" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة تاجر
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input
              placeholder="ابحث بالاسم أو رقم الهاتف..."
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

        {filteredMerchants.length === 0 ? (
          <EmptyState
            title="لا توجد نتائج"
            description="لم يتم العثور على تجار يطابقون معايير البحث"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border-base">
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الاسم</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden sm:table-cell">النوع</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden md:table-cell">المدينة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden lg:table-cell">المالك</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الباقة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الحالة</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2 hidden xl:table-cell">العملاء</th>
                  <th className="text-right text-xs font-semibold text-text-secondary pb-3 px-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((merchant) => (
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
                        {merchant.status !== 'موقوف' && (
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
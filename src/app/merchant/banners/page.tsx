"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function BannersPage() {
  const { t } = useTranslation();

  const banners = [
    {
      id: "1",
      title: "عرض رمضان",
      image: "https://images.unsplash.com/photo-1555037009-2c80fdc62e0e?w=600",
      link: "/offers/ramadan",
      order: 1,
      status: "active",
    },
    {
      id: "2",
      title: "عيد الفطر",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600",
      link: "/offers/eid",
      order: 2,
      status: "active",
    },
    {
      id: "3",
      title: "صيفنا热气",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
      link: "/offers/summer",
      order: 3,
      status: "inactive",
    },
    {
      id: "4",
      title: "وليمة العيد",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
      link: "/offers/feast",
      order: 4,
      status: "active",
    },
  ];

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="البنرات"
        description="إدارة البنرات المعروضة في التطبيق."
        breadcrumbs={["كافيه نقطة", "البنرات"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة بانر
          </Button>
        }
      />

      {banners.length === 0 ? (
        <EmptyState
          title="لا يوجد بنرات"
          description="لم يتم إضافة أي بنرات بعد. ابدأ بإضافة بانر جديد."
          actionText="إضافة بانر"
          onAction={() => {}}
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-bg-base border-b border-border-base text-xs font-bold text-text-secondary">
              <div className="col-span-1">الترتيب</div>
              <div className="col-span-3">البانر</div>
              <div className="col-span-2">العنوان</div>
              <div className="col-span-3">الرابط</div>
              <div className="col-span-1">الحالة</div>
              <div className="col-span-2">إجراء</div>
            </div>

            {banners.map((banner) => (
              <div
                key={banner.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-border-base/40 hover:bg-bg-base/30 transition-colors items-center"
              >
                <div className="col-span-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-text-secondary cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                  <span className="text-sm font-bold text-text-primary">{banner.order}</span>
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-16 h-10 rounded-lg object-cover"
                  />
                </div>

                <div className="col-span-2">
                  <span className="text-sm font-bold text-text-primary">{banner.title}</span>
                </div>

                <div className="col-span-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-xs text-text-secondary truncate">{banner.link}</span>
                </div>

                <div className="col-span-1">
                  <Badge variant={banner.status === "active" ? "success" : "neutral"}>
                    {banner.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </div>

                <div className="col-span-2 flex items-center gap-1">
                  <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>} className="p-2">
                  </Button>
                  <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>} className="p-2 text-red-500 hover:text-red-600">
                  </Button>
                </div>
              </div>
            ))}
          </Card>

          <div className="text-xs text-text-secondary text-center">
            اسحب الأيقونة <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg> لإعادة ترتيب البنرات
          </div>
        </div>
      )}
    </div>
  );
}
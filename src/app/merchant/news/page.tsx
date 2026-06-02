"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function NewsPage() {
  const { t } = useTranslation();
  const [showInApp, setShowInApp] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
    "3": false,
  });

  const news = [
    {
      id: "1",
      title: "قهوة مختصة جديدة",
      description: "نقدم لكم قهوتنا الجديدة من أصل إثيوبي مع نكهات فاكهية مميزة",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      date: "2024-03-15",
      status: "active",
    },
    {
      id: "2",
      title: "ساعات العمل في رمضان",
      description: "تعديل ساعات العمل خلال شهر رمضان المبارك",
      image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=300",
      date: "2024-03-10",
      status: "active",
    },
    {
      id: "3",
      title: "خدمة التوصيل",
      description: "خدمة توصيل سريعة لجميع الطلبات فوق 50 ريال",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
      date: "2024-03-01",
      status: "active",
    },
    {
      id: "4",
      title: "نظام النقاط الجديد",
      description: "تعرف على نظام النقاط الجديد وأفضل المكافآت",
      image: "https://images.unsplash.com/photo-1556742400-b5b7c512d9b1?w=300",
      date: "2024-02-20",
      status: "inactive",
    },
  ];

  const toggleShowInApp = (id: string) => {
    setShowInApp((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="المنتجات والأخبار"
        description="إدارة المنتجات الجديدة والأخبار."
        breadcrumbs={["كافيه نقطة", "المنتجات"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة خبر
          </Button>
        }
      />

      {news.length === 0 ? (
        <EmptyState
          title="لا يوجد أخبار"
          description="لم يتم إضافة أي أخبار بعد. ابدأ بإضافة خبر جديد."
          actionText="إضافة خبر"
          onAction={() => {}}
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <Card key={item.id} className="flex flex-col overflow-hidden">
              <div className="relative h-40 -mx-5 -mt-5 mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={item.status === "active" ? "success" : "neutral"}>
                    {item.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-bold text-text-primary">{item.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2 text-[10px] text-text-secondary mt-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-base">
                <button
                  onClick={() => toggleShowInApp(item.id)}
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showInApp[item.id] ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                  <span>{showInApp[item.id] ? "مُفعل" : "مخفي"}</span>
                </button>

                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>} className="p-2">
                  </Button>
                  <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>} className="p-2 text-red-500 hover:text-red-600">
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
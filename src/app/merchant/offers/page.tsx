"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function OffersPage() {
  const { t } = useTranslation();
  const [showInApp, setShowInApp] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
    "3": false,
  });

  const offers = [
    {
      id: "1",
      title: "مشروب مجاني",
      description: "احصل على مشروب مجاني عند شراء أي وجبة",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
    },
    {
      id: "2",
      title: "خصم 20%",
      description: "خصم 20% على جميع المشروبات",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "active",
    },
    {
      id: "3",
      title: "وجبة مجانية",
      description: "احصل على وجبة رئيسية مجانية عند طلب وجبتين",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      status: "inactive",
    },
    {
      id: "4",
      title: "توصيل مجاني",
      description: "توصيل مجاني للطلبات فوق 100 ريال",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "active",
    },
    {
      id: "5",
      title: "كوبون خصم 15 ريال",
      description: "خصم 15 ريال على طلبك التالي",
      image: "https://images.unsplash.com/photo-1519670863709-1c7aa2f0b6a9?w=300",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      status: "active",
    },
  ];

  const toggleShowInApp = (id: string) => {
    setShowInApp((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="العروض"
        description="إدارة العروض والمكافآت المقدمة لعملائك."
        breadcrumbs={["كافيه نقطة", "العروض"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة عرض
          </Button>
        }
      />

      {offers.length === 0 ? (
        <EmptyState
          title="لا يوجد عروض"
          description="لم يتم إضافة أي عروض بعد. ابدأ بإنشاء عرض جديد."
          actionText="إضافة عرض"
          onAction={() => {}}
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col overflow-hidden">
              <div className="relative h-40 -mx-5 -mt-5 mb-4">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={offer.status === "active" ? "success" : "neutral"}>
                    {offer.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-bold text-text-primary">{offer.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2">{offer.description}</p>

                <div className="flex items-center gap-2 text-[10px] text-text-secondary mt-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{offer.startDate} - {offer.endDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-base">
                <button
                  onClick={() => toggleShowInApp(offer.id)}
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showInApp[offer.id] ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                  <span>{showInApp[offer.id] ? "مُفعل في التطبيق" : "مخفي من التطبيق"}</span>
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
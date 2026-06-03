"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

const integrations = [
  { id: 1, name: "POS - نقاط البيع", description: "نظام نقاط البيع للفروع", status: "coming_soon", icon: "💳" },
  { id: 2, name: "Salla - سلة", description: "متجر إلكتروني", status: "coming_soon", icon: "🛒" },
  { id: 3, name: "Zid - زد", description: "منصة متجر إلكتروني", status: "coming_soon", icon: "📦" },
  { id: 4, name: "WhatsApp", description: "إرسال رسائل WhatsApp للعملاء", status: "coming_soon", icon: "💬" },
  { id: 5, name: "SMS", description: "إرسال رسائل SMS", status: "coming_soon", icon: "📱" },
  { id: 6, name: "Email", description: "إرسال بريد إلكتروني", status: "coming_soon", icon: "📧" },
  { id: 7, name: "Shopify", description: "متجر Shopify", status: "coming_soon", icon: "🛍️" },
  { id: 8, name: "WooCommerce", description: "متجر WooCommerce", status: "coming_soon", icon: "🛠️" },
];

export default function DashboardIntegrationsPage() {
  const { t } = useTranslation();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "coming_soon": return "قريباً";
      case "inactive": return "غير مفعل";
      case "active": return "مفعل";
      default: return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "neutral";
      default: return "warning";
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="التكاملات"
        description="إدارة وتفعيل التكاملات مع الأنظمة الخارجية."
        breadcrumbs={["لوحة التحكم", "التكاملات"]}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-800">التكاملات غير مفعلة حالياً</span>
          <span className="text-[10px] text-amber-700">الواجهات جاهزة للربط. لا يوجد إرسال أو تكامل حقيقي حالياً.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} hoverEffect className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-base flex items-center justify-center text-2xl">
                {integration.icon}
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-text-primary">{integration.name}</span>
                <span className="text-xs text-text-secondary">{integration.description}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border-base">
              <Badge variant={getStatusVariant(integration.status) as any}>
                {getStatusLabel(integration.status)}
              </Badge>
              <Button variant="outline" size="sm" disabled>
                إعداد
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
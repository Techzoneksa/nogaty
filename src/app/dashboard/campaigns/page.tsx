"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

const campaigns = [
  { id: 1, name: "عرض ترحيبي", type: "WELCOME", status: "SENT", sentAt: "2026-05-28", channels: ["SMS", "WhatsApp"], reach: 245, responseRate: "18%" },
  { id: 2, name: "عرض نقاط مضاعفة", type: "PROMOTION", status: "SCHEDULED", scheduledAt: "2026-06-05", channels: ["SMS", "Email"], reach: 180, responseRate: "-" },
  { id: 3, name: "عميل غير مشهود", type: "WIN_BACK", status: "DRAFT", channels: ["WhatsApp"], reach: "-", responseRate: "-" },
  { id: 4, name: "كسب نقاط مضاعفة", type: "PROMOTION", status: "SENT", sentAt: "2026-05-25", channels: ["SMS"], reach: 320, responseRate: "12%" },
  { id: 5, name: "تحديث البيانات", type: "SURVEY", status: "PAUSED", channels: ["SMS", "Email"], reach: 89, responseRate: "5%" },
];

export default function DashboardCampaignsPage() {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SENT": return <Badge variant="success">تم الإرسال</Badge>;
      case "SCHEDULED": return <Badge variant="warning">مجدول</Badge>;
      case "DRAFT": return <Badge variant="neutral">مسودة</Badge>;
      case "PAUSED": return <Badge variant="danger">متوقف</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case "WhatsApp": return <Badge variant="success" className="text-[9px]">واتساب</Badge>;
      case "SMS": return <Badge variant="primary" className="text-[9px]">رسالة</Badge>;
      case "Email": return <Badge variant="secondary" className="text-[9px]">بريد</Badge>;
      default: return <Badge variant="neutral" className="text-[9px]">{channel}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="الحملات التسويقية"
        description="إدارة وتتبع حملات التسويق عبر الرسائلSMS و WhatsApp والبريد الإلكتروني."
        breadcrumbs={["لوحة التحكم", "الحملات"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إنشاء حملة
          </Button>
        }
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-800">إرسال الحملات غير مفعل حالياً</span>
          <span className="text-[10px] text-amber-700">الواجهات جاهزة للربط مع SMS/WhatsApp API مستقبلاً. لا يوجد إرسال حقيقي حالياً.</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} hoverEffect className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  campaign.status === "SENT" ? "bg-emerald-100 text-emerald-600" :
                  campaign.status === "SCHEDULED" ? "bg-blue-100 text-blue-600" :
                  campaign.status === "DRAFT" ? "bg-slate-100 text-slate-400" :
                  "bg-red-100 text-red-600"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-2.148a6 6 0 01-1.724-4.564l-.533-1.114a5 5 0 01-.65-3.57l.336-.89a5 5 0 011.056-1.402l.336-.89a5 5 0 011.056-1.402l.336-.89A5 5 0 0110.89 3.5 5 5 0 0116 6.35l.336.89a5 5 0 01.65 3.57l-.533 1.114a6 6 0 01-1.724 4.564l2.147 2.148a1.76 1.76 0 010 2.348l-2.147 2.148a6 6 0 01-1.724 4.564l-.533 1.114a5 5 0 01-.65 3.57l-.336.89A5 5 0 013 21.5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{campaign.name}</span>
                  <span className="text-[10px] text-text-secondary">{campaign.type}</span>
                </div>
              </div>
              {getStatusBadge(campaign.status)}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {campaign.channels.map((ch) => getChannelBadge(ch))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border-base">
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary">المستهدفين</span>
                  <span className="text-sm font-bold text-text-primary">{campaign.reach}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary">معدل الاستجابة</span>
                  <span className="text-sm font-bold text-emerald-600">{campaign.responseRate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary">التاريخ</span>
                  <span className="text-xs text-text-primary font-mono">{campaign.sentAt || campaign.scheduledAt || "-"}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">عرض</Button>
                <Button variant="outline" size="sm">تعديل</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
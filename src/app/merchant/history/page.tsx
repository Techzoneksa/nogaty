"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Tabs } from "@/components/Tabs";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function HistoryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "add", label: "إضافة" },
    { id: "redeem", label: "استبدال" },
  ];

  const operations = [
    { id: "1", customer: "خالد العتيبي", type: "إضافة", amount: "+35", points: 35, detail: "عملية شراء بـ 35 ريال", date: "2024-01-15 10:30", performedBy: "كاشير 1" },
    { id: "2", customer: "سارة محمد", type: "استبدال", amount: "-100", points: 100, detail: "مشروب مجاني", date: "2024-01-15 11:45", performedBy: "كاشير 2" },
    { id: "3", customer: "سلطان سليمان", type: "إضافة", amount: "+82", points: 82, detail: "عملية شراء بـ 82 ريال", date: "2024-01-15 12:15", performedBy: "كاشير 1" },
    { id: "4", customer: "منيرة عبد الله", type: "إضافة", amount: "+125", points: 125, detail: "عملية شراء بـ 125 ريال", date: "2024-01-15 14:00", performedBy: "المالك" },
    { id: "5", customer: "فهد الدوسري", type: "استبدال", amount: "-300", points: 300, detail: "وجبة مجانية", date: "2024-01-15 15:30", performedBy: "كاشير 2" },
    { id: "6", customer: "علي الشمري", type: "إضافة", amount: "+200", points: 200, detail: "عملية شراء بـ 200 ريال", date: "2024-01-15 16:45", performedBy: "كاشير 1" },
    { id: "7", customer: "مريم العلي", type: "استبدال", amount: "-150", points: 150, detail: "كوبون خصم 15%", date: "2024-01-15 17:00", performedBy: "كاشير 3" },
  ];

  const filteredOperations = operations.filter((op) => {
    if (activeTab === "all") return true;
    if (activeTab === "add") return op.type === "إضافة";
    if (activeTab === "redeem") return op.type === "استبدال";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="سجل العمليات"
        description="سجل جميع عمليات إضافة واستبدال النقاط."
        breadcrumbs={["كافيه نقطة", "السجل"]}
        action={
          <Button variant="outline" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}>
            تصدير
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="ابحث بالعميل أو رقم العملية..."
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
        </div>
        <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
          اختيار التاريخ
        </Button>
        <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>}>
          تصفية
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full hidden md:table">
            <thead className="bg-bg-base border-b border-border-base">
              <tr>
                <th className="text-right text-xs font-bold text-text-secondary p-4">العميل</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">النوع</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">النقاط</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">التفاصيل</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">التاريخ</th>
                <th className="text-right text-xs font-bold text-text-secondary p-4">بواسطة</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperations.map((op) => {
                const isAdd = op.type === "إضافة";
                return (
                  <tr key={op.id} className="border-b border-border-base/40 hover:bg-bg-base/30 transition-colors">
                    <td className="p-4">
                      <span className="text-xs font-bold text-text-primary">{op.customer}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant={isAdd ? "success" : "danger"}>
                        <span className="flex items-center gap-1">
                          {isAdd ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          )}
                          {op.type}
                        </span>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-black ${isAdd ? "text-emerald-600" : "text-rose-600"}`}>
                        {op.amount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-text-secondary">{op.detail}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-text-secondary font-mono">{op.date}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-text-secondary">{op.performedBy}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 p-4 md:hidden">
          {filteredOperations.map((op) => {
            const isAdd = op.type === "إضافة";
            return (
              <div key={op.id} className="flex flex-col gap-2 p-3 rounded-xl border border-border-base/40 bg-bg-base/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-text-primary">{op.customer}</span>
                  <Badge variant={isAdd ? "success" : "danger"}>
                    <span className="flex items-center gap-1">
                      {isAdd ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      )}
                      {op.amount}
                    </span>
                  </Badge>
                </div>
                <span className="text-xs text-text-secondary">{op.detail}</span>
                <div className="flex items-center justify-between pt-2 border-t border-border-base/40">
                  <span className="text-[10px] text-text-secondary font-mono">{op.date}</span>
                  <span className="text-[10px] text-text-secondary">{op.performedBy}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
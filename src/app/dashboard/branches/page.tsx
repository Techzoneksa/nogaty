"use client";

import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

const branches = [
  { id: 1, name: "الفرع الرئيسي - العليا", city: "الرياض", district: "حي العليا", customers: 890, status: "active" },
  { id: 2, name: "فرع التخصصي", city: "الرياض", district: "حي التخصصي", customers: 420, status: "active" },
  { id: 3, name: "فرع المروج", city: "الرياض", district: "حي المروج", customers: 110, status: "inactive" },
];

export default function DashboardBranchesPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="الفروع"
        description="إدارة فروع منشأتك وعدد العملاء في كل فرع."
        breadcrumbs={["لوحة التحكم", "الفروع"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة فرع
          </Button>
        }
      />

      <div className="flex flex-col gap-4">
        {branches.map((branch) => (
          <Card key={branch.id} hoverEffect className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  branch.status === "active" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">{branch.name}</span>
                  <span className="text-xs text-text-secondary">{branch.city} - {branch.district}</span>
                </div>
              </div>
              <Badge variant={branch.status === "active" ? "success" : "neutral"}>
                {branch.status === "active" ? "نشط" : "غير نشط"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-bg-base rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary">عدد العملاء</span>
                <span className="text-2xl font-black text-primary">{branch.customers}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">إدارة</Button>
                <Button variant="outline" size="sm">تعديل</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
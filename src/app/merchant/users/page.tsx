"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function UsersPage() {
  const { t } = useTranslation();

  const users = [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@nogaty.com",
      role: "owner",
      roleLabel: "مالك",
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "خالد العتيبي",
      email: "khaled@nogaty.com",
      role: "cashier",
      roleLabel: "كاشير",
      status: "active",
      createdAt: "2024-02-15",
    },
    {
      id: "3",
      name: "سارة أحمد",
      email: "sara@nogaty.com",
      role: "cashier",
      roleLabel: "كاشير",
      status: "active",
      createdAt: "2024-03-01",
    },
    {
      id: "4",
      name: "محمد الحربي",
      email: "mohammed@nogaty.com",
      role: "cashier",
      roleLabel: "كاشير",
      status: "inactive",
      createdAt: "2024-01-20",
    },
  ];

  const roleIcons: Record<string, React.ReactNode> = {
    owner: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    cashier: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  const roleColors: Record<string, "accent" | "secondary"> = {
    owner: "accent",
    cashier: "secondary",
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="المستخدمين والصلاحيات"
        description="إدارة مستخدمي لوحة التحكم وصلاحياتهم."
        breadcrumbs={["كافيه نقطة", "المستخدمين"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة مستخدم
          </Button>
        }
      />

      {users.length === 0 ? (
        <EmptyState
          title="لا يوجد مستخدمين"
          description="لم يتم إضافة أي مستخدمين بعد. ابدأ بإضافة مستخدم جديد."
          actionText="إضافة مستخدم"
          onAction={() => {}}
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-bg-base border-b border-border-base text-xs font-bold text-text-secondary">
              <div className="col-span-3">المستخدم</div>
              <div className="col-span-3">البريد الإلكتروني</div>
              <div className="col-span-2">الدور</div>
              <div className="col-span-2">الحالة</div>
              <div className="col-span-2">إجراء</div>
            </div>

            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-border-base/40 hover:bg-bg-base/30 transition-colors items-center"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-text-primary">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-text-primary">{user.name}</span>
                </div>

                <div className="col-span-3">
                  <span className="text-xs text-text-secondary">{user.email}</span>
                </div>

                <div className="col-span-2">
                  <Badge variant={roleColors[user.role]}>
                    <span className="flex items-center gap-1">
                      {roleIcons[user.role]}
                      {user.roleLabel}
                    </span>
                  </Badge>
                </div>

                <div className="col-span-2">
                  <Badge variant={user.status === "active" ? "success" : "neutral"}>
                    {user.status === "active" ? "نشط" : "غير نشط"}
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

          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border-base">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-text-primary">الصلاحيات</span>
                <span className="text-xs text-text-secondary">ملخص أدوار المستخدمين</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/20">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text-primary">مالك</span>
                  <span className="text-xs text-text-secondary">صلاحيات كاملة على النظام</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text-primary">كاشير</span>
                  <span className="text-xs text-text-secondary">إضافة نقاط واستبدال فقط</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Tabs } from "@/components/Tabs";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function CustomersPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "active", label: "نشط" },
    { id: "inactive", label: "غير نشط" },
  ];

  const customers = [
    { id: "1", name: "سعيد القحطاني", phone: "0501234412", points: 240, tier: "Gold", status: "active", lastVisit: "منذ 5 دقائق", memberId: "NGT-001247" },
    { id: "2", name: "فاطمة أحمد", phone: "0561234883", points: 85, tier: "Bronze", status: "active", lastVisit: "منذ 14 دقيقة", memberId: "NGT-001246" },
    { id: "3", name: "عبد المجيد الحربي", phone: "0541234312", points: 150, tier: "Silver", status: "active", lastVisit: "منذ 35 دقيقة", memberId: "NGT-001245" },
    { id: "4", name: "نورة السعيد", phone: "0531234891", points: 420, tier: "Gold", status: "active", lastVisit: "منذ ساعة", memberId: "NGT-001244" },
    { id: "5", name: "خالد العتيبي", phone: "0511234234", points: 75, tier: "Bronze", status: "inactive", lastVisit: "منذ يومين", memberId: "NGT-001243" },
    { id: "6", name: "مريم العلي", phone: "0551234219", points: 890, tier: "VIP", status: "active", lastVisit: "منذ ساعة", memberId: "NGT-001242" },
    { id: "7", name: "سلمان فيصل", phone: "0591234112", points: 120, tier: "Silver", status: "active", lastVisit: "منذ ساعتين", memberId: "NGT-001241" },
  ];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name.includes(searchQuery) || c.phone.includes(searchQuery);
    const matchesTab = activeTab === "all" || c.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tierColors: Record<string, "primary" | "secondary" | "accent" | "danger"> = {
    Bronze: "primary",
    Silver: "secondary",
    Gold: "accent",
    VIP: "danger",
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title="العملاء"
        description="إدارة عملاء برنامج الولاء ونقاطهم."
        breadcrumbs={["كافيه نقطة", "العملاء"]}
        action={
          <Button variant="primary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            إضافة عميل
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="ابحث بالاسم أو رقم الهاتف..."
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>}>
          تصفية
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {filteredCustomers.length === 0 ? (
<EmptyState
          title="لا يوجد عملاء"
          description="لم يتم تسجيل أي عملاء بعد. ابدأ بإضافة عملائك."
          actionText="إضافة عميل"
          onAction={() => {}}
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
        />
      ) : (
        <>
          <div className="hidden md:flex flex-col">
            <Card className="p-0 overflow-hidden">
              <table className="w-full">
                <thead className="bg-bg-base border-b border-border-base">
                  <tr>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">العميل</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">رقم الهاتف</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">رقم العضوية</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">النقاط</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">المستوى</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">آخر زيارة</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border-base/40 hover:bg-bg-base/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-text-primary">
                            {customer.name.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-text-primary">{customer.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-text-secondary font-mono">{customer.phone}</td>
                      <td className="p-4 text-xs text-text-secondary font-mono">{customer.memberId}</td>
                      <td className="p-4 text-xs font-bold text-text-primary">{customer.points} نقطة</td>
                      <td className="p-4">
                        <Badge variant={tierColors[customer.tier]}>{customer.tier}</Badge>
                      </td>
                      <td className="p-4 text-xs text-text-secondary">{customer.lastVisit}</td>
                      <td className="p-4">
                        <Link href={`/merchant/customers/${customer.id}`}>
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {filteredCustomers.map((customer) => (
              <Link key={customer.id} href={`/merchant/customers/${customer.id}`}>
                <Card hoverEffect className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-text-primary">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-text-primary">{customer.name}</span>
                        <span className="text-[10px] text-text-secondary font-mono">{customer.phone}</span>
                      </div>
                    </div>
                    <Badge variant={tierColors[customer.tier]}>{customer.tier}</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border-base/40">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-text-secondary">رقم العضوية</span>
                      <span className="text-xs font-mono text-text-primary">{customer.memberId}</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-xs font-bold text-primary">{customer.points} نقطة</span>
                      <span className="text-[10px] text-text-secondary">{customer.lastVisit}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Customer {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  totalPoints: number;
  totalVisits: number;
  lastVisitAt: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
}

interface CustomersResponse {
  customers: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    total: number;
    active: number;
    inactive: number;
  };
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  return `منذ ${diffDays} يوم`;
}

export default function CustomersPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", email: "" });
  const [isAdding, setIsAdding] = useState(false);

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "active", label: "نشط" },
    { id: "inactive", label: "غير نشط" },
  ];

  useEffect(() => {
    fetchCustomers();
  }, [activeTab, searchQuery]);

  async function fetchCustomers() {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: "1",
        limit: "50",
        ...(searchQuery && { search: searchQuery }),
        ...(activeTab !== "all" && { status: activeTab.toUpperCase() }),
      });

      const response = await fetch(`/api/merchant/customers?${params}`);
      if (!response.ok) throw new Error("فشل تحميل العملاء");
      const data: CustomersResponse = await response.json();
      setCustomers(data.customers);
      setError(null);
    } catch (err) {
      console.error("Fetch customers error:", err);
      setError("حدث خطأ في تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddCustomer(e: React.FormEvent) {
    e.preventDefault();
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) return;

    try {
      setIsAdding(true);
      const response = await fetch("/api/merchant/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "فشل إضافة العميل");
      }

      setShowAddModal(false);
      setNewCustomer({ name: "", phone: "", email: "" });
      fetchCustomers();
    } catch (err) {
      console.error("Add customer error:", err);
      alert(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setIsAdding(false);
    }
  }

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
          <Button
            variant="primary"
            size="sm"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            onClick={() => setShowAddModal(true)}
          >
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
      </div>

      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse p-4">
              <div className="h-12 bg-gray-200 rounded-xl"></div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchCustomers} className="mt-2">
            إعادة المحاولة
          </Button>
        </div>
      ) : customers.length === 0 ? (
        <Card className="p-8 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <h3 className="text-lg font-bold text-text-primary mb-2">لا يوجد عملاء</h3>
          <p className="text-sm text-text-secondary mb-4">لم يتم تسجيل أي عملاء بعد.</p>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            إضافة عميل جديد
          </Button>
        </Card>
      ) : (
        <>
          <div className="hidden md:flex flex-col">
            <Card className="p-0 overflow-hidden">
              <table className="w-full">
                <thead className="bg-bg-base border-b border-border-base">
                  <tr>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">العميل</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">رقم الهاتف</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">النقاط</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">المستوى</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">آخر زيارة</th>
                    <th className="text-right text-xs font-bold text-text-secondary p-4">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
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
                      <td className="p-4 text-xs font-bold text-text-primary">{customer.totalPoints} نقطة</td>
                      <td className="p-4">
                        <Badge variant={tierColors[customer.tier]}>{customer.tier}</Badge>
                      </td>
                      <td className="p-4 text-xs text-text-secondary">{formatTimeAgo(customer.lastVisitAt)}</td>
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
            {customers.map((customer) => (
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
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-xs font-bold text-primary">{customer.totalPoints} نقطة</span>
                      <span className="text-[10px] text-text-secondary">{formatTimeAgo(customer.lastVisitAt)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4">إضافة عميل جديد</h2>
            <form onSubmit={handleAddCustomer} className="flex flex-col gap-4">
              <Input
                label="الاسم"
                placeholder="اسم العميل"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                required
              />
              <Input
                label="رقم الجوال"
                placeholder="05xxxxxxxx"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                required
              />
              <Input
                label="البريد الإلكتروني (اختياري)"
                placeholder="email@example.com"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                  إلغاء
                </Button>
                <Button type="submit" variant="primary" className="flex-1" isLoading={isAdding}>
                  إضافة
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
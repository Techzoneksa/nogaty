"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Tabs } from "@/components/Tabs";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Transaction {
  id: string;
  customerId: string;
  type: "EARN" | "REDEEM";
  points: number;
  amount?: number;
  description: string;
  createdAt: string;
}

interface Customer {
  id: string;
  name: string;
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customers, setCustomers] = useState<Record<string, Customer>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tabs = [
    { id: "all", label: t("merchant.all") || "الكل" },
    { id: "add", label: t("merchant.add") || "إضافة" },
    { id: "redeem", label: t("merchant.redeemPointsAction") || "استبدال" },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = `/api/merchant/points/history?page=${page}&limit=20`;
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        if (activeTab === "add") {
          url += "&type=EARN";
        } else if (activeTab === "redeem") {
          url += "&type=REDEEM";
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.transactions || []);
          setTotalPages(data.pagination?.totalPages || 1);
        } else {
          const errData = await response.json();
          setError(errData.error || t("common.error") || "Error loading transactions");
        }
      } catch {
        setError(t("common.error") || "Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [page, searchQuery, activeTab, t]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch("/api/merchant/customers");
        if (response.ok) {
          const data = await response.json();
          const customerMap: Record<string, Customer> = {};
          data.customers?.forEach((c: Customer) => {
            customerMap[c.id] = c;
          });
          setCustomers(customerMap);
        }
      } catch {
      }
    };
    loadCustomers();
  }, []);

  const getCustomerName = (customerId: string) => {
    return customers[customerId]?.name || customerId;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title={t("merchant.historyTitle") || "سجل العمليات"}
        description={t("merchant.historyDesc") || "سجل جميع عمليات إضافة واستبدال النقاط."}
        breadcrumbs={[t("merchant.brand") || "كافيه نقطة", t("merchant.history") || "السجل"]}
        action={
          <Button
            variant="outline"
            size="sm"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
          >
            {t("merchant.export") || "تصدير"}
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder={t("merchant.searchByCustomer") || "ابحث بالعميل أو رقم العملية..."}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
          {t("merchant.selectDate") || "اختيار التاريخ"}
        </Button>
        <Button variant="outline" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>}>
          {t("common.filter") || "فلتر"}
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => { setActiveTab(id); setPage(1); }} />

      {isLoading ? (
        <Card className="flex items-center justify-center p-12">
          <span className="text-text-secondary">{t("common.loading") || "جاري التحميل..."}</span>
        </Card>
      ) : error ? (
        <Card className="flex items-center justify-center p-12">
          <span className="text-red-600">{error}</span>
        </Card>
      ) : transactions.length === 0 ? (
        <EmptyState
          title={t("merchant.noOperations") || "لا توجد عمليات"}
          description={t("merchant.addFirstOperation") || "لا توجد عمليات بعد"}
        />
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full hidden md:table">
              <thead className="bg-bg-base border-b border-border-base">
                <tr>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.customer") || "العميل"}</th>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.operationType") || "النوع"}</th>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.points") || "النقاط"}</th>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.operationDetails") || "التفاصيل"}</th>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.operationDate") || "التاريخ"}</th>
                  <th className="text-right text-xs font-bold text-text-secondary p-4">{t("merchant.performedBy") || "بواسطة"}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const isEarn = tx.type === "EARN";
                  return (
                    <tr key={tx.id} className="border-b border-border-base/40 hover:bg-bg-base/30 transition-colors">
                      <td className="p-4">
                        <span className="text-xs font-bold text-text-primary">{getCustomerName(tx.customerId)}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant={isEarn ? "success" : "danger"}>
                          <span className="flex items-center gap-1">
                            {isEarn ? (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            )}
                            {isEarn ? (t("merchant.add") || "إضافة") : (t("merchant.redeemPointsAction") || "استبدال")}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                          {isEarn ? "+" : ""}{tx.points}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-text-secondary">{tx.description}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-text-secondary font-mono">{formatDate(tx.createdAt)}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-text-secondary">-</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 p-4 md:hidden">
            {transactions.map((tx) => {
              const isEarn = tx.type === "EARN";
              return (
                <div key={tx.id} className="flex flex-col gap-2 p-3 rounded-xl border border-border-base/40 bg-bg-base/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-primary">{getCustomerName(tx.customerId)}</span>
                    <Badge variant={isEarn ? "success" : "danger"}>
                      <span className="flex items-center gap-1">
                        {isEarn ? "+" : ""}{tx.points}
                      </span>
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">{tx.description}</span>
                  <div className="flex items-center justify-between pt-2 border-t border-border-base/40">
                    <span className="text-[10px] text-text-secondary font-mono">{formatDate(tx.createdAt)}</span>
                    <span className="text-[10px] text-text-secondary">-</span>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-border-base">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t("common.previous") || "السابق"}
              </Button>
              <span className="text-xs text-text-secondary">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t("common.next") || "التالي"}
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
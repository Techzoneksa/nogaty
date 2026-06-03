"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalPoints: number;
}

interface Transaction {
  id: string;
  customerId: string;
  type: "EARN" | "REDEEM";
  points: number;
  amount?: number;
  description: string;
  createdAt: string;
}

export default function AddPointsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [note, setNote] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ totalEarned: 0, totalRedeemed: 0, count: 0 });

  const mountedRef = useRef(true);

  const loadTransactions = async () => {
    if (!mountedRef.current) return;
    try {
      const response = await fetch("/api/merchant/points/history?limit=10");
      if (response.ok && mountedRef.current) {
        const data = await response.json();
        setRecentTransactions(data.transactions || []);

        const earned = data.transactions
          ?.filter((t: Transaction) => t.type === "EARN")
          .reduce((sum: number, t: Transaction) => sum + t.points, 0) || 0;
        const redeemed = Math.abs(
          data.transactions
            ?.filter((t: Transaction) => t.type === "REDEEM")
            .reduce((sum: number, t: Transaction) => sum + t.points, 0) || 0
        );
        setStats({
          totalEarned: earned,
          totalRedeemed: redeemed,
          count: data.transactions?.length || 0,
        });
      }
    } catch {
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadTransactions, 0);
    return () => { clearTimeout(timer); mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch("/api/merchant/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customers || []);
        }
      } catch {
      }
    };
    loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    );
  }, [searchQuery, customers]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(customer.phone);
    setError(null);
  };

  const handleSearch = () => {
    if (searchQuery.length >= 9) {
      const found = customers.find((c) => c.phone.includes(searchQuery));
      if (found) {
        setSelectedCustomer(found);
        setError(null);
      }
    }
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setPurchaseAmount("");
    setNote("");
    setError(null);
    setSuccess(null);
  };

  const calculatedPoints = purchaseAmount ? parseInt(purchaseAmount) : 0;

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      setError(t("merchant.customerNotFound") || "Customer not found");
      return;
    }

    if (!purchaseAmount || parseInt(purchaseAmount) <= 0) {
      setError(t("merchant.minPurchaseRequired") || "Purchase amount must be greater than zero");
      return;
    }

    setIsAdding(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/merchant/points/earn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: selectedCustomer.phone,
          amount: parseInt(purchaseAmount),
          note: note || t("merchant.purchaseDetail") || "Purchase operation",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(t("merchant.pointsAddedSuccess") || "Points added successfully");
        setPurchaseAmount("");
        setNote("");
        if (data.customer) {
          setSelectedCustomer((prev) =>
            prev ? { ...prev, totalPoints: data.customer.totalPoints } : null
          );
        }
        loadTransactions();
      } else {
        const data = await response.json();
        setError(data.error || t("merchant.pointsAddError") || "Failed to add points");
      }
    } catch {
      setError(t("merchant.pointsAddError") || "Failed to add points. Try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title={t("merchant.addPointsTitle") || "إضافة نقاط"}
        description={t("merchant.earnDescription") || "أضف نقاط للعميل بناءً على مشترياته"}
        breadcrumbs={[t("merchant.brand") || "كافيه نقطة", t("merchant.points") || "النقاط", t("merchant.addPoints") || "إضافة نقاط"]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center justify-center p-4">
          <span className="text-xs text-text-secondary">{t("merchant.totalEarnedPoints") || "إجمالي النقاط المكتسبة"}</span>
          <span className="text-2xl font-black text-emerald-600">+{stats.totalEarned}</span>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4">
          <span className="text-xs text-text-secondary">{t("merchant.totalRedeemedPoints") || "إجمالي النقاط المستبدلة"}</span>
          <span className="text-2xl font-black text-rose-600">-{stats.totalRedeemed}</span>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4">
          <span className="text-xs text-text-secondary">{t("merchant.operationCount") || "عدد العمليات"}</span>
          <span className="text-2xl font-black text-primary">{stats.count}</span>
        </Card>
      </div>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-text-primary">{t("merchant.customerSearch") || "البحث عن العميل"}</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              placeholder={t("merchant.searchCustomer") || "رقم الهاتف أو رقم العضوية..."}
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCustomer(null);
                setError(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {filteredCustomers.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-border-base shadow-lg max-h-48 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer)}
                    className="w-full px-4 py-3 text-right hover:bg-bg-base transition-colors border-b border-border-base/30 last:border-0"
                  >
                    <span className="text-sm font-bold text-text-primary">{customer.name}</span>
                    <span className="text-xs text-text-secondary block">{customer.phone}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="primary"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            onClick={handleSearch}
            disabled={isSearching}
          >
            {t("merchant.search") || "بحث"}
          </Button>
          {selectedCustomer && (
            <Button variant="outline" onClick={handleClearSelection}>
              {t("common.close") || "إلغاء"}
            </Button>
          )}
        </div>

        {selectedCustomer && (
          <div className="flex flex-col gap-3 pt-4 border-t border-border-base">
            <div className="flex items-center justify-between p-4 bg-bg-base rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-black text-text-primary">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text-primary">{selectedCustomer.name}</span>
                  <span className="text-xs text-text-secondary font-mono">{selectedCustomer.phone}</span>
                </div>
              </div>
              <Badge variant="accent">{t("merchant.currentBalance") || "الرصيد"}: {selectedCustomer.totalPoints} {t("merchant.points") || "نقطة"}</Badge>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-bold text-red-700">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-bold text-emerald-700">{success}</span>
          </div>
        )}
      </Card>

      {selectedCustomer && (
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">{t("merchant.purchaseAmount") || "معلومات عملية الشراء"}</h3>

          <Input
            label={t("merchant.purchaseValue") || "قيمة عملية الشراء (ريال)"}
            type="number"
            placeholder={t("merchant.enterPurchaseValue") || "أدخل قيمة المشتريات"}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            error={purchaseAmount && parseInt(purchaseAmount) < 0 ? (t("merchant.negativeValueError") || "لا يمكن إدخال قيمة سالبة") : undefined}
          />

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-text-secondary">{t("merchant.pointsCalculated") || "النقاط المحتسبة"}</span>
                <span className="text-sm font-bold text-primary">{t("merchant.pointsPerRiyalRule") || "1 نقطة لكل 1 ريال"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-2xl font-black text-primary">{calculatedPoints}</span>
              <span className="text-xs text-text-secondary">{t("merchant.points") || "نقطة"}</span>
            </div>
          </div>

          <Input
            label={t("merchant.noteOptional") || "ملاحظة (اختياري)"}
            placeholder={t("merchant.addNotePlaceholder") || "أضف ملاحظة لهذه العملية..."}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
            onClick={handleSubmit}
            disabled={isAdding || !purchaseAmount || parseInt(purchaseAmount) <= 0}
          >
            {isAdding ? (t("common.loading") || "جاري التحميل...") : `${t("merchant.confirm") || "تأكيد"} ${t("merchant.add") || "إضافة"} ${calculatedPoints} ${t("merchant.points") || "نقطة"}`}
          </Button>
        </Card>
      )}

      {recentTransactions.length > 0 && (
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-primary">{t("merchant.recentOperations") || "العمليات الأخيرة"}</h3>
          <div className="flex flex-col gap-2">
            {recentTransactions.slice(0, 5).map((tx) => {
              const isEarn = tx.type === "EARN";
              return (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-bg-base/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant={isEarn ? "success" : "danger"}>
                      {isEarn ? "+" : ""}{tx.points}
                    </Badge>
                    <span className="text-xs text-text-secondary">{tx.description}</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-mono">
                    {new Date(tx.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
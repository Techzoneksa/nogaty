"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalPoints: number;
}

interface Reward {
  id: string;
  name: string;
  description?: string;
  rewardType: string;
  pointsCost: number;
  value: number;
}

export default function RedeemPointsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState("");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const pointValue = 0.1;
  const discountValue = pointsToRedeem ? (parseInt(pointsToRedeem) * pointValue).toFixed(2) : "0.00";
  const hasInsufficientBalance = selectedCustomer && pointsToRedeem && parseInt(pointsToRedeem) > selectedCustomer.totalPoints;

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
    const loadRewards = async () => {
      try {
        const response = await fetch("/api/merchant/rewards");
        if (response.ok) {
          const data = await response.json();
          setRewards(data.rewards || []);
        }
      } catch {
      }
    };
    loadCustomers();
    loadRewards();
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
    setSuccess(null);
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
    setPointsToRedeem("");
    setSelectedReward(null);
    setError(null);
    setSuccess(null);
  };

  const handleSelectReward = (reward: Reward) => {
    setSelectedReward(reward);
    setPointsToRedeem(reward.pointsCost.toString());
  };

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      setError(t("merchant.customerNotFound") || "Customer not found");
      return;
    }

    if (!pointsToRedeem || parseInt(pointsToRedeem) <= 0) {
      setError(t("merchant.minPointsRequired") || "Points must be greater than zero");
      return;
    }

    if (hasInsufficientBalance) {
      setError(t("merchant.insufficientBalance") || "Customer balance is insufficient");
      return;
    }

    setIsRedeeming(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/merchant/points/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: selectedCustomer.phone,
          points: parseInt(pointsToRedeem),
          rewardId: selectedReward?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(t("merchant.redeemSuccess") || "Points redeemed successfully");
        setPointsToRedeem("");
        setSelectedReward(null);
        if (data.customer) {
          setSelectedCustomer((prev) =>
            prev ? { ...prev, totalPoints: data.customer.totalPoints } : null
          );
        }
      } else {
        const data = await response.json();
        setError(data.error || t("merchant.redeemError") || "Failed to redeem points");
      }
    } catch {
      setError(t("merchant.redeemError") || "Failed to redeem points. Try again.");
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      <PageHeader
        title={t("merchant.redeemTitle") || "استبدال نقاط"}
        description={t("merchant.redeemDescription") || "استبدل نقاط العميل بمكافآت."}
        breadcrumbs={[t("merchant.brand") || "كافيه نقطة", t("merchant.points") || "النقاط", t("merchant.redeemPointsAction") || "استبدال"]}
      />

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
          <h3 className="text-sm font-bold text-text-primary">{t("merchant.redeemTitle") || "معلومات الاستبدال"}</h3>

          <Input
            label={t("merchant.pointsToRedeem") || "النقاط المراد استبدالها"}
            type="number"
            placeholder={t("merchant.enterPurchaseValue") || "أدخل عدد النقاط"}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>}
            value={pointsToRedeem}
            onChange={(e) => {
              setPointsToRedeem(e.target.value);
              setSelectedReward(null);
            }}
            error={hasInsufficientBalance ? (t("merchant.insufficientBalance") || "الرصيد غير كافي") : undefined}
          />

          {hasInsufficientBalance && (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-red-700">{t("merchant.insufficientBalance") || "رصيد غير كافٍ"}</span>
                <span className="text-xs text-red-600">{t("merchant.currentBalance") || "الرصيد المتاح"}: {selectedCustomer.totalPoints} {t("merchant.points") || "نقطة"}</span>
              </div>
            </div>
          )}

          {rewards.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary">{t("merchant.selectReward") || "اختر المكافأة (اختياري)"}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rewards.map((reward) => (
                  <button
                    key={reward.id}
                    onClick={() => handleSelectReward(reward)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      selectedReward?.id === reward.id
                        ? "border-primary bg-primary/5"
                        : "border-border-base hover:border-primary/50"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm font-bold text-text-primary">{reward.name}</span>
                      <span className="text-xs text-text-secondary">{reward.description}</span>
                    </div>
                    <Badge variant="accent">{reward.pointsCost} {t("merchant.points") || "نقطة"}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-xl border border-secondary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-text-secondary">{t("merchant.discountValue") || "قيمة الخصم"}</span>
                <span className="text-sm font-bold text-secondary">0.1 {t("merchant.sar") || "ريال"} {t("merchant.pointValue") || "لكل نقطة"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-2xl font-black text-secondary">{discountValue}</span>
              <span className="text-xs text-text-secondary">{t("merchant.sar") || "ريال"}</span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            icon={<svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            onClick={handleSubmit}
            disabled={isRedeeming || !pointsToRedeem || hasInsufficientBalance || parseInt(pointsToRedeem) <= 0}
          >
            {isRedeeming ? (t("common.loading") || "جاري التحميل...") : `${t("merchant.confirm") || "تأكيد"} ${t("merchant.redeemPointsAction") || "استبدال"} ${pointsToRedeem || 0} ${t("merchant.points") || "نقطة"}`}
          </Button>
        </Card>
      )}
    </div>
  );
}
"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Tabs } from "@/components/Tabs";

interface CustomerDetailsProps {
  params: Promise<{ id: string }>;
}

export default function CustomerDetailsPage({ params }: CustomerDetailsProps) {
  const resolvedParams = use(params);
  const customerId = resolvedParams.id;

  const [activeTab, setActiveTab] = useState("points_log");
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [pointsAction, setPointsAction] = useState<"add" | "deduct">("add");
  const [pointsAmount, setPointsAmount] = useState("50");
  const [pointsReason, setPointsReason] = useState("شراء وجبة عائلية");
  
  // Mock Customer list
  const mockCustomers: Record<string, any> = {
    "1": { name: "محمد العتيبي", phone: "0501234567", points: 420, visits: 24, lastVisit: "2026-06-01", branch: "العليا", status: "active", tier: "Gold", email: "m.otaibi@example.com", dateJoined: "2025-10-12" },
    "2": { name: "سارة أحمد صالح", phone: "0567890123", points: 150, visits: 8, lastVisit: "2026-05-30", branch: "التخصصي", status: "active", tier: "Silver", email: "sara.saleh@example.com", dateJoined: "2026-02-14" },
    "3": { name: "عبد العزيز الرويلي", phone: "0543210987", points: 890, visits: 45, lastVisit: "2026-06-02", branch: "العليا", status: "active", tier: "VIP", email: "a.ruwaili@example.com", dateJoined: "2025-01-20" },
    "4": { name: "فاطمة الحسين", phone: "0533334444", points: 45, visits: 2, lastVisit: "2026-04-15", branch: "التخصصي", status: "inactive", tier: "Bronze", email: "f.hussein@example.com", dateJoined: "2026-04-01" },
    "5": { name: "سلطان الحربي", phone: "0559998888", points: 12, visits: 1, lastVisit: "2026-05-10", branch: "الملز", status: "inactive", tier: "Bronze", email: "s.harbi@example.com", dateJoined: "2026-05-10" },
    "6": { name: "علي القحطاني", phone: "0509876543", points: 310, visits: 19, lastVisit: "2026-05-28", branch: "العليا", status: "active", tier: "Silver", email: "a.qahtani@example.com", dateJoined: "2025-12-05" },
  };

  const customer = mockCustomers[customerId] || mockCustomers["1"];
  const [currentPoints, setCurrentPoints] = useState<number>(customer.points);

  const [pointsLog, setPointsLog] = useState([
    { id: 1, date: "2026-06-01", type: "add", amount: "+85 نقطة", reason: "شراء بقيمة 85 ريال", branch: "فرع العليا" },
    { id: 2, date: "2026-05-25", type: "deduct", amount: "-100 نقطة", reason: "استبدال كوب قهوة مجاني", branch: "فرع العليا" },
    { id: 3, date: "2026-05-14", type: "add", amount: "+120 نقطة", reason: "شراء بقيمة 120 ريال", branch: "فرع العليا" },
    { id: 4, date: "2026-05-02", type: "add", amount: "+50 نقطة", reason: "نقاط ترحيبية بالبرنامج", branch: "النظام" },
  ]);

  const [rewardsRedeemed, setRewardsRedeemed] = useState([
    { id: 1, name: "قهوة مجانية (أي نوع)", cost: "100 نقطة", status: "تم الاستلام", date: "2026-05-25", code: "RE-9810-AC" },
    { id: 2, name: "كوبون خصم 15 ريال", cost: "150 نقطة", status: "صالح للاستخدام", date: "2026-06-02", code: "RE-8822-ZZ" },
  ]);

  const [campaignsSent, setCampaignsSent] = useState([
    { id: 1, name: "حملة عيد الفطر السعيد", channel: "WhatsApp", status: "تم التسليم", date: "2026-05-20" },
    { id: 2, name: "عرض نهاية الأسبوع للعملاء المميزين", channel: "SMS", status: "تم التسليم", date: "2026-05-29" },
  ]);

  const [internalNotes, setInternalNotes] = useState("عميل دائم يفضل الجلوس بالدور الثاني، ويطلب حليب اللوز دائماً.");

  const handlePointsAction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(pointsAmount) || 0;
    if (amount <= 0) return;

    if (pointsAction === "add") {
      setCurrentPoints((prev) => prev + amount);
      setPointsLog([
        {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          type: "add",
          amount: `+${amount} نقطة`,
          reason: pointsReason || "شراء منتجات",
          branch: "لوحة التحكم",
        },
        ...pointsLog,
      ]);
    } else {
      if (currentPoints < amount) {
        alert("رصيد نقاط العميل غير كافٍ لإجراء هذا الخصم!");
        return;
      }
      setCurrentPoints((prev) => prev - amount);
      setPointsLog([
        {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          type: "deduct",
          amount: `-${amount} نقطة`,
          reason: pointsReason || "خصم يدوي",
          branch: "لوحة التحكم",
        },
        ...pointsLog,
      ]);
    }

    setIsPointsModalOpen(false);
  };

  const tabs = [
    { id: "points_log", label: "سجل النقاط", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: "rewards", label: "المكافآت المستبدلة", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg> },
    { id: "campaigns", label: "الحملات المستلمة", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-2.148a6 6 0 01-1.724-4.564l-.533-1.114a5 5 0 01-.65-3.57l.336-.89a5 5 0 011.056-1.402l.336-.89a5 5 0 011.056-1.402l.336-.89A5 5 0 0110.89 3.5 5 5 0 0116 6.35l.336.89a5 5 0 01.65 3.57l-.533 1.114a6 6 0 01-1.724 4.564l2.147 2.148a1.76 1.76 0 010 2.348l-2.147 2.148a6 6 0 01-1.724 4.564l-.533 1.114a5 5 0 01-.65 3.57l-.336.89A5 5 0 013 21.5V6.34l.336-.89a5 5 0 011.056-1.402l.336-.89a5 5 0 011.056-1.402l.336-.89A5 5 0 017.5 13l.336.89a5 5 0 01.65 3.57l-.533 1.114a6 6 0 01-1.724 4.564l2.147 2.148a1.76 1.76 0 010 2.348l-2.147 2.148a6 6 0 01-1.724 4.564l-.533 1.114a5 5 0 01-.65 3.57l-.336.89A5 5 0 013 21.5" /></svg> },
  ];

  const tierVariants: Record<string, string> = { Bronze: "neutral", Silver: "secondary", Gold: "accent", VIP: "danger" };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/customers"
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary font-bold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <span>العودة لجدول العملاء</span>
        </Link>
      </div>

      {/* Page Header */}
      <PageHeader
        title={`الملف الشخصي: ${customer.name}`}
        description="استعرض تفاصيل العميل ونقاطه، وسجل الحركات السابقة، وقم بإضافة أو خصم نقاط يدويًا."
        breadcrumbs={["لوحة التحكم", "العملاء", customer.name]}
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPointsAction("deduct");
                setIsPointsModalOpen(true);
              }}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>}
            >
              خصم نقاط
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setPointsAction("add");
                setIsPointsModalOpen(true);
              }}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            >
              شحن نقاط
            </Button>
          </div>
        }
      />

      {/* Main Profile Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Customer Metrics Profile Card */}
        <Card className="lg:col-span-8 bg-white flex flex-col gap-6 justify-between p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-lg shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div className="flex flex-col text-right gap-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-text-primary">{customer.name}</h2>
                  <Badge variant={tierVariants[customer.tier] as any}>
                    مستوى {customer.tier}
                  </Badge>
                </div>
                <span className="text-xs text-text-secondary font-mono">{customer.phone}</span>
                <span className="text-[10px] text-text-secondary">{customer.email}</span>
              </div>
            </div>
            
            <div className="bg-bg-base/70 border border-border-base p-4 rounded-2xl flex items-center gap-4 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-2xl font-black text-primary">{currentPoints}</span>
                <span className="text-[10px] text-text-secondary font-bold">رصيد النقاط الحالي</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border-base pt-5 text-right">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-text-secondary font-medium">الفرع المفضل</span>
              <div className="flex items-center gap-1 text-xs font-bold text-text-primary mt-1">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{customer.branch}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-text-secondary font-medium">تاريخ الانضمام</span>
              <div className="flex items-center gap-1 text-xs font-bold text-text-primary mt-1">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>{customer.dateJoined}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-text-secondary font-medium">إجمالي الزيارات</span>
              <span className="text-xs font-bold text-text-primary mt-1">
                {customer.visits} زيارات
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-text-secondary font-medium">آخر عملية</span>
              <span className="text-xs font-bold text-text-primary mt-1">
                {customer.lastVisit}
              </span>
            </div>
          </div>
        </Card>

        {/* Internal Notes card */}
        <Card className="lg:col-span-4 bg-white flex flex-col gap-4 p-6">
          <div className="flex flex-col">
            <h3 className="text-xs font-bold text-text-primary">ملاحظات داخلية للموظفين</h3>
            <span className="text-[9px] text-text-secondary">ملاحظات تظهر لموظفي الكاشير عند إدخال الجوال</span>
          </div>

          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            className="w-full bg-bg-base/50 border border-border-base rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-right resize-none flex-1 min-h-[90px]"
          />
          <Button variant="outline" size="sm" className="w-full text-xs font-bold">
            حفظ الملاحظة
          </Button>
        </Card>
      </div>

      {/* Tabs list for Logs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mt-4" />

      {/* Dynamic Tab Contents */}
      <div className="animate-fadeIn">
        {activeTab === "points_log" && (
          <Card className="p-0 bg-white border border-border-base rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-border-base text-right">
              {pointsLog.map((log) => {
                const isAdd = log.type === "add";
                return (
                  <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-text-primary">{log.reason}</span>
                      <span className="text-[10px] text-text-secondary">{log.branch}</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 text-xs">
                      <span className={`font-black ${isAdd ? "text-emerald-600" : "text-rose-600"}`}>
                        {log.amount}
                      </span>
                      <span className="text-[9px] text-text-secondary/70">{log.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === "rewards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewardsRedeemed.map((reward) => (
              <Card key={reward.id} className="p-4 bg-white border border-border-base rounded-2xl text-right flex flex-col gap-2 justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-primary">{reward.name}</span>
                    <span className="text-[10px] text-text-secondary">تكلفة المكافأة: {reward.cost}</span>
                  </div>
                  <Badge variant={reward.status === "تم الاستلام" ? "success" : "warning"}>
                    {reward.status}
                  </Badge>
                </div>
                <div className="border-t border-border-base pt-3 mt-1 flex justify-between text-[10px] text-text-secondary">
                  <span>كود القسيمة: <span className="font-mono font-bold text-text-primary">{reward.code}</span></span>
                  <span>تاريخ الاستبدال: {reward.date}</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "campaigns" && (
          <Card className="p-0 bg-white border border-border-base rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-border-base text-right">
              {campaignsSent.map((camp) => (
                <div key={camp.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-primary">{camp.name}</span>
                    <span className="text-[10px] text-text-secondary">قناة الإرسال: {camp.channel}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="success" className="text-[8px]">{camp.status}</Badge>
                    <span className="text-[9px] text-text-secondary/70">{camp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Add / Deduct Points Modal */}
      <Modal
        isOpen={isPointsModalOpen}
        onClose={() => setIsPointsModalOpen(false)}
        title={pointsAction === "add" ? "شحن نقاط جديدة للعميل" : "خصم نقاط من رصيد العميل"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsPointsModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant="primary" size="sm" onClick={handlePointsAction}>
              {pointsAction === "add" ? "شحن الرصيد" : "إجراء الخصم"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handlePointsAction} className="flex flex-col gap-4 text-right">
          <Input
            label="عدد النقاط"
            type="number"
            value={pointsAmount}
            onChange={(e) => setPointsAmount(e.target.value)}
            required
          />
          <Input
            label="السبب / تفاصيل العملية"
            value={pointsReason}
            onChange={(e) => setPointsReason(e.target.value)}
            placeholder={pointsAction === "add" ? "شراء وجبة عائلية" : "استرداد يدوي"}
            required
          />
          <p className="text-[10px] text-text-secondary leading-relaxed bg-bg-base p-3 rounded-xl">
            {pointsAction === "add"
              ? "* سيتم ترحيل النقاط مباشرة إلى رصيد نقاط العميل، وتحديث مستواه ومكافآته تلقائياً."
              : "* سيتم اقتطاع النقاط مباشرة من رصيد العميل، وتحديث حسابه."}
          </p>
        </form>
      </Modal>
    </div>
  );
}

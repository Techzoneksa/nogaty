"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Coins,
  Gift,
  Megaphone,
  MapPin,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";

export default function DashboardHomePage() {
  const [business, setBusiness] = useState("cafe_noqta");

  useEffect(() => {
    const handleBusinessChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setBusiness(customEvent.detail);
    };

    window.addEventListener("businessChanged", handleBusinessChange);
    return () => {
      window.removeEventListener("businessChanged", handleBusinessChange);
    };
  }, []);

  // Multi-tenant Mock Data
  const dashboardData: Record<string, any> = {
    cafe_noqta: {
      kpis: [
        { title: "إجمالي العملاء", value: "1,420", icon: <Users size={20} />, trend: { value: "+12%", isPositive: true }, color: "primary" },
        { title: "العملاء النشطون", value: "890", icon: <UserCheck size={20} />, trend: { value: "+8%", isPositive: true }, color: "secondary" },
        { title: "النقاط المصدرة", value: "42,500", icon: <Coins size={20} />, trend: { value: "+15%", isPositive: true }, color: "accent" },
        { title: "النقاط المستبدلة", value: "28,900", icon: <RefreshCw size={20} />, trend: { value: "+22%", isPositive: true }, color: "primary" },
        { title: "المكافآت المستبدلة", value: "320", icon: <Gift size={20} />, trend: { value: "+10%", isPositive: true }, color: "secondary" },
        { title: "الحملات المرسلة", value: "8", icon: <Megaphone size={20} />, trend: { value: "0%", isPositive: true }, color: "accent" },
        { title: "معدل تكرار الشراء", value: "64%", icon: <TrendingUp size={20} />, trend: { value: "+4%", isPositive: true }, color: "primary" },
        { title: "الفروع النشطة", value: "2", icon: <MapPin size={20} />, trend: { value: "0%", isPositive: true }, color: "secondary" },
      ],
      recentCustomers: [
        { name: "سعيد القحطاني", phone: "050****412", points: 240, tier: "Gold", date: "منذ 5 دقائق" },
        { name: "فاطمة أحمد", phone: "056****883", points: 85, tier: "Bronze", date: "منذ 14 دقيقة" },
        { name: "عبد المجيد الحربي", phone: "054****312", points: 150, tier: "Silver", date: "منذ 35 دقيقة" },
      ],
      transactions: [
        { customer: "خالد العتيبي", type: "كسب نقاط", amount: "+35 نقطة", detail: "عملية شراء بـ 35 ريال", branch: "فرع العليا", time: "منذ دقيقتين" },
        { customer: "سارة محمد", type: "استبدال نقاط", amount: "-100 نقطة", detail: "مشروب مجاني", branch: "فرع التخصصي", time: "منذ 12 دقيقة" },
        { customer: "سلطان سليمان", type: "كسب نقاط", amount: "+82 نقطة", detail: "عملية شراء بـ 82 ريال", branch: "فرع العليا", time: "منذ 28 دقيقة" },
      ],
      bestRewards: [
        { name: "قهوة مجانية (أي نوع)", cost: "100 نقطة", redemptions: 145 },
        { name: "كوبون خصم 15 ريال", cost: "150 نقطة", redemptions: 98 },
        { name: "حلا مجاني مع القهوة", cost: "120 نقطة", redemptions: 77 },
      ],
      chartPath: "M0,80 Q25,40 50,65 T100,20 T150,45 T200,10 T250,55 T300,15",
    },
    restaurant_mazaq: {
      kpis: [
        { title: "إجمالي العملاء", value: "3,850", icon: <Users size={20} />, trend: { value: "+18%", isPositive: true }, color: "primary" },
        { title: "العملاء النشطون", value: "2,100", icon: <UserCheck size={20} />, trend: { value: "+14%", isPositive: true }, color: "secondary" },
        { title: "النقاط المصدرة", value: "112,000", icon: <Coins size={20} />, trend: { value: "+28%", isPositive: true }, color: "accent" },
        { title: "النقاط المستبدلة", value: "74,500", icon: <RefreshCw size={20} />, trend: { value: "+30%", isPositive: true }, color: "primary" },
        { title: "المكافآت المستبدلة", value: "610", icon: <Gift size={20} />, trend: { value: "+15%", isPositive: true }, color: "secondary" },
        { title: "الحملات المرسلة", value: "12", icon: <Megaphone size={20} />, trend: { value: "+2", isPositive: true }, color: "accent" },
        { title: "معدل تكرار الشراء", value: "52%", icon: <TrendingUp size={20} />, trend: { value: "+1%", isPositive: true }, color: "primary" },
        { title: "الفروع النشطة", value: "3", icon: <MapPin size={20} />, trend: { value: "+1", isPositive: true }, color: "secondary" },
      ],
      recentCustomers: [
        { name: "علي الشمري", phone: "055****219", points: 890, tier: "VIP", date: "منذ دقيقتين" },
        { name: "مريم العلي", phone: "053****743", points: 410, tier: "Gold", date: "منذ 9 دقائق" },
        { name: "سلمان فيصل", phone: "059****112", points: 120, tier: "Silver", date: "منذ 22 دقيقة" },
      ],
      transactions: [
        { customer: "منيرة عبد الله", type: "كسب نقاط", amount: "+125 نقطة", detail: "عملية شراء بـ 125 ريال", branch: "فرع السليمانية", time: "منذ دقيقة" },
        { customer: "فهد الدوسري", type: "استبدال نقاط", amount: "-300 نقطة", detail: "وجبة مجانية لشخصين", branch: "فرع الروضة", time: "منذ 8 دقائق" },
        { customer: "تركي الحربي", type: "كسب نقاط", amount: "+45 نقطة", detail: "عملية شراء بـ 45 ريال", branch: "فرع السليمانية", time: "منذ 17 دقيقة" },
      ],
      bestRewards: [
        { name: "وجبة برجر مجانية", cost: "150 نقطة", redemptions: 280 },
        { name: "خصم 25% من الفاتورة", cost: "250 نقطة", redemptions: 210 },
        { name: "طبق مقبلات مجاني", cost: "90 نقطة", redemptions: 120 },
      ],
      chartPath: "M0,90 Q25,70 50,55 T100,40 T150,25 T200,30 T250,15 T300,5",
    },
    supermarket_hay: {
      kpis: [
        { title: "إجمالي العملاء", value: "8,900", icon: <Users size={20} />, trend: { value: "+25%", isPositive: true }, color: "primary" },
        { title: "العملاء النشطون", value: "6,400", icon: <UserCheck size={20} />, trend: { value: "+21%", isPositive: true }, color: "secondary" },
        { title: "النقاط المصدرة", value: "520,000", icon: <Coins size={20} />, trend: { value: "+35%", isPositive: true }, color: "accent" },
        { title: "النقاط المستبدلة", value: "410,000", icon: <RefreshCw size={20} />, trend: { value: "+40%", isPositive: true }, color: "primary" },
        { title: "المكافآت المستبدلة", value: "1,240", icon: <Gift size={20} />, trend: { value: "+18%", isPositive: true }, color: "secondary" },
        { title: "الحملات المرسلة", value: "15", icon: <Megaphone size={20} />, trend: { value: "+3", isPositive: true }, color: "accent" },
        { title: "معدل تكرار الشراء", value: "78%", icon: <TrendingUp size={20} />, trend: { value: "+6%", isPositive: true }, color: "primary" },
        { title: "الفروع النشطة", value: "4", icon: <MapPin size={20} />, trend: { value: "0%", isPositive: true }, color: "secondary" },
      ],
      recentCustomers: [
        { name: "عبد الرحمن المطيري", phone: "054****654", points: 1540, tier: "VIP", date: "منذ دقيقة" },
        { name: "نورة الجبير", phone: "050****321", points: 640, tier: "Gold", date: "منذ 5 دقائق" },
        { name: "ماجد السديري", phone: "056****765", points: 320, tier: "Silver", date: "منذ 11 دقيقة" },
      ],
      transactions: [
        { customer: "سارة خالد", type: "كسب نقاط", amount: "+345 نقطة", detail: "مشتريات بقيمة 345 ريال", branch: "فرع المروج", time: "منذ 3 دقائق" },
        { customer: "محمد العتيق", type: "استبدال نقاط", amount: "+500 نقطة", detail: "استرداد نقدي 50 ريال خصم", branch: "فرع الصحافة", time: "منذ 19 دقيقة" },
        { customer: "فيصل عبد العزيز", type: "كسب نقاط", amount: "+190 نقطة", detail: "مشتريات بقيمة 190 ريال", branch: "فرع المروج", time: "منذ 24 دقيقة" },
      ],
      bestRewards: [
        { name: "قسيمة شرائية بقيمة 50 ريال", cost: "500 نقطة", redemptions: 640 },
        { name: "قسيمة شرائية بقيمة 20 ريال", cost: "220 نقطة", redemptions: 430 },
        { name: "عضوية التوصيل المجاني للمنزل", cost: "300 نقطة", redemptions: 170 },
      ],
      chartPath: "M0,95 Q25,85 50,60 T100,50 T150,30 T200,20 T250,12 T300,3",
    },
  };

  const currentData = dashboardData[business] || dashboardData.cafe_noqta;

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      {/* Integrations Banner Alert */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div className="flex flex-col text-right">
            <h4 className="text-xs font-bold text-text-primary">مستعد للربط والتكامل التقني لاحقاً!</h4>
            <p className="text-[10px] text-text-secondary">
              تم إعداد الواجهات لتسهيل ربط برنامج ولائك مع أنظمة كاشير POS، متجر سلة وزد، أو الواتساب لاحقاً.
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Badge variant="primary" className="text-[9px] font-black">
            المرحلة الأولى: واجهات تفاعلية
          </Badge>
        </div>
      </div>

      {/* Page Header */}
      <PageHeader
        title="نظرة عامة على الأداء"
        description="تابع مؤشرات نمو العملاء وحركات النقاط والمكافآت ببرنامج الولاء الخاص بمتجرك."
        breadcrumbs={["لوحة التحكم", "الرئيسية"]}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentData.kpis.map((kpi: any, idx: number) => (
          <StatCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            color={kpi.color}
          />
        ))}
      </div>

      {/* Middle row: Chart & Best Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Card */}
        <Card className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-text-primary">نمو قاعدة العملاء</h3>
              <span className="text-[10px] text-text-secondary">معدل التسجيل اليومي والأسبوعي خلال الشهر الحالي</span>
            </div>
            <Badge variant="success">
              <span className="flex items-center gap-1 font-bold text-[9px]">
                <ArrowUpRight size={10} />
                <span>+24% نمو متزايد</span>
              </span>
            </Badge>
          </div>
          
          {/* Simulated chart using SVG */}
          <div className="relative w-full h-56 bg-bg-base/30 rounded-xl border border-border-base/50 flex items-end p-2 overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full text-primary"
              viewBox="0 0 300 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3" />
              
              {/* Filled Path */}
              <path
                d={`${currentData.chartPath} L300,100 L0,100 Z`}
                fill="url(#chartGrad)"
                className="transition-all duration-700"
              />
              {/* Line Path */}
              <path
                d={currentData.chartPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[9px] text-text-secondary font-bold">
              <span>الأسبوع 1</span>
              <span>الأسبوع 2</span>
              <span>الأسبوع 3</span>
              <span>الأسبوع 4</span>
            </div>
          </div>
        </Card>

        {/* Best Rewards Card */}
        <Card className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex flex-col border-b border-border-base pb-3">
            <h3 className="text-sm font-bold text-text-primary">أكثر المكافآت استبدالاً</h3>
            <span className="text-[10px] text-text-secondary">الهدايا الأكثر طلباً من قبل عملائك</span>
          </div>

          <div className="flex flex-col gap-3">
            {currentData.bestRewards.map((reward: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl border border-border-base/70 bg-bg-base/30 text-right hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-primary">{reward.name}</span>
                  <span className="text-[10px] text-text-secondary">تكلفة الاستبدال: {reward.cost}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-primary">{reward.redemptions}</span>
                  <span className="text-[8px] text-text-secondary font-bold">عملية استبدال</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row: Recent Customers & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers Card */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-base pb-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-text-primary">آخر المنضمين للبرنامج</h3>
              <span className="text-[10px] text-text-secondary">أحدث العملاء المسجلين في نظام ولائك</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {currentData.recentCustomers.map((cust: any, idx: number) => {
              const tierColors: Record<string, string> = {
                Bronze: "primary",
                Silver: "secondary",
                Gold: "accent",
                VIP: "danger",
              };
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-text-primary">
                      {cust.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-xs font-bold text-text-primary">{cust.name}</span>
                      <span className="text-[10px] text-text-secondary font-mono">{cust.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-0.5 text-xs">
                      <span className="font-extrabold text-text-primary">{cust.points} نقطة</span>
                      <Badge variant={tierColors[cust.tier] as any} className="text-[8px] py-0 px-1.5 font-bold">
                        {cust.tier}
                      </Badge>
                    </div>
                    <span className="text-[9px] text-text-secondary/70 shrink-0 font-medium">{cust.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Transactions Card */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-base pb-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-text-primary">العمليات الأخيرة</h3>
              <span className="text-[10px] text-text-secondary">سجل عمليات النقاط المكتسبة والمستبدلة حياً</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {currentData.transactions.map((tx: any, idx: number) => {
              const isEarn = tx.type === "كسب نقاط";
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border-base/40 bg-bg-base/20 hover:bg-bg-base/50 transition-colors">
                  <div className="flex flex-col gap-0.5 text-right">
                    <span className="text-xs font-bold text-text-primary">{tx.customer}</span>
                    <span className="text-[10px] text-text-secondary">
                      {tx.detail} | {tx.branch}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 text-xs shrink-0">
                    <span className={`font-black ${isEarn ? "text-emerald-600" : "text-rose-600"}`}>
                      {tx.amount}
                    </span>
                    <span className="text-[9px] text-text-secondary/70 font-medium">{tx.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

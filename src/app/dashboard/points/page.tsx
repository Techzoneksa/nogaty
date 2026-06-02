"use client";

import React, { useState } from "react";
/* lucide-react removed - using inline SVGs */

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Badge } from "@/components/Badge";

export default function PointsSettingsPage() {
  const [pointsPerRiyal, setPointsPerRiyal] = useState("1");
  const [pointsValue, setPointsValue] = useState("10"); // 10 points = 1 SAR
  const [minRedeem, setMinRedeem] = useState("100");
  const [expiry, setExpiry] = useState("12");

  const [allBranches, setAllBranches] = useState(true);
  const [welcomePoints, setWelcomePoints] = useState(true);
  const [welcomeAmount, setWelcomeAmount] = useState("50");
  const [birthdayPoints, setBirthdayPoints] = useState(false);
  const [birthdayAmount, setBirthdayAmount] = useState("100");

  const [happyHour, setHappyHour] = useState(false);
  const [happyHourMultiplier, setHappyHourMultiplier] = useState("2");

  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn relative">
      {/* Toast Notice */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold py-3 px-6 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-emerald-500 animate-slideDown">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>تم حفظ إعدادات نظام النقاط بنجاح!</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="إعدادات وقواعد احتساب النقاط"
        description="حدد القوانين الحاكمة لتجميع واستبدال النقاط وصلاحيتها وتفعيل الهدايا الترحيبية ونقاط المناسبات الخاصة."
        breadcrumbs={["لوحة التحكم", "نظام النقاط"]}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isLoading}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}
          >
            حفظ التغييرات
          </Button>
        }
      />

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Core Point Rules */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Section 1: Core Rules */}
          <Card className="bg-white flex flex-col gap-5 p-6">
            <div className="flex items-center gap-2 border-b border-border-base pb-3">
              <svg className="w-[18px] h-[18px] text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-sm font-bold text-text-primary">القواعد الأساسية لاكتساب واسترداد النقاط</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              <Input
                label="النقاط المكتسبة مقابل كل 1 ريال سعودي"
                type="number"
                value={pointsPerRiyal}
                onChange={(e) => setPointsPerRiyal(e.target.value)}
                helperText="مثال: 1 يعني أن شراء بقيمة 50 ريال يعطي 50 نقطة"
                required
              />
              <Input
                label="معادلة الخصم (عدد النقاط المساوية لـ 1 ريال خصم)"
                type="number"
                value={pointsValue}
                onChange={(e) => setPointsValue(e.target.value)}
                helperText="مثال: 10 نقاط تساوي خصم بقيمة 1 ريال"
                required
              />
              <Input
                label="الحد الأدنى للنقاط لبدء استبدال المكافآت"
                type="number"
                value={minRedeem}
                onChange={(e) => setMinRedeem(e.target.value)}
                helperText="مثال: يجب أن يمتلك العميل 100 نقطة على الأقل لاستبدال المكافأة"
                required
              />
              <Select
                label="مدة صلاحية النقاط المكتسبة"
                options={[
                  { value: "3", label: "3 أشهر" },
                  { value: "6", label: "6 أشهر" },
                  { value: "12", label: "12 شهر (سنة واحدة)" },
                  { value: "24", label: "24 شهر (سنتين)" },
                  { value: "never", label: "صلاحية مفتوحة (لا تنتهي أبداً)" },
                ]}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2 bg-primary-light/30 border border-primary/20 p-3.5 rounded-xl mt-1">
              <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div className="flex flex-col text-right gap-0.5">
                <span className="text-[11px] font-bold text-text-primary">حسبة استرداد النقاط المبسطة:</span>
                <span className="text-[10px] text-text-secondary leading-relaxed">
                  بناءً على إعداداتك: كسب 1,000 نقطة يتطلب إنفاق {Number(pointsPerRiyal) ? (1000 / Number(pointsPerRiyal)).toFixed(0) : "0"} ريال، وقيمتها النقدية في الخصم تساوي {Number(pointsValue) ? (1000 / Number(pointsValue)).toFixed(0) : "0"} ريال (معدل عائد ولاء {(Number(pointsValue) && Number(pointsPerRiyal)) ? ((1 / Number(pointsValue)) * Number(pointsPerRiyal) * 100).toFixed(1) : "0"}%).
                </span>
              </div>
            </div>
          </Card>

          {/* Section 2: Bonuses */}
          <Card className="bg-white flex flex-col gap-5 p-6">
            <div className="flex items-center gap-2 border-b border-border-base pb-3">
              <svg className="w-[18px] h-[18px] text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              <h3 className="text-sm font-bold text-text-primary">الهدايا الترحيبية والمناسبات</h3>
            </div>

            <div className="flex flex-col gap-5 text-right">
              {/* Welcome points */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl border border-border-base/70 bg-bg-base/30">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-text-primary">تفعيل نقاط الترحيب عند تسجيل العميل لأول مرة</label>
                  <span className="text-[10px] text-text-secondary">يحصل عليها العميل مباشرة بمجرد اشتراكه في بطاقة الولاء</span>
                </div>
                <div className="flex items-center gap-4">
                  {welcomePoints && (
                    <Input
                      type="number"
                      value={welcomeAmount}
                      onChange={(e) => setWelcomeAmount(e.target.value)}
                      className="w-24 text-center text-xs font-bold"
                      placeholder="50"
                    />
                  )}
                  <input
                    type="checkbox"
                    checked={welcomePoints}
                    onChange={(e) => setWelcomePoints(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-border-base accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Birthday points */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl border border-border-base/70 bg-bg-base/30">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-text-primary">تفعيل نقاط هدية يوم الميلاد للعميل</label>
                  <span className="text-[10px] text-text-secondary">تُرسل تلقائياً للعميل كهدية ولاء في يوم ميلاده لزيارة المتجر</span>
                </div>
                <div className="flex items-center gap-4">
                  {birthdayPoints && (
                    <Input
                      type="number"
                      value={birthdayAmount}
                      onChange={(e) => setBirthdayAmount(e.target.value)}
                      className="w-24 text-center text-xs font-bold"
                      placeholder="100"
                    />
                  )}
                  <input
                    type="checkbox"
                    checked={birthdayPoints}
                    onChange={(e) => setBirthdayPoints(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-border-base accent-primary cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Settings Status */}
          <Card className="bg-white flex flex-col gap-4 p-5">
            <h3 className="text-xs font-bold text-text-primary border-b border-border-base pb-2">نطاق تطبيق القواعد</h3>
            
            <div className="flex items-center justify-between gap-4 p-2 text-right">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-text-primary">التطبيق في جميع الفروع</label>
                <span className="text-[9px] text-text-secondary">إذا تم تفعيله، ستعمل نفس القواعد في كل الفروع</span>
              </div>
              <input
                type="checkbox"
                checked={allBranches}
                onChange={(e) => setAllBranches(e.target.checked)}
                className="w-5 h-5 rounded-lg border-border-base accent-primary cursor-pointer"
              />
            </div>

            <div className="text-[10px] text-text-secondary leading-relaxed bg-bg-base p-3 rounded-xl border border-border-base">
              مستقبلاً يمكنك تعطيل هذا الخيار لتعيين قواعد مختلفة ونسب خصم متغيرة لفروع معينة أو فروع المطار/المواسم.
            </div>
          </Card>

          {/* Sector-specific rule simulation */}
          <Card className="bg-white flex flex-col gap-4 p-5">
            <div className="flex flex-col">
              <h3 className="text-xs font-bold text-text-primary border-b border-border-base pb-2">قواعد مخصصة (ساعات الذروة)</h3>
              <span className="text-[9px] text-text-secondary">مضاعفة النقاط لزيادة المبيعات في أوقات محددة</span>
            </div>

            <div className="flex items-center justify-between gap-4 p-2 text-right">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-text-primary">نقاط مضاعفة (ساعة السعادة)</label>
                <span className="text-[9px] text-text-secondary">تفعيل مضاعف نقاط تلقائي في أوقات الركود اليومي</span>
              </div>
              <input
                type="checkbox"
                checked={happyHour}
                onChange={(e) => setHappyHour(e.target.checked)}
                className="w-5 h-5 rounded-lg border-border-base accent-primary cursor-pointer"
              />
            </div>

            {happyHour && (
              <div className="flex flex-col gap-2 p-2.5 rounded-xl border border-secondary/20 bg-secondary-light/35 text-right animate-fadeIn">
                <Input
                  label="مضاعف النقاط"
                  type="number"
                  value={happyHourMultiplier}
                  onChange={(e) => setHappyHourMultiplier(e.target.value)}
                  placeholder="2"
                  className="w-full text-xs font-bold"
                />
                <span className="text-[9px] text-secondary-dark font-bold">
                  * سيحصل العملاء على نقاط مضاعفة (ضعفين) تلقائياً.
                </span>
              </div>
            )}
          </Card>
        </div>
      </form>
    </div>
  );
}

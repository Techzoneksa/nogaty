"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LoyaltyCard } from "@/components/LoyaltyCard";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [businessName, setBusinessName] = useState("كافيه قهوتنا");
  const [businessType, setBusinessType] = useState("cafe");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#14B8A6");
  
  const [branchName, setBranchName] = useState("فرع العليا الرئيسي");
  const [city, setCity] = useState("الرياض");

  const [pointsPerRiyal, setPointsPerRiyal] = useState("1");
  const [pointsExpiry, setPointsExpiry] = useState("12");

  const [rewardName, setRewardName] = useState("كوب قهوة مجاني");
  const [rewardPoints, setRewardPoints] = useState("100");

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Finalize setup
      router.push("/dashboard");
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepsInfo = [
    { num: 1, title: "هوية النشاط" },
    { num: 2, title: "الفرع الأول" },
    { num: 3, title: "نظام النقاط" },
    { num: 4, title: "المكافأة الأولى" },
    { num: 5, title: "معاينة البطاقة" },
  ];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans py-8 px-4 sm:px-6 select-none">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-primary tracking-tight">nogaty</span>
            <span className="text-[10px] text-text-secondary font-bold -mt-1">
              بواسطة Jad Cloud
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-text-primary text-center">
            تهيئة برنامج الولاء الأول لعلامتك التجارية
          </h1>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between max-w-2xl mx-auto w-full bg-white border border-border-base rounded-2xl p-4 shadow-xs">
          {stepsInfo.map((s, idx) => {
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? "bg-primary" : "bg-border-base"
                    }`}
                  />
                )}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => setStep(s.num)}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                      isCompleted
                        ? "bg-primary border-primary text-white"
                        : isActive
                        ? "bg-white border-primary text-primary ring-2 ring-primary/20 font-bold"
                        : "bg-white border-border-base text-text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      isActive ? "text-primary" : "text-text-secondary"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Wizard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Step Details */}
          <div className="lg:col-span-7">
            <Card className="p-6 md:p-8 bg-white flex flex-col gap-6">
              {/* Step Title */}
              <div className="flex items-center gap-3 border-b border-border-base pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-light/50 text-primary flex items-center justify-center font-black">
                  {step}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-secondary font-bold">الخطوة الحالية</span>
                  <h2 className="text-base font-bold text-text-primary">
                    {stepsInfo[step - 1].title}
                  </h2>
                </div>
              </div>

              {/* Step Forms */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="اسم العلامة التجارية / المنشأة"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                  <Select
                    label="تصنيف النشاط"
                    options={[
                      { value: "cafe", label: "كافيه / مقهى" },
                      { value: "restaurant", label: "مطعم / مأكولات" },
                      { value: "supermarket", label: "سوبرماركت / بقالة" },
                      { value: "other", label: "أخرى" },
                    ]}
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="اللون الأساسي للبطاقة"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 p-1 cursor-pointer"
                    />
                    <Input
                      label="اللون الثانوي للبطاقة"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-10 p-1 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="اسم الفرع الأول"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="مثال: فرع العليا الرئيسي"
                    required
                  />
                  <Input
                    label="المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: الرياض"
                    required
                  />
                  <p className="text-[11px] text-text-secondary leading-relaxed bg-bg-base/50 p-3 rounded-xl border border-border-base">
                    * يمكنك لاحقاً إضافة فروع متعددة وتفصيلية، وربط نقاط العملاء في فروع مختلفة من لوحة الفروع.
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="عدد النقاط مقابل كل 1 ريال شراء"
                    type="number"
                    value={pointsPerRiyal}
                    onChange={(e) => setPointsPerRiyal(e.target.value)}
                    helperText="كم نقطة يحصل عليها العميل مقابل إنفاق 1 ريال؟"
                    required
                  />
                  <Select
                    label="صلاحية نقاط الولاء للعملاء"
                    options={[
                      { value: "3", label: "3 أشهر" },
                      { value: "6", label: "6 أشهر" },
                      { value: "12", label: "12 شهر (سنة)" },
                      { value: "24", label: "24 شهر (سنتين)" },
                      { value: "never", label: "لا تنتهي الصلاحية أبداً" },
                    ]}
                    value={pointsExpiry}
                    onChange={(e) => setPointsExpiry(e.target.value)}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="اسم المكافأة الأولى"
                    value={rewardName}
                    onChange={(e) => setRewardName(e.target.value)}
                    placeholder="مثال: مشروب مجاني، خصم 20%"
                    helperText="أول جائزة يستطيع العميل استبدالها بنقاطه"
                    required
                  />
                  <Input
                    label="النقاط المطلوبة للاستبدال"
                    type="number"
                    value={rewardPoints}
                    onChange={(e) => setRewardPoints(e.target.value)}
                    placeholder="مثال: 100"
                    required
                  />
                </div>
              )}

              {step === 5 && (
                <div className="flex flex-col gap-4 text-right">
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-bold">كل شيء جاهز للبدء!</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    تمت تهيئة الإعدادات المبدئية لنظام الولاء الخاص بك بنجاح. بطاقتك الرقمية تظهر الآن بالشكل المقابل. اضغط على **إنهاء وتفعيل** للدخول إلى لوحة التحكم والبدء في إضافة العملاء وإرسال المكافآت.
                  </p>
                </div>
              )}

              {/* Wizard Nav buttons */}
              <div className="flex items-center justify-between border-t border-border-base pt-5 mt-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handlePrev}
                  disabled={step === 1}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  السابق
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  className="flex-row-reverse"
                  icon={
                    step === totalSteps ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    )
                  }
                >
                  {step === totalSteps ? "إنهاء وتفعيل برنامج الولاء" : "التالي ومتابعة"}
                </Button>
              </div>
            </Card>
          </div>

          {/* Real-time Loyalty Card Preview Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-bold text-text-secondary text-right">
              معاينة فورية لبطاقة ولاء عميلك
            </span>
            <div className="bg-white border border-border-base rounded-2xl p-5 shadow-xs flex flex-col items-center justify-center gap-6">
              <div className="w-full">
                <LoyaltyCard
                  businessName={businessName}
                  customerName="محمد عبد الله صالح"
                  phone="+966 50 **** 129"
                  points={step >= 4 ? 120 : 0}
                  tier={step >= 4 ? "Gold" : "Bronze"}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </div>

              {/* Interactive simulated badge updates based on onboarding steps */}
              <div className="w-full border-t border-border-base pt-4 flex flex-col gap-2.5 text-xs text-right">
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">الفرع الرئيسي:</span>
                  <span className="text-text-primary font-bold">
                    {branchName} ({city})
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">معادلة احتساب النقاط:</span>
                  <span className="text-text-primary font-bold">
                    1 ريال = {pointsPerRiyal} نقطة
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-text-secondary">المكافأة الأولى:</span>
                  <span className="text-primary font-bold">
                    {rewardName} ({rewardPoints} نقطة)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

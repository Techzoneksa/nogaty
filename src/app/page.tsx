"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Coffee,
  Utensils,
  ShoppingBag,
  Coins,
  Gift,
  Megaphone,
  TrendingUp,
  MapPin,
  Smartphone,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  ChevronLeft,
  Users,
} from "lucide-react";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function LandingPage() {
  const [selectedSector, setSelectedSector] = useState<"cafe" | "restaurant" | "supermarket">("cafe");
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [pricingCycle, setPricingCycle] = useState<"monthly" | "yearly">("monthly");

  const sectorData = {
    cafe: {
      businessName: "كافيه نُقطة",
      points: 150,
      tier: "Gold" as const,
      primaryColor: "#0F766E",
      secondaryColor: "#14B8A6",
      desc: "يحصل العملاء على نقطة لكل 1 ريال. ويستبدلونها بمشروب مجاني عند جمع 100 نقطة.",
    },
    restaurant: {
      businessName: "مطعم مَذاق",
      points: 320,
      tier: "VIP" as const,
      primaryColor: "#2563EB",
      secondaryColor: "#3B82F6",
      desc: "نظام مستويات مرن يُكافئ محبي الوجبات السريعة والعوائل، مع عروض حصرية للـ VIP.",
    },
    supermarket: {
      businessName: "سوبرماركت الحي",
      points: 85,
      tier: "Bronze" as const,
      primaryColor: "#D97706",
      secondaryColor: "#F59E0B",
      desc: "مثالي للمشتريات اليومية والأسبوعية، تجميع نقاط ذكي سريع واسترداد نقدي فوري.",
    },
  };

  const currentSector = sectorData[selectedSector];

  // Pricing Data
  const pricingPlans = [
    {
      name: "Starter (البداية)",
      desc: "للمتاجر الفردية والأنشطة الناشئة",
      monthlyPrice: 199,
      yearlyPrice: 149,
      features: [
        "حتى 500 عميل مسجل",
        "فرع واحد فقط",
        "نظام النقاط والمكافآت الأساسي",
        "تقارير بسيطة",
        "دعم عبر البريد الإلكتروني",
      ],
      cta: "ابدأ مجاناً",
      popular: false,
    },
    {
      name: "Growth (النمو)",
      desc: "للأنشطة المتوسطة التي تتطلع للنمو",
      monthlyPrice: 399,
      yearlyPrice: 299,
      features: [
        "حتى 3,000 عميل مسجل",
        "حتى 3 فروع نشطة",
        "حملات تسويقية ذكية",
        "تقارير متكاملة ونسب الولاء",
        "دعم فني سريع (واتساب)",
        "قابل للربط المستقبلي مع سلة وزد",
      ],
      cta: "ابدأ تجربتك المجانية",
      popular: true,
    },
    {
      name: "Pro (المحترفين)",
      desc: "للمجموعات والعلامات التجارية الكبرى",
      monthlyPrice: 799,
      yearlyPrice: 599,
      features: [
        "عملاء بلا حدود",
        "فروع بلا حدود",
        "أدوات ربط خارجية ومطورة APIs",
        "تخصيص الهوية بشكل كامل",
        "حملات WhatsApp و SMS متقدمة",
        "مدير حساب مخصص",
      ],
      cta: "تواصل معنا",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border-base z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary tracking-tight select-none">nogaty</span>
              <span className="text-[10px] text-text-secondary font-bold -mt-1 select-none">
                بواسطة Jad Cloud
              </span>
            </div>
            {/* Nav links Desktop */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-text-secondary">
              <a href="#features" className="hover:text-primary transition-colors">المميزات</a>
              <a href="#sectors" className="hover:text-primary transition-colors">القطاعات</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">كيف يعمل؟</a>
              <a href="#pricing" className="hover:text-primary transition-colors">الأسعار</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">دخول</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" className="shadow-xs">ابدأ الآن</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 border-b border-border-base bg-gradient-to-b from-white via-bg-base to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-right gap-6">
              <div className="inline-flex items-center gap-1.5 bg-primary-light/50 border border-primary/20 text-primary rounded-full px-3 py-1 text-xs font-bold w-fit mx-auto lg:mx-0">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span>إطلاق النسخة التجريبية الأولى 🚀</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-tight lg:leading-[1.15]">
                حوّل عملاءك الدائمين إلى <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  مصدر نمو مستمر
                </span>
              </h1>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                **nogaty** من **Jad Cloud** هو نظام ولاء SaaS متكامل يساعد المطاعم والكافيهات والسوبرماركتات على إدارة النقاط، المكافآت، الحملات التسويقية، وزيادة تكرار الشراء بسهولة مطلقة عبر الموبايل أولاً.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mt-2">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                    جرّب لوحة التحكم
                  </Button>
                </Link>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                    شاهد كيف يعمل
                  </Button>
                </a>
              </div>
            </div>

            {/* Interactive Card Mockup Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6">
              {/* Sector selector buttons */}
              <div className="flex items-center bg-white p-1.5 border border-border-base rounded-2xl shadow-xs gap-1">
                <button
                  onClick={() => setSelectedSector("cafe")}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === "cafe"
                      ? "bg-secondary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Coffee size={14} />
                  <span>كافيه</span>
                </button>
                <button
                  onClick={() => setSelectedSector("restaurant")}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === "restaurant"
                      ? "bg-primary text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Utensils size={14} />
                  <span>مطعم</span>
                </button>
                <button
                  onClick={() => setSelectedSector("supermarket")}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === "supermarket"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>سوبرماركت</span>
                </button>
              </div>

              {/* Dynamic Loyalty Card rendering */}
              <div className="w-full max-w-sm transition-all duration-500 transform hover:scale-[1.03]">
                <LoyaltyCard
                  businessName={currentSector.businessName}
                  customerName="أحمد محمد صالح"
                  phone="+966 50 **** 921"
                  points={currentSector.points}
                  tier={currentSector.tier}
                  primaryColor={currentSector.primaryColor}
                  secondaryColor={currentSector.secondaryColor}
                />
              </div>

              <div className="bg-white/80 backdrop-blur-xs border border-border-base rounded-2xl p-4 text-center max-w-xs text-xs text-text-secondary font-medium leading-relaxed shadow-xs">
                {currentSector.desc}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Points Calculator */}
      <section className="py-12 bg-white border-b border-border-base">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-primary text-xs font-bold tracking-wider">احسب فائدتك مباشرة</span>
            <h2 className="text-xl md:text-2xl font-black text-text-primary">
              كم نقطة سيكتسبها عميلك؟
            </h2>
          </div>
          
          <div className="bg-bg-base border border-border-base p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-2xl mx-auto w-full text-right shadow-xs">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-text-primary">مبلغ عملية الشراء (بالريال السعودي):</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-border-base rounded-xl py-2 px-3 pl-12 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute left-3 text-xs font-bold text-text-secondary">ريال</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white border border-border-base rounded-xl p-4 md:w-56 justify-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-accent">
                <Coins size={20} />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-2xl font-black text-text-primary">{calcAmount}</span>
                <span className="text-[10px] text-text-secondary font-bold">نقطة ولاء مكتسبة</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            * الافتراض هو 1 ريال = 1 نقطة. يمكنك تعديل هذه القواعد تماماً من لوحة تحكم منشأتك لتناسب هامش ربحك.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-bg-base/30 border-b border-border-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">مميزات تفوق التوقعات</span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              كل ما تحتاجه لبناء برنامج ولاء احترافي
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              صممنا nogaty ليعطيك القوة والسهولة التي تتطلع لها لزيادة أرباحك وعملائك المتكررين.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Coins,
                title: "نظام نقاط مرن",
                desc: "حدد كم نقطة يحصل عليها العميل مقابل كل ريال، ومدة صلاحية النقاط، والحد الأدنى.",
              },
              {
                icon: Gift,
                title: "مكافآت وقسائم ذكية",
                desc: "أنشئ كوبونات خصم، منتجات مجانية، أو خدمات هدايا يستبدلها العميل بنقاطه فوراً.",
              },
              {
                icon: Megaphone,
                title: "حملات تسويقية مبتكرة",
                desc: "أرسل عروض مخصصة لعملائك الخاملين أو نقاط مضاعفة في أوقات الركود عبر القنوات المختلفة.",
              },
              {
                icon: Users,
                title: "قاعدة بيانات عملاء متكاملة",
                desc: "تعرف على عملائك الأكثر شراءً وتاريخ آخر زيارة وتفضيلاتهم وتواصل معهم بكفاءة.",
              },
              {
                icon: TrendingUp,
                title: "تقارير وتحليلات مبسطة",
                desc: "لوحات بيانات حية تظهر معدل العودة، ونسب استهلاك النقاط والمكافآت الأكثر جاذبية.",
              },
              {
                icon: MapPin,
                title: "دعم تعدد الفروع",
                desc: "أضف فروعك المختلفة وتابع أداء موظفيك ونقاط العملاء المصدرة في كل موقع على حدة.",
              },
              {
                icon: Smartphone,
                title: "محسن بالكامل للموبايل",
                desc: "تجربة مستخدم سريعة وخفيفة تسمح للعميل بمتابعة نقاطه من جواله دون تحميل أي تطبيقات.",
              },
              {
                icon: Sparkles,
                title: "معمارية قابلة للربط مستقبلاً",
                desc: "مهيأ تقنياً بالكامل لربطه مستقبلاً مع أنظمة كاشير POS، متجر سلة وزد، أو Shopify.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card hoverEffect key={idx} className="flex flex-col gap-3 p-6 text-right">
                  <div className="w-10 h-10 rounded-xl bg-primary-light/55 text-primary flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary">{feature.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-16 md:py-24 bg-white border-b border-border-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-xs font-bold text-secondary tracking-wider uppercase font-semibold">قطاعات مستهدفة</span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              مصمم خصيصاً ليناسب نمط عملك
            </h2>
            <p className="text-sm text-text-secondary">
              ندعم مختلف الأنشطة التجارية ونقدم تجربة مستخدم تناسب متطلبات زبائنك اليومية.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                colorClass: "text-teal-600 bg-teal-50 border-teal-100",
                title: "المقاهي والكافيهات",
                usecase: "زيادة مبيعات الصباح وتكرار شراء القهوة اليومي.",
                details: "مثل: احصل على كوب قهوة مجاناً بعد شراء 9 أكواب، أو ضاعف نقاط العملاء في أوقات بعد الظهر الهادئة.",
              },
              {
                icon: Utensils,
                colorClass: "text-primary bg-primary-light/40 border-primary-light",
                title: "المطاعم ومحلات الأغذية",
                usecase: "تحويل مرتادي المطعم غير المنتظمين إلى زوار دائمين.",
                details: "مثل: وجبة مجانية مع العائلة بعد جمع 500 نقطة، أو رسالة واتساب آلية بعرض مميز في يوم ميلاد العميل.",
              },
              {
                icon: ShoppingBag,
                colorClass: "text-amber-600 bg-amber-50 border-amber-100",
                title: "السوبرماركت والتموينات",
                usecase: "الولاء المعتمد على القيمة الإجمالية للمشتريات الكبيرة.",
                details: "مثل: استرداد نقدي بقسائم شرائية مساوية للنقاط، عروض أسبوعية خاصة بحاملي بطاقة الولاء الرقمية.",
              },
            ].map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <Card key={idx} className="flex flex-col gap-4 p-6 border-t-4 border-t-primary text-right">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${sector.colorClass}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{sector.title}</h3>
                  <div className="text-xs text-primary font-bold">{sector.usecase}</div>
                  <p className="text-xs text-text-secondary leading-relaxed bg-bg-base/40 p-3 rounded-xl border border-border-base/50">
                    {sector.details}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-bg-base/30 border-b border-border-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-xs font-bold text-primary tracking-wider uppercase">بساطة في التشغيل</span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              رحلة إطلاق برنامج الولاء الخاص بك
            </h2>
            <p className="text-sm text-text-secondary">
              خطوات سريعة وسهلة تفصلك عن امتلاك أحدث تقنيات ولاء العملاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              { step: "1", title: "أنشئ برنامج الولاء", desc: "سجل منشأتك وحدد هويتك البصرية وألوان بطاقة الولاء." },
              { step: "2", title: "أضف العملاء بسهولة", desc: "سجل عملاءك برقم الجوال أو دعهم يسجلون بأنفسهم عبر QR." },
              { step: "3", title: "اجمع النقاط مع الشراء", desc: "يضيف موظفو الفروع النقاط للعميل فوراً بعد كل عملية شراء." },
              { step: "4", title: "أرسل مكافآت وحملات", desc: "أنشئ خصومات وعروضاً لزيادة دافعية الشراء والعودة للمتجر." },
              { step: "5", title: "تابع ونمّ أرباحك", desc: "راقب الإحصائيات والأداء من لوحة التحكم الذكية ونمّ عملك." },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-base shadow-md">
                  {step.step}
                </div>
                <h3 className="text-xs font-bold text-text-primary mt-1">{step.title}</h3>
                <p className="text-[11px] text-text-secondary leading-relaxed max-w-[160px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16 md:py-24 bg-white border-b border-border-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-2">
            <span className="text-xs font-bold text-secondary tracking-wider uppercase">باقات تناسب الجميع</span>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary">
              استثمار بسيط لنمو مستدام
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              خطط أسعار واضحة وشفافة دون أي عمولات خفية.
            </p>

            {/* Cycle Toggle */}
            <div className="flex items-center bg-bg-base border border-border-base p-1 rounded-xl w-fit mx-auto gap-1">
              <button
                onClick={() => setPricingCycle("monthly")}
                className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  pricingCycle === "monthly" ? "bg-white text-primary shadow-xs" : "text-text-secondary"
                }`}
              >
                دفع شهري
              </button>
              <button
                onClick={() => setPricingCycle("yearly")}
                className={`py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pricingCycle === "yearly" ? "bg-white text-primary shadow-xs" : "text-text-secondary"
                }`}
              >
                <span>دفع سنوي</span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  وفر 25%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => {
              const price = pricingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              return (
                <Card
                  key={idx}
                  className={`flex flex-col justify-between p-6 text-right relative ${
                    plan.popular ? "border-2 border-primary shadow-md lg:scale-[1.03]" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 right-6 bg-primary text-white text-[10px] font-black py-1 px-3 rounded-full shadow-xs uppercase tracking-wider">
                      الأكثر طلباً ⭐
                    </span>
                  )}
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-extrabold text-text-primary">{plan.name}</h3>
                      <p className="text-xs text-text-secondary">{plan.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-black text-text-primary">{price}</span>
                      <span className="text-xs text-text-secondary font-bold">ريال سعودي / شهرياً</span>
                    </div>

                    <ul className="flex flex-col gap-2.5 border-t border-border-base pt-4 text-xs text-text-primary">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 font-medium">
                          <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link href="/register">
                      <Button
                        variant={plan.popular ? "primary" : "outline"}
                        className="w-full text-xs font-bold"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white text-center border-b border-border-base relative overflow-hidden select-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            ابدأ برنامج الولاء الخاص بعلامتك التجارية اليوم
          </h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-xl">
            انضم الآن إلى nogaty وابدأ في مكافأة عملائك وبناء علاقات حقيقية طويلة المدى تزيد من مبيعاتك بنسب تصل إلى 35%.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-lg hover:scale-105">
                سجل منشأتك الآن
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
              >
                تصفح لوحة التحكم
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight">nogaty</span>
              <span className="text-[10px] text-slate-500 font-bold -mt-1">
                منصة تابعة لـ Jad Cloud
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              نظام سحابي متكامل ومبتكر لمساعدة المطاعم والمقاهي في بناء ولاء حقيقي لزبائنهم وتكرار زياراتهم لزيادة الأرباح.
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">المنتج</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">المميزات الأساسية</a></li>
              <li><a href="#sectors" className="hover:text-white transition-colors">القطاعات المدعومة</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">خطط الاشتراك</a></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors font-bold text-primary-light">عرض النسخة التجريبية</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">الشركة الأم</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><span className="text-slate-400">Jad Cloud (جد السحابية)</span></li>
              <li><span className="text-slate-500">منظومة حلول سحابية للمتاجر والشركات</span></li>
              <li><a href="#" className="hover:text-white transition-colors">عن الشركة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">القوانين</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتفاقية مستوى الخدمة SLA</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة لـ Jad Cloud.</span>
          <div className="flex gap-4">
            <span className="text-emerald-500 font-semibold select-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>مستضاف بنجاح على Hostinger</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

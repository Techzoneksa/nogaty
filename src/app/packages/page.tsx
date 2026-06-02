"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n/useTranslation";

const businessTypes = [
  { value: "restaurant", label: "مطعم" },
  { value: "cafe", label: "كافيه" },
  { value: "supermarket", label: "سوبرماركت" },
  { value: "other", label: "أخرى" },
];

const packages = [
  {
    id: "basic",
    name: "أساسية",
    price: 99,
    features: ["حتى 500 عميل", "فرع واحد", "تطبيق My Points", "باركود للعملاء", "تقارير أساسية", "3 عروض نشطة"],
  },
  {
    id: "professional",
    name: "احترافية",
    price: 249,
    popular: true,
    features: ["حتى 2,000 عميل", "3 فروع", "تطبيق My Points", "تقارير متقدمة", "10 عروض نشطة", "5 بنرات"],
  },
  {
    id: "advanced",
    name: "متقدمة",
    price: 499,
    features: ["عملاء غير محدود", "فروع غير محدودة", "تقارير شاملة", "عروض غير محدودة", "بنرات غير محدودة", "API مخصص"],
  },
];

export default function PackagesPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("professional");
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    city: "",
    phone: "",
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-bg-base py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">ن</div>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">اختر الباقة المناسبة</h1>
          <p className="text-text-secondary">ابدأ تجربتك في 3 خطوات بسيطة</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step >= s ? "bg-primary text-white" : "bg-gray-200 text-text-secondary"}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <Card className="p-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">اختر الباقة المناسبة</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPackage === pkg.id ? "border-primary bg-primary/5" : "border-border-base hover:border-primary/50"}`}
                  >
                    {pkg.popular && (
                      <div className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">الأكثر طلباً</div>
                    )}
                    <h3 className="font-semibold text-text-primary mb-1">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                      <span className="text-sm text-text-secondary">ر.س/شهر</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-center gap-2">
                          <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep(2)} className="w-full">التالي</Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">بيانات النشاط التجاري</h2>
              <div className="space-y-4">
                <Input label="اسم المنشأة التجارية" placeholder="مثال: كافيه نقطة" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
                <Select label="نوع النشاط" options={businessTypes} placeholder="اختر نوع النشاط" value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} />
                <Input label="اسم المسؤول" placeholder="أدخل اسمك" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />
                <Input label="المدينة" placeholder="مثال: الرياض" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>السابق</Button>
                <Button onClick={() => setStep(3)} className="flex-1">التالي</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">إنشاء الحساب</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-primary block mb-1">رقم الجوال</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-xl text-sm">🇸🇦 +966</span>
                    <input type="tel" placeholder="5xxxxxxxx" className="flex-1 bg-white border border-border-base rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <span className="text-xs text-text-secondary mt-1 block">أدخل رقم الجوال بدون صفر</span>
                </div>
                <Input label="البريد الإلكتروني" type="email" placeholder="example@domain.com" dir="ltr" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <Input label="كلمة المرور" type="password" placeholder="8 أحرف على الأقل" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 mt-1 rounded border-border-base text-primary" />
                  <span className="text-sm text-text-secondary">أوافق على <a href="#" className="text-primary hover:underline">الشروط والأحكام</a></span>
                </label>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 mt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">الباقة المختارة:</span>
                  <span className="font-semibold text-text-primary">{packages.find(p => p.id === selectedPackage)?.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-text-secondary">السعر:</span>
                  <span className="font-bold text-primary text-xl">{packages.find(p => p.id === selectedPackage)?.price} ر.س</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>السابق</Button>
                <Link href="/onboarding" className="flex-1"><Button className="w-full">إنشاء الحساب والدفع</Button></Link>
              </div>
            </>
          )}
        </Card>

        <div className="flex justify-center mt-6">
          <LanguageToggle />
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          لديك حساب بالفعل؟ <Link href="/auth/login" className="text-primary font-medium hover:underline">سجل دخولك</Link>
        </p>
      </div>
    </div>
  );
}
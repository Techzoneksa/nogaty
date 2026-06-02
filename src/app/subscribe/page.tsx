"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Card } from "@/components/Card";

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
    period: "شهرياً",
    features: ["حتى 500 عميل", "فرع واحد", "تطبيق My Points", "باركود للعملاء", "تقارير أساسية"],
  },
  {
    id: "professional",
    name: "احترافية",
    price: 249,
    period: "شهرياً",
    features: ["حتى 2,000 عميل", "3 فروع", "تطبيق My Points", "تقارير متقدمة", "10 عروض نشطة"],
    popular: true,
  },
  {
    id: "advanced",
    name: "متقدمة",
    price: 499,
    period: "شهرياً",
    features: ["عملاء غير محدود", "فروع غير محدودة", "تقارير شاملة", "عروض غير محدودة", "API مخصص"],
  },
];

export default function SubscribePage() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>("professional");
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              ن
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">أنشئ حسابك المجاني</h1>
          <p className="text-text-secondary">ابدأ تجربتك في 3 خطوات بسيطة</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= s ? "bg-primary text-white" : "bg-gray-200 text-text-secondary"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > s ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">اختر الباقة المناسبة</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                        الأكثر طلباً
                      </div>
                    )}
                    <h3 className="font-semibold text-text-primary mb-1">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                      <span className="text-sm text-text-secondary">{pkg.period}</span>
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
              <Button className="w-full" onClick={() => setStep(2)}>التالي</Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">بيانات النشاط التجاري</h2>
              <div className="space-y-4">
                <Input
                  label="اسم المنشأة التجارية"
                  placeholder="مثال: كافيه نقطة"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                />
                <Select
                  label="نوع النشاط"
                  options={businessTypes}
                  placeholder="اختر نوع النشاط"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                />
                <Input
                  label="اسم المسؤول"
                  placeholder="أدخل اسمك"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>السابق</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>التالي</Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-text-primary mb-6">إنشاء الحساب</h2>
              <div className="space-y-4">
                <Input
                  label="رقم الجوال"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="example@domain.com"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                  label="كلمة المرور"
                  type="password"
                  placeholder="8 أحرف على الأقل"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 mt-1 rounded border-border text-primary" />
                  <span className="text-sm text-text-secondary">
                    أوافق على{" "}
                    <a href="#" className="text-primary hover:underline">الشروط والأحكام</a>
                  </span>
                </label>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 mt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">الباقة المختارة:</span>
                  <span className="font-semibold text-text-primary">
                    {packages.find((p) => p.id === selectedPackage)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-text-secondary">السعر:</span>
                  <span className="font-bold text-primary text-xl">
                    {packages.find((p) => p.id === selectedPackage)?.price} ر.س
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>السابق</Button>
                <Link href="/merchant" className="flex-1">
                  <Button className="w-full">إنشاء الحساب والدفع</Button>
                </Link>
              </div>
            </>
          )}
        </Card>

        <p className="text-center text-text-secondary text-sm mt-6">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">سجل دخولك</Link>
        </p>
      </div>
    </div>
  );
}
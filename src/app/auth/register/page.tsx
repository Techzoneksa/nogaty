"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface Package {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  features: string[];
}

const packages: Package[] = [
  {
    id: "basic",
    name: "الأساسية",
    nameEn: "Basic",
    price: 99,
    features: ["Up to 500 customers", "Basic analytics", "Email support"],
  },
  {
    id: "professional",
    name: "الاحترافية",
    nameEn: "Professional",
    price: 249,
    features: ["Up to 2000 customers", "Advanced analytics", "Priority support", "Custom branding"],
  },
  {
    id: "advanced",
    name: "المتقدمة",
    nameEn: "Advanced",
    price: 499,
    features: ["Unlimited customers", "Full analytics", "24/7 support", "API access", "White-label"],
  },
];

const businessTypes = [
  { value: "restaurant", label: "مطعم" },
  { value: "cafe", label: "مقهى" },
  { value: "supermarket", label: "سوبرماركت" },
  { value: "retail", label: "متجر تجزئة" },
  { value: "other", label: "أخرى" },
];

const cities = [
  { value: "riyadh", label: "الرياض" },
  { value: "jeddah", label: "جدة" },
  { value: "makkah", label: "مكة المكرمة" },
  { value: "madinah", label: "المدينة المنورة" },
  { value: "dammam", label: "الدمام" },
  { value: "other", label: "أخرى" },
];

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    router.push("/auth/otp");
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <LanguageToggle />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-text-secondary"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 rounded ${
                    step > s ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6">
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold text-text-primary text-center mb-2">
                اختر الباقة المناسبة
              </h2>
              <p className="text-sm text-text-secondary text-center mb-6">
                اختر الباقة التي تناسب احتياجاتك
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border-base hover:border-primary/50"
                    }`}
                  >
                    <h3 className="font-bold text-lg text-text-primary">{pkg.name}</h3>
                    <p className="text-xs text-text-secondary mb-2">{pkg.nameEn}</p>
                    <p className="text-2xl font-bold text-primary">
                      {pkg.price}
                      <span className="text-sm font-normal text-text-secondary"> ر.س</span>
                    </p>
                    <ul className="mt-3 space-y-1">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-center gap-1">
                          <span className="text-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                disabled={!selectedPackage}
                onClick={handleNext}
              >
                التالي
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-text-primary text-center mb-2">
                معلومات النشاط التجاري
              </h2>
              <p className="text-sm text-text-secondary text-center mb-6">
                أدخل بيانات النشاط التجاري
              </p>

              <div className="space-y-4">
                <Input
                  id="businessName"
                  label="اسم النشاط التجاري"
                  placeholder="أدخل اسم النشاط"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />
                <Select
                  id="businessType"
                  label="نوع النشاط"
                  options={businessTypes}
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                />
                <Input
                  id="ownerName"
                  label="اسم المالك"
                  placeholder="أدخل اسم المالك"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                />
                <Select
                  id="city"
                  label="المدينة"
                  options={cities}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={handleBack}>
                  السابق
                </Button>
                <Button className="flex-1" onClick={handleNext}>
                  التالي
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-text-primary text-center mb-2">
                إنشاء الحساب
              </h2>
              <p className="text-sm text-text-secondary text-center mb-6">
                أدخل بيانات الحساب
              </p>

              <div className="space-y-4">
                <div className="w-full flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-primary">
                    رقم الجوال
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute right-3 text-text-secondary flex items-center gap-1 pointer-events-none">
                      🇸🇦 +966
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="5xxxxxxxx"
                      className="w-full bg-white border border-border-base rounded-xl py-2 pr-16 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <span className="text-xs text-text-secondary">
                    أدخل رقم الجوال بدون صفر
                  </span>
                </div>
                <Input
                  id="email"
                  type="email"
                  label="البريد الإلكتروني"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  id="password"
                  type="password"
                  label="كلمة المرور"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  label="تأكيد كلمة المرور"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={handleBack}>
                  السابق
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  إنشاء الحساب
                </Button>
              </div>
            </>
          )}
        </Card>

        <p className="text-center text-sm text-text-secondary mt-4">
          لديك حساب بالفعل؟{" "}
          <a href="/auth/login" className="text-primary font-medium hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
}
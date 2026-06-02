"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Store, Briefcase } from "lucide-react";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("cafe");
  const [managerName, setManagerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!businessName || !managerName || !phone || !email || !password) {
      setError("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setIsLoading(true);

    // Simulate Register API
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to Onboarding setup page
      router.push("/onboarding");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-lg flex flex-col gap-6 my-8">
        {/* Header/Logo */}
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-3xl font-black text-primary tracking-tight">nogaty</span>
            <span className="text-[10px] text-text-secondary font-bold -mt-0.5">
              بواسطة Jad Cloud
            </span>
          </Link>
        </div>

        {/* Register Card */}
        <Card className="p-6 md:p-8 bg-white flex flex-col gap-5">
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-lg font-bold text-text-primary">إنشاء حساب منشأة جديدة</h2>
            <p className="text-xs text-text-secondary">
              سجل منشأتك الآن وابدأ في بناء برنامج ولاء العملاء الخاص بك خلال دقائق
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 text-xs font-semibold text-right flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="اسم المنشأة / العلامة التجارية"
                type="text"
                placeholder="مثال: كافيه كوب ونقطة"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                icon={<Store size={16} />}
                required
              />
            </div>

            <Select
              label="نوع النشاط التجاري"
              options={[
                { value: "cafe", label: "كافيه / مقهى" },
                { value: "restaurant", label: "مطعم / مأكولات" },
                { value: "supermarket", label: "سوبرماركت / بقالة" },
                { value: "retail", label: "تجارة تجزئة / ملابس" },
                { value: "other", label: "نشاط تجاري آخر" },
              ]}
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            />

            <Input
              label="اسم المسؤول أو المدير"
              type="text"
              placeholder="مثال: عبد الرحمن صالح"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              icon={<User size={16} />}
              required
            />

            <Input
              label="رقم جوال المنشأة"
              type="tel"
              placeholder="05xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone size={16} />}
              required
            />

            <Input
              label="البريد الإلكتروني للمسؤول"
              type="email"
              placeholder="name@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="كلمة المرور للحساب"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                إنشاء الحساب ومتابعة الإعداد
              </Button>
            </div>
          </form>

          {/* Separation line */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border-base"></div>
            <span className="flex-shrink mx-3 text-[10px] text-text-secondary font-bold">
              لديك حساب بالفعل؟
            </span>
            <div className="flex-grow border-t border-border-base"></div>
          </div>

          <Link href="/login" className="w-full text-center">
            <span className="text-xs text-primary font-bold hover:underline">
              تسجيل الدخول إلى حساب منشأتك
            </span>
          </Link>
        </Card>
      </div>
    </div>
  );
}

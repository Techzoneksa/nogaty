"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <LanguageToggle />
        </div>

        <Card className="p-6">
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
                استعادة كلمة المرور
              </h1>
              <p className="text-sm text-text-secondary text-center mb-6">
                أدخل بريدك الإلكتروني أو رقم جوالك لاستعادة كلمة المرور
              </p>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setMethod("email")}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                    method === "email"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  البريد الإلكتروني
                </button>
                <button
                  onClick={() => setMethod("phone")}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                    method === "phone"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  رقم الجوال
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {method === "email" ? (
                  <Input
                    id="email"
                    type="email"
                    label="البريد الإلكتروني"
                    placeholder="example@email.com"
                  />
                ) : (
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
                      />
                    </div>
                    <span className="text-xs text-text-secondary">
                      أدخل رقم الجوال بدون صفر
                    </span>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  إرسال رمز الاستعادة
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  تم إرسال رمز الاستعادة
                </h2>
                <p className="text-sm text-text-secondary">
                  {method === "email"
                    ? "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني"
                    : "تم إرسال رمز التحقق إلى رقم جوالك"}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                محاولة بطريقة أخرى
              </Button>
            </>
          )}

          <p className="text-center text-sm text-text-secondary mt-6">
            تتذكر كلمة المرور؟{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
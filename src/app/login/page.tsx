"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard on successful login
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Header/Logo */}
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-3xl font-black text-primary tracking-tight">nogaty</span>
            <span className="text-[10px] text-text-secondary font-bold -mt-0.5">
              بواسطة Jad Cloud
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="p-6 md:p-8 bg-white flex flex-col gap-5">
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-lg font-bold text-text-primary">تسجيل الدخول إلى لوحة التحكم</h2>
            <p className="text-xs text-text-secondary">
              أدخل بيانات حساب منشأتك لإدارة نظام الولاء والعملاء
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 text-xs font-semibold text-right flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="البريد الإلكتروني للعمل"
              type="email"
              placeholder="example@jadcloud.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Input
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
              تسجيل الدخول
            </Button>
          </form>

          {/* Separation line */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border-base"></div>
            <span className="flex-shrink mx-3 text-[10px] text-text-secondary font-bold">
              ليس لديك حساب؟
            </span>
            <div className="flex-grow border-t border-border-base"></div>
          </div>

          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full">
              إنشاء حساب جديد للمنشأة
            </Button>
          </Link>
        </Card>

        {/* Footer info */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-secondary font-bold">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>اتصال آمن ومحمي بواسطة Jad Cloud</span>
        </div>
      </div>
    </div>
  );
}

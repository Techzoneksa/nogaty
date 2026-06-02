"use client";

import React, { useState } from "react";
import Link from "next/link";
/* lucide-react removed - using inline SVGs */

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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

        {/* Card */}
        <Card className="p-6 md:p-8 bg-white flex flex-col gap-5">
          {!isSubmitted ? (
            <>
              <div className="flex flex-col gap-1 text-center">
                <h2 className="text-lg font-bold text-text-primary">استعادة كلمة المرور</h2>
                <p className="text-xs text-text-secondary">
                  أدخل البريد الإلكتروني للمسؤول وسنرسل لك رابط استعادة كلمة المرور
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="البريد الإلكتروني المسجل"
                  type="email"
                  placeholder="example@jadcloud.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  required
                />

                <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
                  إرسال رابط الاستعادة
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 py-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-primary">تم إرسال الرابط بنجاح</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
                  لقد أرسلنا بريداً إلكترونياً إلى **{email}** يحتوي على تعليمات استعادة الوصول إلى حسابك.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 text-xs font-bold"
                onClick={() => setIsSubmitted(false)}
              >
                إعادة المحاولة ببريد آخر
              </Button>
            </div>
          )}

          {/* Back to Login link */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 text-xs text-primary font-bold hover:underline"
          >
            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            <span>العودة لتسجيل الدخول</span>
          </Link>
        </Card>
      </div>
    </div>
  );
}

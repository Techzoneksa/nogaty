"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
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
                  icon={<Mail size={16} />}
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
                <CheckCircle2 size={24} />
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
            <ArrowRight size={14} />
            <span>العودة لتسجيل الدخول</span>
          </Link>
        </Card>
      </div>
    </div>
  );
}

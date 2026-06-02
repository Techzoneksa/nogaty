"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function OtpPage() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 4 - index).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 4) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      return;
    }

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            أدخل رمز التحقق
          </h1>
          <p className="text-sm text-text-secondary text-center mb-6">
            أرسلنا رمز التحقق إلى رقمك
          </p>

          <div className="bg-primary/5 rounded-xl p-4 mb-6 text-center">
            <p className="text-4xl font-bold text-primary tracking-wider">4821</p>
            <p className="text-xs text-text-secondary mt-1">رمز التحقق</p>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold bg-white border border-border-base rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            ))}
          </div>

          <Button className="w-full" size="lg">
            تحقق
          </Button>

          <div className="mt-4 text-center">
            <button className="text-sm text-primary hover:underline">
              إعادة إرسال الرمز
            </button>
          </div>

          <div className="mt-3 text-center">
            <Link href="/auth/login" className="text-sm text-text-secondary hover:text-primary">
              تغيير رقم الجوال
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-border-base text-center">
            <p className="text-sm text-text-secondary">
              سيتم إرسال رمز التحقق إلى
            </p>
            <p className="text-sm font-medium text-text-primary mt-1">
              🇸🇦 +966 50XXXXXXXX
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
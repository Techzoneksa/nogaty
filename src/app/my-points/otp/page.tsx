"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function OTPPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleSendCode = () => {
    if (phone.length >= 9) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-sm bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        {!otpSent ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary">تسجيل الدخول</h2>
              <p className="text-text-secondary text-sm text-center">
                ادخل رقم جوالك لتسجيل الدخول
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇸🇦</span>
                <span className="text-text-primary font-medium">+966</span>
              </div>
              <Input
                placeholder="5xxxxxxxx"
                helperText="أدخل رقم الجوال بدون صفر"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength={9}
                className="text-lg text-center tracking-wider"
              />
              <Button
                variant="primary"
                size="lg"
                onClick={handleSendCode}
                disabled={phone.length < 9}
              >
                إرسال الرمز
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12.5" />
                  <path d="M22 10.5H2" />
                  <path d="M7 15h0" />
                  <path d="M12 15h0" />
                  <path d="M17 15h0" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary">أدخل رمز التحقق</h2>
              <p className="text-text-secondary text-sm text-center">
                تم إرسال رمز التحقق إلى رقمك
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-5xl font-black text-primary tracking-widest">
                7394
              </div>
              <div className="flex gap-3 direction-rtl">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-16 text-center text-2xl font-bold bg-bg-base border-2 border-border-base rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                ))}
              </div>
              <Button variant="primary" size="lg" className="w-full">
                تحقق
              </Button>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <button className="text-sm text-primary font-medium hover:underline">
                إعادة إرسال الرمز
              </button>
              <button
                className="text-sm text-text-secondary hover:text-text-primary"
                onClick={() => setOtpSent(false)}
              >
                تغيير رقم الجوال
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

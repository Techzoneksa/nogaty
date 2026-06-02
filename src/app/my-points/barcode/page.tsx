"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function BarcodePage() {
  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-16 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/my-points/home">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-xl font-bold text-white">الباركود</h1>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <Card className="bg-white border-0 shadow-xl">
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="w-64 h-64 bg-white p-4 rounded-2xl shadow-inner border-4 border-border-base">
              <div className="w-full h-full bg-gradient-to-br from-text-primary to-text-secondary rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${
                        Math.random() > 0.4 ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-text-primary font-bold text-lg">أحمد محمد</p>
              <p className="text-text-secondary text-sm">رقم العضوية</p>
              <p className="text-primary font-black text-2xl tracking-wider">
                1234567890
              </p>
            </div>

            <div className="bg-accent/10 px-6 py-3 rounded-xl">
              <p className="text-accent font-bold text-sm">اعرض هذا الرمز عند الكاشير</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-6 mt-6">
        <Link href="/my-points/home">
          <Button variant="primary" size="lg" className="w-full">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}

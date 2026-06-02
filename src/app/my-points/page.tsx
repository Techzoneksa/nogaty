"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import LanguageToggle from "@/components/LanguageToggle";

export default function MyPointsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 right-6">
        <LanguageToggle />
      </div>

      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-primary"
              fill="currentColor"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white">My Points</h1>
          <p className="text-white/90 text-lg">نقاطك.. طريقك للفوائد</p>
        </div>

        <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex flex-col gap-4">
            <Link href="/my-points/otp" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                دخول
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full bg-white">
              إنشاء حساب
            </Button>
          </div>
        </Card>
      </div>

      <div className="absolute bottom-10 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

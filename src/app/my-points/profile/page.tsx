"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LanguageToggle from "@/components/LanguageToggle";
import BottomNav from "@/components/my-points/BottomNav";

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
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
          <h1 className="text-xl font-bold text-white">حسابي</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-text-primary">أحمد محمد</h2>
              <p className="text-text-secondary text-sm">عضوية ذهبية</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-4 border-b border-border-base">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1">
                <Input
                  label="الاسم"
                  defaultValue="أحمد محمد"
                  className="bg-bg-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pb-4 border-b border-border-base">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <Input
                  label="رقم الجوال"
                  defaultValue="50 123 4567"
                  readOnly
                  className="bg-bg-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1">
                <Input
                  label="رقم العضوية"
                  defaultValue="1234567890"
                  readOnly
                  className="bg-bg-base"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-primary font-bold text-sm">إشعارات البرامج</p>
                  <p className="text-text-secondary text-xs">عروض ونقاط حديثة</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-all ${
                  notifications ? "bg-primary" : "bg-border-base"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                    notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <p className="text-text-primary font-bold text-sm">اللغة</p>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </Card>

        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onClick={async () => {
            setIsLoggingOut(true);
            try {
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/auth/login");
              router.refresh();
            } catch {
              setIsLoggingOut(false);
            }
          }}
          disabled={isLoggingOut}
          isLoading={isLoggingOut}
        >
          تسجيل الخروج
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}

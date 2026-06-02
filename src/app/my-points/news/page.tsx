"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import BottomNav from "@/components/my-points/BottomNav";

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "منتج جديد: قهوة مختصة",
      description: "ن launches قهوتنا الجديدة بخصم 30% لأول طلب",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "افتتاح فرع جديد",
      description: "متجرنا الجديد في حي النزهة بخصومات حصرية",
      date: "2024-01-15",
    },
  ];

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
          <h1 className="text-xl font-bold text-white">المنتجات الجديدة</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {newsItems.length === 0 ? (
          <Card className="bg-white border-0 shadow-md">
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-text-secondary font-medium">
                لا توجد منتجات جديدة
              </p>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {newsItems.map((item) => (
              <Card key={item.id} hoverEffect className="bg-white border-0 shadow-md">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-text-primary font-bold mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-text-secondary text-xs">{item.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

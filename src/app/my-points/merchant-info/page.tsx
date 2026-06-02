"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import BottomNav from "@/components/my-points/BottomNav";

export default function MerchantInfoPage() {
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
          <h1 className="text-xl font-bold text-white">معلومات المتجر</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-primary"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-text-primary">متجر النموذج</h2>
              <p className="text-text-secondary text-sm">نقاطك.. طريقك للفوائد</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">نبذة عنا</p>
                <p className="text-text-secondary text-sm">
                  متجر رائد في تقديم أفضل المنتجات والخدمات لعملائنا الكرام منذ عام 2020
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">ساعات العمل</p>
                <p className="text-text-secondary text-sm">السبت - الخميس: 9 صباحاً - 10 مساءً</p>
                <p className="text-text-secondary text-sm">الجمعة: 4 مساءً - 10 مساءً</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">اتصل بنا</p>
                <p className="text-primary font-medium text-sm" dir="ltr">+966 50 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">العنوان</p>
                <p className="text-text-secondary text-sm">
                  الرياض، حي النزهة، الرياض، المملكة العربية السعودية
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white border-0 shadow-md">
          <div className="flex flex-col gap-3">
            <p className="text-text-primary font-bold text-sm">تابعنا على</p>
            <div className="flex gap-3">
              <button className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.16-5.126-1.589 2.682-1.704 5.796 0 8.461C10.851 15.616 6.421 20.256 2.182 22.268c-.041.071.081.153.118.241.763.133 1.692.089 2.422-.036.898-.153 1.617-.617 2.287-1.148-.896.024-1.728.59-1.998 1.348-.371-.59-.922-1.007-1.6-1.007-.494 0-.874.42-.993.961-.082.534.24 1.054.74 1.354 1.367-.197.953-2.727.538-3.857-.079-.216-1.1-.82-1.1-.82-.018.037-.051.124.073.195.895.653 1.849.98 2.803 1.085a9.385 9.385 0 01-.217-7.747zm-15.028 13.19c-.288 0-.577-.036-.856-.108 2.505 1.659 5.139 2.715 8.146 2.715 2.68 0 5.238-1.03 7.171-2.764a11.372 11.372 0 01-4.362 2.772c-.288-.035-.587-.062-.888-.062-3.335 0-6.047-2.752-6.047-6.144 0-3.392 2.712-6.144 6.047-6.144 3.335 0 6.047 2.752 6.047 6.144 0 2.75-1.818 5.081-4.353 5.886-.273.082-.568.129-.874.129-3.366 0-6.108-2.751-6.108-6.144 0-3.392 2.742-6.144 6.108-6.144.228 0 .451.016.673.048a6.007 6.007 0 01-4.923-6.022c.257-.594.69-1.151 1.25-1.515a6.033 6.033 0 013.673 0c.56.364.992.921 1.25 1.515.552-.369.985-.919 1.25-1.515a6.033 6.033 0 013.673 0c.56.364.992.921 1.25 1.515.56-.364 1.001-.922 1.25-1.515a6.033 6.033 0 013.673 0c.56.364.992.921 1.25 1.515.56-.364 1.001-.922 1.25-1.515a6.033 6.033 0 013.673 0c.56.364.992.921 1.25 1.515.56-.364 1.001-.922 1.25-1.515a6.033 6.033 0 013.673 0c.56.364.992.921 1.25 1.515.14-.092.256-.206.36-.32z"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-secondary" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}

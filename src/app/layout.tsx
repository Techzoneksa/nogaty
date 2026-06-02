import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "nogaty | نظام نقاط وولاء العملاء من Jad Cloud",
  description: "حوّل عملاءك الدائمين إلى مصدر نمو مستمر. نظام نقاط وولاء للعملاء سهل وسريع ومناسب للمطاعم، الكافيهات، والسوبرماركتات.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${cairo.className} min-h-full flex flex-col bg-bg-base text-text-primary antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
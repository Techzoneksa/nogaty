"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("common.error"));
        setIsLoading(false);
        return;
      }

      router.push(data.redirectUrl || "/");
      router.refresh();
    } catch {
      setError(t("common.error"));
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(t("auth.phoneNotAvailable"));
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <LanguageToggle />
        </div>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            {t("auth.login")}
          </h1>
          <p className="text-sm text-text-secondary text-center mb-6">
            {t("auth.welcomeMessage")}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                loginMethod === "email"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              }`}
            >
              {t("auth.email")}
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                loginMethod === "phone"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              }`}
            >
              {t("auth.phone")}
            </button>
          </div>

          {loginMethod === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <Input
                id="email"
                type="email"
                label={t("auth.email")}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="password"
                type="password"
                label={t("auth.password")}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-left">
                <Link
                  href="/auth/forgot"
                  className="text-sm text-primary hover:underline"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                {t("auth.login")}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="w-full flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-primary">
                  {t("auth.phone")}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute right-3 text-text-secondary flex items-center gap-1 pointer-events-none">
                    🇸🇦 +966
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="5xxxxxxxx"
                    className="w-full bg-white border border-border-base rounded-xl py-2 pr-16 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {t("auth.phoneHint")}
                </span>
              </div>
              <Button type="submit" className="w-full" size="lg">
                {t("auth.sendCode")}
              </Button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-base"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card-base text-text-secondary">
                  {t("auth.orContinueWith")}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border-base rounded-xl hover:bg-gray-50 transition-all" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border-base rounded-xl hover:bg-gray-50 transition-all" type="button">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border-base rounded-xl hover:bg-gray-50 transition-all" type="button">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-text-secondary mt-6">
            {t("auth.noAccount")}{" "}
            <Link href="/auth/register" className="text-primary font-medium hover:underline">
              {t("auth.register")}
            </Link>
          </p>
        </Card>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo:</strong> admin@jadcloud.com / demo1234
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslation } from "@/lib/i18n/useTranslation";

const features = [
  { title: "features.flexiblePoints", desc: "features.flexiblePointsDesc", icon: "⭐" },
  { title: "features.appReady", desc: "features.appReadyDesc", icon: "📱" },
  { title: "features.offersBanners", desc: "features.offersBannersDesc", icon: "🎁" },
  { title: "features.reports", desc: "features.reportsDesc", icon: "📊" },
  { title: "features.barcode", desc: "features.barcodeDesc", icon: "📇" },
  { title: "features.branches", desc: "features.branchesDesc", icon: "🏪" },
];

const sectors = [
  { name: "sectors.restaurants", icon: "🍽️", desc: "sectors.restaurantsDesc" },
  { name: "sectors.cafes", icon: "☕", desc: "sectors.cafesDesc" },
  { name: "sectors.supermarkets", icon: "🛒", desc: "sectors.supermarketsDesc" },
];

const steps = [
  { step: 1, title: "howItWorks.step1Title", desc: "howItWorks.step1Desc" },
  { step: 2, title: "howItWorks.step2Title", desc: "howItWorks.step2Desc" },
  { step: 3, title: "howItWorks.step3Title", desc: "howItWorks.step3Desc" },
  { step: 4, title: "howItWorks.step4Title", desc: "howItWorks.step4Desc" },
];

const plans = [
  {
    name: "pricing.basic",
    price: "٩٩",
    popular: false,
    features: ["pricing.customers500", "pricing.branch1", "pricing.app", "pricing.barcode", "pricing.basicReports", "pricing.offers3"],
  },
  {
    name: "pricing.professional",
    price: "٢٤٩",
    popular: true,
    features: ["pricing.customers2000", "pricing.branches3", "pricing.app", "pricing.barcode", "pricing.advancedReports", "pricing.offers10", "pricing.banners5"],
  },
  {
    name: "pricing.advanced",
    price: "٤٩٩",
    popular: false,
    features: ["pricing.customersUnlimited", "pricing.branchesUnlimited", "pricing.app", "pricing.allReports", "pricing.offersUnlimited", "pricing.bannersUnlimited", "pricing.api"],
  },
];

const faq = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-base">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-base">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ن
              </div>
              <div>
                <span className="font-bold text-lg text-text-primary">{t("brand")}</span>
                <span className="text-xs text-text-secondary block">{t("byJadCloud")}</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-text-secondary hover:text-primary transition-colors">{t("nav.features")}</a>
              <a href="#sectors" className="text-sm text-text-secondary hover:text-primary transition-colors">{t("nav.sectors")}</a>
              <a href="#pricing" className="text-sm text-text-secondary hover:text-primary transition-colors">{t("nav.pricing")}</a>
              <a href="#faq" className="text-sm text-text-secondary hover:text-primary transition-colors">{t("nav.faq")}</a>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link href="/auth/login"><Button variant="outline" size="sm">{t("nav.login")}</Button></Link>
              <Link href="/packages"><Button size="sm">{t("nav.signup")}</Button></Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
                <span>🚀</span>
                <span>{t("hero.badge")}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleAccent")}</span>
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto md:mx-0">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/packages"><Button size="lg" className="w-full sm:w-auto">{t("hero.ctaPrimary")}</Button></Link>
                <Link href="#how-it-works"><Button variant="outline" size="lg" className="w-full sm:w-auto">{t("hero.ctaSecondary")}</Button></Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/70 text-xs">{t("businessName")}</p>
                      <p className="font-bold">كافيه نقطة</p>
                    </div>
                    <div className="text-left">
                      <p className="text-white/70 text-xs">{t("customer")}</p>
                      <p className="font-bold">أحمد محمد</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center mb-3">
                    <p className="text-3xl font-bold">2,450</p>
                    <p className="text-xs text-white/70">{t("points")}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/10 rounded-lg p-2 text-center text-xs">
                      <p className="font-bold">{t("customerLevels.gold")}</p>
                      <p className="text-white/60">{t("level")}</p>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-2 text-center text-xs">
                      <p className="font-bold">28</p>
                      <p className="text-white/60">{t("visits")}</p>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-2 text-center text-xs">
                      <p className="font-bold">3</p>
                      <p className="text-white/60">{t("rewards")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t("features.title")}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} hoverEffect className="text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{t(f.title)}</h3>
                <p className="text-sm text-text-secondary">{t(f.desc)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sectors" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t("sectors.title")}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t("sectors.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((s, i) => (
              <Card key={i} hoverEffect className="text-center">
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{t(s.name)}</h3>
                <p className="text-text-secondary">{t(s.desc)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t("howItWorks.title")}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.step}</div>
                <h4 className="font-semibold text-text-primary mb-2">{t(s.title)}</h4>
                <p className="text-sm text-text-secondary">{t(s.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t("pricing.title")}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? "border-2 border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">{t("pricing.mostPopular")}</div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-text-primary mb-2">{t(plan.name)}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-text-secondary text-sm">{t("pricing.perMonth")}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(f)}
                    </li>
                  ))}
                </ul>
                <Link href="/packages">
                  <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                    {plan.popular ? t("pricing.ctaTrial") : t("pricing.ctaStart")}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t("faq.title")}</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <Card key={i}>
                <h3 className="font-semibold text-text-primary mb-2">{t(item.q)}</h3>
                <p className="text-sm text-text-secondary">{t(item.a)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <Link href="/packages"><Button variant="secondary" size="lg">{t("cta.button")}</Button></Link>
        </div>
      </section>

      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold text-xl">ن</div>
                <span className="font-bold text-lg">{t("brand")}</span>
              </div>
              <p className="text-white/60 text-sm">{t("footer.jadCloudDesc")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.links")}</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">{t("footer.features")}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t("footer.pricing")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t("footer.help")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>{t("footer.email")}</li>
                <li>{t("footer.phone")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.jadCloud")}</h4>
              <p className="text-white/60 text-sm">{t("footer.jadCloudDesc")}</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            <p>{t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-border-base">
      <button
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          language === "ar"
            ? "bg-primary text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        عربي
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          language === "en"
            ? "bg-primary text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        English
      </button>
    </div>
  );
}
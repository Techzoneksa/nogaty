import React from "react";
import { Badge } from "./Badge";

interface LoyaltyCardProps {
  businessName: string;
  businessLogo?: string;
  customerName: string;
  phone: string;
  points: number;
  tier: "Bronze" | "Silver" | "Gold" | "VIP";
  primaryColor?: string;
  secondaryColor?: string;
  cardNumber?: string;
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({
  businessName,
  customerName,
  phone,
  points,
  tier,
  primaryColor = "#2563EB",
  secondaryColor = "#14B8A6",
  cardNumber = "NOG-8902-8812",
}) => {
  const tierNamesAr = {
    Bronze: "برونزي",
    Silver: "فضي",
    Gold: "ذهبي",
    VIP: "نخبة VIP",
  };

  const tierColors = {
    Bronze: "bg-amber-700/10 text-amber-800 border-amber-700/20",
    Silver: "bg-slate-300/20 text-slate-800 border-slate-300/30",
    Gold: "bg-yellow-500/10 text-yellow-800 border-yellow-500/20",
    VIP: "bg-purple-600/10 text-purple-800 border-purple-600/20",
  };

  return (
    <div
      className="relative w-full max-w-sm aspect-[1.58/1] rounded-2xl p-5 text-white shadow-lg overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }}
    >
      {/* Decorative shapes to make it look premium */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-white/70">بطاقة الولاء</span>
          <span className="font-extrabold text-base tracking-tight">{businessName}</span>
        </div>
        <span
          className={`text-[10px] font-bold py-0.5 px-2 border rounded-full ${tierColors[tier]} bg-white/95 shadow-xs`}
        >
          {tierNamesAr[tier]}
        </span>
      </div>

      {/* Middle row: QR code placeholder & Points */}
      <div className="flex items-center justify-between gap-4 my-2 z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/70">رصيد النقاط</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tight">{points}</span>
            <span className="text-xs font-semibold text-white/90">نقطة</span>
          </div>
        </div>

        {/* QR Code Graphic Mockup */}
        <div className="bg-white p-1.5 rounded-lg shadow-xs flex items-center justify-center">
          <div className="relative w-12 h-12">
            {/* Simple SVG barcode/QR representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
              <rect x="5" y="5" width="20" height="20" fill="currentColor" />
              <rect x="5" y="75" width="20" height="20" fill="currentColor" />
              <rect x="75" y="5" width="20" height="20" fill="currentColor" />
              <rect x="20" y="20" width="10" height="10" fill="currentColor" />
              <rect x="70" y="20" width="10" height="10" fill="currentColor" />
              <rect x="20" y="70" width="10" height="10" fill="currentColor" />
              {/* Random grid elements */}
              <rect x="35" y="5" width="10" height="20" fill="currentColor" />
              <rect x="55" y="5" width="15" height="10" fill="currentColor" />
              <rect x="5" y="35" width="20" height="10" fill="currentColor" />
              <rect x="35" y="35" width="30" height="30" fill="currentColor" />
              <rect x="5" y="55" width="10" height="15" fill="currentColor" />
              <rect x="75" y="35" width="20" height="15" fill="currentColor" />
              <rect x="75" y="60" width="15" height="20" fill="currentColor" />
              <rect x="35" y="75" width="25" height="15" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between border-t border-white/20 pt-2 text-[10px] text-white/80 z-10 font-semibold">
        <div className="flex flex-col gap-0.5">
          <span>{customerName}</span>
          <span className="font-mono text-[9px] text-white/70">{phone}</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-mono text-[8px] text-white/50">{cardNumber}</span>
          <span className="text-[8px] font-bold text-white/60 tracking-wider">
            nogaty by Jad Cloud
          </span>
        </div>
      </div>
    </div>
  );
};

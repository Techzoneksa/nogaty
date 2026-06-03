import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser } from "@/lib/demo/merchant-data";
import { UserRole } from "@prisma/client";

export interface LoyaltyRules {
  pointsPerRiyal: number;
  minimumRedeem: number;
  pointValue: number;
  allowRedemption: boolean;
  welcomePoints: number;
}

const DEFAULT_RULES: Record<string, LoyaltyRules> = {
  "demo-tenant-1": { pointsPerRiyal: 1, minimumRedeem: 50, pointValue: 0.1, allowRedemption: true, welcomePoints: 50 },
  "demo-tenant-2": { pointsPerRiyal: 1, minimumRedeem: 10, pointValue: 0.1, allowRedemption: true, welcomePoints: 30 },
  "demo-tenant-3": { pointsPerRiyal: 1, minimumRedeem: 25, pointValue: 0.1, allowRedemption: true, welcomePoints: 100 },
};

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.MERCHANT_OWNER && session.role !== UserRole.MERCHANT_STAFF) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const tenantId = getTenantIdForUser(session.email);
    if (!tenantId) {
      return NextResponse.json({ error: "لا توجد منشأة" }, { status: 404 });
    }

    const rules = DEFAULT_RULES[tenantId] || DEFAULT_RULES["demo-tenant-2"];

    return NextResponse.json({ rules });

  } catch (error) {
    console.error("Rules API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.MERCHANT_OWNER) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const tenantId = getTenantIdForUser(session.email);
    if (!tenantId) {
      return NextResponse.json({ error: "لا توجد منشأة" }, { status: 404 });
    }

    const body = await request.json();
    const { pointsPerRiyal, minimumRedeem, pointValue, allowRedemption, welcomePoints } = body;

    const rules: LoyaltyRules = {
      pointsPerRiyal: pointsPerRiyal ?? 1,
      minimumRedeem: minimumRedeem ?? 10,
      pointValue: pointValue ?? 0.1,
      allowRedemption: allowRedemption ?? true,
      welcomePoints: welcomePoints ?? 50,
    };

    DEFAULT_RULES[tenantId] = rules;

    return NextResponse.json({ message: "تم حفظ القواعد", rules });

  } catch (error) {
    console.error("Update rules error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
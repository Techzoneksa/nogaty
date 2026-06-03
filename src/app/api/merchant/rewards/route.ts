import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getRewardsByTenant } from "@/lib/demo/merchant-data";
import { UserRole } from "@prisma/client";

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

    const rewards = getRewardsByTenant(tenantId);

    return NextResponse.json({
      rewards,
      summary: {
        total: rewards.length,
        totalRedemptions: rewards.reduce((sum, r) => sum + r.redemptions, 0),
      },
    });

  } catch (error) {
    console.error("Rewards API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { name, description, rewardType, pointsCost, value } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "اسم المكافأة مطلوب" }, { status: 400 });
    }

    if (!pointsCost || pointsCost < 1) {
      return NextResponse.json({ error: "تكلفة النقاط يجب أن تكون أكبر من صفر" }, { status: 400 });
    }

    const newReward = {
      id: `reward-${Date.now()}`,
      tenantId,
      name: name.trim(),
      description: description?.trim() || "",
      rewardType: rewardType || "FIXED_DISCOUNT",
      pointsCost,
      value: value || 0,
      redemptions: 0,
    };

    return NextResponse.json(
      { message: "تم إضافة المكافأة", reward: newReward },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create reward error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
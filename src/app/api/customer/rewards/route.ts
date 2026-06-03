import { NextRequest, NextResponse } from "next/server";
import { getRewardsByTenant } from "@/lib/demo/merchant-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return NextResponse.json({ error: "معرف التاجر مطلوب" }, { status: 400 });
    }

    const rewards = getRewardsByTenant(tenantId);

    return NextResponse.json({
      rewards,
      total: rewards.length,
    });

  } catch (error) {
    console.error("Customer rewards error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
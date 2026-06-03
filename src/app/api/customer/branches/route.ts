import { NextRequest, NextResponse } from "next/server";
import { DEMO_BRANCHES } from "@/lib/demo/merchant-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return NextResponse.json({ error: "معرف التاجر مطلوب" }, { status: 400 });
    }

    const branches = DEMO_BRANCHES.filter((b) => b.tenantId === tenantId);

    return NextResponse.json({
      branches,
      total: branches.length,
    });

  } catch (error) {
    console.error("Customer branches error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
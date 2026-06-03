import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getDashboardStats } from "@/lib/demo/merchant-data";
import { isDemoMode } from "@/lib/data/data-source";
import { UserRole } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    // Get current user from session
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    // Only allow merchant roles
    if (session.role !== UserRole.MERCHANT_OWNER && session.role !== UserRole.MERCHANT_STAFF) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    // Get tenant ID for this user
    const tenantId = getTenantIdForUser(session.email);

    if (!tenantId) {
      return NextResponse.json({ error: "لا توجد منشأة" }, { status: 404 });
    }

    // Use demo data or Prisma based on DATABASE_URL
    if (isDemoMode()) {
      const stats = getDashboardStats(tenantId);
      return NextResponse.json(stats);
    }

    // Future: Use Prisma when DATABASE_URL is available
    // const prisma = await import("@/lib/prisma").then(m => m.prisma);
    // const stats = await prisma.customer.findMany({ where: { tenantId } });
    // ...
    
    // For now, always use demo mode as fallback
    const stats = getDashboardStats(tenantId);
    return NextResponse.json(stats);

  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
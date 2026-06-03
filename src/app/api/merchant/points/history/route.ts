import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, DEMO_TRANSACTIONS } from "@/lib/demo/merchant-data";
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

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let transactions = DEMO_TRANSACTIONS.filter((t) => t.tenantId === tenantId);

    if (customerId) {
      transactions = transactions.filter((t) => t.customerId === customerId);
    }

    if (type === "EARN" || type === "ADD") {
      transactions = transactions.filter((t) => t.type === "EARN");
    } else if (type === "REDEEM") {
      transactions = transactions.filter((t) => t.type === "REDEEM");
    }

    const total = transactions.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedTransactions = transactions
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(offset, offset + limit);

    return NextResponse.json({
      transactions: paginatedTransactions,
      pagination: { page, limit, total, totalPages },
    });

  } catch (error) {
    console.error("Points history API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
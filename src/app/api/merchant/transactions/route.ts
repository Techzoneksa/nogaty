import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getCustomerById, DEMO_TRANSACTIONS, getCustomersByTenant } from "@/lib/demo/merchant-data";
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

    if (type) {
      transactions = transactions.filter((t) => t.type === type);
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
    console.error("Transactions API error:", error);
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
    const { customerId, points, amount, type, description, branchId } = body;

    if (!customerId || !points) {
      return NextResponse.json({ error: "معرف العميل والنقاط مطلوبة" }, { status: 400 });
    }

    const customer = getCustomerById(customerId, tenantId);
    if (!customer) {
      return NextResponse.json({ error: "العميل غير موجود" }, { status: 404 });
    }

    if (!["EARN", "REDEEM"].includes(type)) {
      return NextResponse.json({ error: "نوع العملية غير صالح" }, { status: 400 });
    }

    const newTransaction = {
      id: `tx-${Date.now()}`,
      tenantId,
      customerId,
      branchId: branchId || "branch-2-1",
      type: type as "EARN" | "REDEEM",
      points: type === "REDEEM" ? -Math.abs(points) : Math.abs(points),
      amount: amount || undefined,
      description: description || (type === "EARN" ? "عملية شراء" : "استبدال نقاط"),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: "تم تسجيل العملية", transaction: newTransaction, newBalance: customer.totalPoints + newTransaction.points },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create transaction error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { createSession, getSession } from "@/lib/auth/session";
import { validateDemoCredentials } from "@/lib/auth/demo-users";
import { ROLE_REDIRECTS } from "@/lib/auth/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Try demo credentials first
    const user = validateDemoCredentials(email, password);
    
    if (!user) {
      // If DATABASE_URL exists, try Prisma (future)
      if (process.env.DATABASE_URL) {
        // Future: query Prisma for user
        // const prisma = await import("@/lib/prisma");
        // const dbUser = await prisma.prisma.user.findUnique(...)
      }
      
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await createSession(user);
    
    const redirectUrl = ROLE_REDIRECTS[user.role] || "/";

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
      redirectUrl,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: session.id,
      name: session.name,
      email: session.email,
      role: session.role,
      tenantId: session.tenantId,
    },
  });
}
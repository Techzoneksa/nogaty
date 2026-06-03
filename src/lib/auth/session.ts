import { cookies } from "next/headers";
import type { SessionUser } from "./types";
import { AUTH_COOKIE_NAME } from "./types";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(user: SessionUser): Promise<string> {
  const cookieStore = await cookies();
  
  const sessionData = JSON.stringify({
    user,
    createdAt: Date.now(),
  });
  
  // Simple base64 encoding (not encryption - for production use proper JWT)
  const sessionToken = Buffer.from(sessionData).toString("base64");
  
  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  
  return sessionToken;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    
    if (!sessionToken) {
      return null;
    }
    
    const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
    const sessionData = JSON.parse(decoded);
    
    if (!sessionData.user) {
      return null;
    }
    
    return sessionData.user as SessionUser;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
}

export async function requireRole(roles: string[]) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  if (!roles.includes(session.role)) {
    return null;
  }
  return session;
}

export function isAuthenticated(user: SessionUser | null): boolean {
  return user !== null;
}